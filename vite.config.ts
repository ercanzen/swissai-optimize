import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ENV_KEYS = [
  'ANTHROPIC_API_KEY',
  'RESEND_API_KEY',
  'LEAD_NOTIFY_EMAIL',
  'RESEND_FROM_EMAIL',
  'CRON_SECRET',
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
]

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      for (const key of ENV_KEYS) {
        if (env[key]) process.env[key] = env[key]
      }

      const mount = (path: string, run: (data: any) => Promise<unknown>) => {
        server.middlewares.use(path, async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method Not Allowed')
            return
          }
          try {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk as Buffer)
            const data = JSON.parse(Buffer.concat(chunks).toString('utf-8'))
            const result = await run(data)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' }))
          }
        })
      }

      mount('/api/audit', async (data) => {
        const { generateAuditReport } = await import('./api/_lib/audit')
        return generateAuditReport(data)
      })

      mount('/api/contact', async (data) => {
        const { submitContactForm } = await import('./api/_lib/contact')
        await submitContactForm(data)
        return { ok: true }
      })

      server.middlewares.use('/api/weekly-pulse', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        const cronSecret = process.env.CRON_SECRET
        if (cronSecret && req.headers.authorization !== `Bearer ${cronSecret}`) {
          res.statusCode = 401
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Unauthorized' }))
          return
        }
        try {
          const { runWeeklyPulse } = await import('./api/_lib/weekly-pulse')
          const result = await runWeeklyPulse()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Unbekannter Fehler' }))
        }
      })

      server.middlewares.use('/api/unsubscribe', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        const url = new URL(req.url || '', 'http://localhost')
        const email = url.searchParams.get('email') || ''
        const token = url.searchParams.get('token') || ''
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        try {
          const { processUnsubscribe } = await import('./api/_lib/unsubscribe')
          await processUnsubscribe(email, token)
          res.end('<p>Sie wurden erfolgreich von den wöchentlichen KI-Updates abgemeldet.</p>')
        } catch (err) {
          res.statusCode = 400
          res.end(`<p>${err instanceof Error ? err.message : 'Unbekannter Fehler'}</p>`)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevMiddleware()],
})
