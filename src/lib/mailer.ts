import nodemailer from "nodemailer";
import { siteConfig } from "./config";

interface ContactEmailData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Отправка письма о новой заявке через SMTP.
 * Если SMTP не настроен (нет env), функция тихо завершается без ошибки —
 * заявка уже сохранена в БД и доступна в админ-панели.
 */
export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[mailer] SMTP не настроен — письмо не отправлено, заявка сохранена в БД");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || siteConfig.email,
    replyTo: data.email,
    subject: `Новая заявка с сайта от ${data.name}`,
    text: `Имя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\n\nСообщение:\n${data.message}`,
    html: `
      <p><strong>Имя:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Телефон:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Сообщение:</strong><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
