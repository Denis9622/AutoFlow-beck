import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  userRegisterSchema,
  userLoginSchema,
  resetPasswordSchema,
} from "../validation/userValidation.js";
import {
  createUserController,
  loginUserController,
  logoutUserController,
  resetPasswordController,
  getCurrentUserController,
  sendMessageToAI,
  
} from "../controllers/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";


const router = express.Router();

router.post(
  "/register",
  validateBody(userRegisterSchema),
  ctrlWrapper(createUserController)
);

router.post(
  "/login",
  validateBody(userLoginSchema),
  ctrlWrapper(loginUserController)
);

router.post("/logout", ctrlWrapper(logoutUserController));
router.post(
  "/reset-pwd",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

// Маршрут для получения текущего пользователя
router.get("/current-user", ctrlWrapper(getCurrentUserController));

// Новый маршрут для отправки сообщения в OpenAI
router.post("/sendMessage", sendMessageToAI);

export default router;
