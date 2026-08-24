import { Ratelimit } from '@upstash/ratelimit'
import { getRedis } from './store.js'

export interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds?: number
}

let limiter: Ratelimit | null | undefined

function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter
  const redis = getRedis()
  limiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        prefix: 'ratelimit:audit',
      })
    : null
  return limiter
}

// No Redis configured means no rate limiting is possible; fails open rather than
// blocking the feature entirely (matches store.ts's silent-no-op-without-Redis pattern).
export async function checkAuditRateLimit(identifier: string): Promise<RateLimitResult> {
  const rl = getLimiter()
  if (!rl) return { allowed: true }

  const result = await rl.limit(identifier)
  if (result.success) return { allowed: true }

  return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)) }
}

export function clientIp(req: { headers: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers['x-forwarded-for']
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return raw?.split(',')[0]?.trim() || 'unknown'
}
