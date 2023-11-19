import express from "express";
import cors from "cors";

import helloRoutes from "./api/routes/helloRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);
app.use(express.json());

app.use("/api/hello", helloRoutes);

export default app;
