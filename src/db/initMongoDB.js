import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoDB = async () => {
  try {
    const user = getEnvVar("MONGODB_USER");
    const pwd = getEnvVar("MONGODB_PASSWORD");
    const url = getEnvVar("MONGODB_URL");
    const userDb = getEnvVar("MONGODB_USER_DB"); // База данных пользователей
    const supportDb = getEnvVar("MONGODB_SUPPORT_DB"); // База данных поддержки

    console.log("Connecting to MongoDB for users...");
    console.log("MONGODB_USER:", user);
    console.log("MONGODB_URL:", url);
    console.log("MONGODB_USER_DB:", userDb);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${userDb}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connection to MongoDB for users successfully established!");

    console.log("Connecting to MongoDB for support...");
    console.log("MONGODB_SUPPORT_DB:", supportDb);

    const supportConnection = await mongoose.createConnection(
      `mongodb+srv://${user}:${pwd}@${url}/${supportDb}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connection to MongoDB for support successfully established!");

    return { supportConnection }; // Возвращаем соединение для использования в приложении
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
