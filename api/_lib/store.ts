import { Redis } from '@upstash/redis'

export interface StoredLead {
  name: string
  email: string
  firma: string
  website: string
  branche: string
  mitarbeiterzahl: string
  herausforderungen: string[]
  stundenProWoche: number
  empfehlungen: unknown
  sichtbarkeit: unknown
  createdAt: string
  lastPulseAt: string | null
  unsubscribed: boolean
}

const LEAD_KEY_PREFIX = 'audit-lead:'
const LEAD_INDEX_KEY = 'audit-leads:index'

export function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function saveAuditLead(
  lead: Omit<StoredLead, 'createdAt' | 'lastPulseAt' | 'unsubscribed'>,
): Promise<void> {
  const redis = getRedis()
  if (!redis) return

  const key = LEAD_KEY_PREFIX + lead.email.toLowerCase()
  const existing = await redis.get<StoredLead>(key)
  const record: StoredLead = {
    ...lead,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    lastPulseAt: existing?.lastPulseAt ?? null,
    unsubscribed: existing?.unsubscribed ?? false,
  }
  await redis.set(key, record)
  await redis.sadd(LEAD_INDEX_KEY, key)
}

export async function getAllAuditLeads(): Promise<StoredLead[]> {
  const redis = getRedis()
  if (!redis) return []

  const keys = await redis.smembers(LEAD_INDEX_KEY)
  if (keys.length === 0) return []
  const leads = await Promise.all(keys.map((key) => redis.get<StoredLead>(key)))
  return leads.filter((lead): lead is StoredLead => lead !== null)
}

export async function markPulseSent(email: string): Promise<void> {
  const redis = getRedis()
  if (!redis) return

  const key = LEAD_KEY_PREFIX + email.toLowerCase()
  const existing = await redis.get<StoredLead>(key)
  if (!existing) return
  await redis.set(key, { ...existing, lastPulseAt: new Date().toISOString() })
}

export async function setUnsubscribed(email: string): Promise<void> {
  const redis = getRedis()
  if (!redis) return

  const key = LEAD_KEY_PREFIX + email.toLowerCase()
  const existing = await redis.get<StoredLead>(key)
  if (!existing) return
  await redis.set(key, { ...existing, unsubscribed: true })
}
