import { initMongoDB } from "../db/initMongoDB.js";

export const dbMiddleware = async (req, res, next) => {
  try {
    if (!req.db) {
      console.log("🔌 Подключение к БД через middleware...");
      const { supportConnection, SupportMessage } = await initMongoDB();

      req.db = {
        supportConnection,
        SupportMessage, // ✅ Добавляем SupportMessage в req.db
      };
    }
    next();
  } catch (error) {
    console.error("❌ Ошибка в dbMiddleware:", error);
    res.status(500).json({ message: "Ошибка подключения к БД" });
  }
};
