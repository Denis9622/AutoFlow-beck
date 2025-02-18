import express from "express";
import { createSupportMessage } from "../controllers/auth.js"; // Перенесите контроллер создания сообщения поддержки в отдельный файл

const router = express.Router();

router.post("/", createSupportMessage);

export default router;
