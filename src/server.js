import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initMongoDB } from "./db/initMongoDB.js";
import autoFlowRouter from "./routes/autoflow.js";
import { sendMessageToAI } from "./controllers/auth.js"; // Импортируем контроллер для AI

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Настройка CORS
const corsOptions = {
  origin: "http://localhost:5173", // Ваш фронтенд домен
  credentials: true, // Разрешить передачу куки и других учетных данных
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/autoflow", autoFlowRouter);

// Новый маршрут для отправки сообщений в AI
app.post("/api/sendMessage", sendMessageToAI);

const bootstrap = async () => {
  await initMongoDB();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log("🔍 HUGGING_FACE_API_KEY:", process.env.HUGGING_FACE_API_KEY); // Лог API-ключа
  });
};

bootstrap();
