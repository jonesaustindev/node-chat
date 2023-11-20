import express from "express";
import cors from "cors";

import authRoutes from "./api/routes/authRoutes";
import chatRoutes from "./api/routes/chatRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;
