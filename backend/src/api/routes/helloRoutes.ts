import express from "express";

import { getHello } from "../controllers/helloController";

const router = express.Router();

// /api/hello
router.get("/", getHello);

export default router;
