export default async function handler(req, res) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const { name, phone, city, branch } = req.body;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Missing Telegram configuration' });
  }

  const message = `📦 Нова заявка:\n\n👤 Імʼя: ${name}\n📞 Телефон: ${phone}\n🏙 Місто: ${city}\n🏤 Відділення: ${branch}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );
    const data = await response.json();
    if (!data.ok) throw new Error(data.description);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
