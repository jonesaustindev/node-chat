import express from "express";
import { getChatMessages } from "../controllers/chatController";

const router = express.Router();

// /chat
router.get("/messages", getChatMessages);

export default router;
