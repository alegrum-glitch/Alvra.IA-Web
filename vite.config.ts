import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function devContactStub(): Plugin {
  return {
    name: 'dev-contact-stub',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') return next()
        const decoder = new TextDecoder()
        let raw = ''
        for await (const chunk of req) {
          raw += decoder.decode(chunk as Uint8Array, { stream: true })
        }
        raw += decoder.decode()
        let parsed: unknown = null
        try {
          parsed = JSON.parse(raw)
        } catch {
          res.statusCode = 400
          res.setHeader('content-type', 'application/json')
          return res.end(JSON.stringify({ error: 'Bad JSON' }))
        }
        // eslint-disable-next-line no-console
        console.log('\n[dev /api/contact] Form submission:', parsed, '\n')
        await new Promise((r) => setTimeout(r, 700))
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({ ok: true, dev: true }))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devContactStub()],
})
