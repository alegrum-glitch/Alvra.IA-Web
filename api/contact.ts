import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const TO = 'alegrum@alvra-ia.com'
// Sandbox mode: only sends to the email registered in your Resend account.
// When alvra-ia.com is verified in Resend, change back to 'Alvra.IA <web@alvra-ia.com>'.
const FROM = 'Alvra.IA <onboarding@resend.dev>'

const MAX = {
  nombre: 80,
  apellido: 80,
  empresa: 160,
  contacto: 200,
  descripcion: 4000,
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return map[c]
  })
}

function looksLikeEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Servidor no configurado' })
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) ?? {}
  const nombre = String(body.nombre ?? '').trim()
  const apellido = String(body.apellido ?? '').trim()
  const empresa = String(body.empresa ?? '').trim()
  const contacto = String(body.contacto ?? '').trim()
  const descripcion = String(body.descripcion ?? '').trim()

  if (!nombre || !apellido || !empresa || !contacto || !descripcion) {
    return res.status(400).json({ error: 'Faltan campos' })
  }

  if (
    nombre.length > MAX.nombre ||
    apellido.length > MAX.apellido ||
    empresa.length > MAX.empresa ||
    contacto.length > MAX.contacto ||
    descripcion.length > MAX.descripcion
  ) {
    return res.status(400).json({ error: 'Algún campo es demasiado largo' })
  }

  const resend = new Resend(apiKey)

  const replyTo = looksLikeEmail(contacto) ? contacto : undefined

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo,
      subject: `Nuevo contacto — ${nombre} ${apellido}`,
      html: render({ nombre, apellido, empresa, contacto, descripcion }),
      text: renderText({ nombre, apellido, empresa, contacto, descripcion }),
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return res.status(502).json({ error: 'No pudimos enviar el mensaje' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Error interno' })
  }
}

function safeParse(s: string) {
  try {
    return JSON.parse(s)
  } catch {
    return null
  }
}

function render(d: {
  nombre: string
  apellido: string
  empresa: string
  contacto: string
  descripcion: string
}) {
  const e = escapeHtml
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">
  <div style="background:#fff;border-radius:14px;padding:28px 28px 24px;border:1px solid #eaeaea;">
    <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#0070f3;font-weight:600;">Alvra.IA · nuevo contacto</div>
    <h1 style="margin:10px 0 24px;font-size:22px;font-weight:600;line-height:1.2;">${e(d.nombre)} ${e(d.apellido)}</h1>

    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:10px 0;color:#666;width:120px;vertical-align:top;">Empresa</td><td style="padding:10px 0;">${e(d.empresa)}</td></tr>
      <tr><td style="padding:10px 0;color:#666;vertical-align:top;border-top:1px solid #f0f0f0;">Contacto</td><td style="padding:10px 0;border-top:1px solid #f0f0f0;">${e(d.contacto)}</td></tr>
    </table>

    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #f0f0f0;">
      <div style="font-size:13px;color:#666;margin-bottom:8px;">Sobre el negocio</div>
      <div style="font-size:15px;line-height:1.55;white-space:pre-wrap;color:#222;">${e(d.descripcion)}</div>
    </div>
  </div>
  <div style="text-align:center;font-size:11px;color:#888;margin-top:18px;">Enviado desde el formulario de alvra-ia.com</div>
</div>
</body></html>`
}

function renderText(d: {
  nombre: string
  apellido: string
  empresa: string
  contacto: string
  descripcion: string
}) {
  return `Nuevo contacto desde alvra-ia.com

Nombre:   ${d.nombre} ${d.apellido}
Empresa:  ${d.empresa}
Contacto: ${d.contacto}

Sobre el negocio:
${d.descripcion}
`
}
