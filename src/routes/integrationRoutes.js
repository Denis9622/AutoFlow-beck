import express from "express";
import {
  getIntegrations,
  updateIntegration,
} from "../controllers/integrationController.js";

const router = express.Router();

// 📌 Получение списка интеграций
router.get("/", getIntegrations);

// 📌 Обновление статуса интеграции
router.put("/:id", updateIntegration);

export default router;
