// import SupportMessage from "../models/supportMessage.js";

export const createSupportMessage = async (req, res, next) => {
  try {
    const { SupportMessage } = req.db; // ✅ Берём модель из `req.db`
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Сообщение не может быть пустым" });
    }

    const newMessage = await SupportMessage.create({ text: message });

    console.log("📝 Сообщение успешно добавлено в базу support:", newMessage);

    // Имитация ответа поддержки
    const reply = "Спасибо за обращение! Ваша заявка принята.";

    // Отправка нового сообщения и имитации ответа на фронт
    res.status(201).json({ newMessage, reply });
  } catch (error) {
    next(error);
  }
};

export const getSupportTickets = async (req, res) => {
  try {
    const { SupportMessage } = req.db;
    const tickets = await SupportMessage.find();
    res.json(tickets);
  } catch (error) {
    console.error("Ошибка получения заявок:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
