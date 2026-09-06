import dns from 'node:dns/promises'
import net from 'node:net'
import type { FetchedPage } from './types'

const USER_AGENT = 'SwissAIOptimizeAuditBot/1.0 (+https://swissai-optimize.ch)'
const FETCH_TIMEOUT_MS = 6000

/** Rejects loopback, private, link-local and unique-local ranges (RFC 1918 / 4193 / cloud metadata). */
function isPrivateIp(ip: string): boolean {
  const kind = net.isIP(ip)
  if (kind === 4) {
    const [a, b] = ip.split('.').map(Number)
    if (a === 127 || a === 10 || a === 0) return true
    if (a === 169 && b === 254) return true // link-local incl. 169.254.169.254 cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true
    if (a === 192 && b === 168) return true
    return false
  }
  if (kind === 6) {
    const lower = ip.toLowerCase()
    if (lower === '::1') return true
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true // unique local fc00::/7
    if (lower.startsWith('fe80')) return true // link-local
    return false
  }
  return true // unresolvable / not an IP we recognize — treat as unsafe
}

export interface NormalizedTarget {
  origin: string // e.g. https://example.com
  hostname: string
}

/** Validates a user-submitted website URL: http(s) only, resolves to a public address. Never throws. */
export async function resolvePublicTarget(input: string): Promise<NormalizedTarget | null> {
  let url: URL
  try {
    url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`)
  } catch {
    return null
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null

  const hostname = url.hostname
  if (hostname === 'localhost') return null

  try {
    const records = await dns.lookup(hostname, { all: true })
    if (records.length === 0) return null
    if (records.some((r) => isPrivateIp(r.address))) return null
  } catch {
    return null
  }

  return { origin: `${url.protocol}//${url.host}`, hostname }
}

async function fetchWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': USER_AGENT },
    })
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export async function fetchHtml(url: string): Promise<FetchedPage> {
  const res = await fetchWithTimeout(url)
  if (!res) return { ok: false, status: 0, html: '' }
  try {
    const html = await res.text()
    return { ok: res.ok, status: res.status, html }
  } catch {
    return { ok: false, status: res.status, html: '' }
  }
}

export async function fetchText(url: string): Promise<{ ok: boolean; status: number; text: string }> {
  const res = await fetchWithTimeout(url)
  if (!res) return { ok: false, status: 0, text: '' }
  try {
    return { ok: res.ok, status: res.status, text: await res.text() }
  } catch {
    return { ok: false, status: res.status, text: '' }
  }
}

export async function urlExists(url: string): Promise<boolean> {
  const res = await fetchWithTimeout(url, 4000)
  return !!res && res.ok
}
