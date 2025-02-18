import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initMongoDB } from "./db/initMongoDB.js";
import autoFlowRouter from "./routes/users.js";
import supportRouter from "./routes/support.js";
import { dbMiddleware } from "./middlewares/dbMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(dbMiddleware); // ✅ Подключаем мидлвар перед маршрутами
app.use("/api/autoflow", autoFlowRouter);
app.use("/api/support", supportRouter);
console.log("MONGODB_USER:", process.env.MONGODB_USER);
console.log("MONGODB_PASSWORD:", process.env.MONGODB_PASSWORD);
console.log("MONGODB_URL:", process.env.MONGODB_URL);
console.log("MONGODB_USER_DB:", process.env.MONGODB_USER_DB);
console.log("MONGODB_SUPPORT_DB:", process.env.MONGODB_SUPPORT_DB);


initMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database initialization failed:", error);
  });
