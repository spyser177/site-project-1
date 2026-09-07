interface ContactTelegramData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

/**
 * Отправка уведомления о заявке в Telegram (опционально).
 * Если TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы — функция ничего не делает.
 */
export async function sendContactTelegram(data: ContactTelegramData): Promise<void> {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const text =
    `📩 Новая заявка с сайта\n\n` +
    `Имя: ${data.name}\n` +
    `Телефон: ${data.phone}\n` +
    `Email: ${data.email}\n` +
    `Сообщение: ${data.message}`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });
  } catch (error) {
    console.error("[telegram] Не удалось отправить уведомление:", error);
  }
}
