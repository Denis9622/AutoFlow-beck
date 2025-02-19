export const createSupportMessage = async (req, res, next) => {
  try {
    const { SupportMessage } = req.db;
    const { message, userId, userName, userEmail } = req.body;

    if (!message || !userId || !userName || !userEmail) {
      return res.status(400).json({
        error: "Все поля (message, userId, userName, userEmail) обязательны.",
      });
    }

    const newMessage = await SupportMessage.create({
      text: message,
      userId,
      userName,
      userEmail,
    });

    console.log("Сообщение успешно добавлено в базу support:", newMessage);

    // Имитация ответа поддержки
    const reply = "Спасибо за обращение! Ваша заявка принята.";

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
