import express from "express";
import {
  createSupportMessage,
  getSupportTickets,
} from "../controllers/support.js";

const router = express.Router();

router.post("/", createSupportMessage);
router.get("/tickets", getSupportTickets);


export default router;
