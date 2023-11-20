import { signIn, signUp } from "../controllers/authController";
import express from "express";

const router = express.Router();

// /api/auth
router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

export default router;
