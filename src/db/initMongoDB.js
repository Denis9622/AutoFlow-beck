import mongoose from "mongoose";
import supportMessageSchema from "../models/supportMessage.js";


export const initMongoDB = async () => {
  try {
    const user = process.env.MONGODB_USER;
    const pwd = process.env.MONGODB_PASSWORD;
    const url = process.env.MONGODB_URL;
    const userDb = process.env.MONGODB_USER_DB;
    const supportDb = process.env.MONGODB_SUPPORT_DB;

    console.log(`🔌 Подключаемся к MongoDB...`);
    console.log(`🔗 User DB: ${userDb}`);
    console.log(`🔗 Support DB: ${supportDb}`);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${userDb}?retryWrites=true&w=majority`
    );
    console.log("✅ Подключено к user DB!");

    const supportConnection = mongoose.createConnection(
      `mongodb+srv://${user}:${pwd}@${url}/${supportDb}?retryWrites=true&w=majority`
    );

    console.log("✅ Подключено к support DB!");

    const SupportMessage = supportConnection.model(
      "SupportMessage",
      supportMessageSchema
    );
    console.log("✅ SupportMessage модель создана!");

    return { supportConnection, SupportMessage }; // ✅ Возвращаем SupportMessage
  } catch (error) {
    console.error("❌ Ошибка подключения к MongoDB:", error.message);
    throw error;
  }
};
