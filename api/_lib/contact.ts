import { sendLeadEmail, escapeHtml } from './notify.js'

export interface ContactFormData {
  name: string
  email: string
  company: string
  service: string
  message: string
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  const html = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Unternehmen:</strong> ${escapeHtml(data.company || '—')}</p>
    <p><strong>Thema:</strong> ${escapeHtml(data.service)}</p>
    <p><strong>Nachricht:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br/>')}</p>
  `
  await sendLeadEmail(`Neue Kontaktanfrage von ${data.name}`, html)
}
