import express from "express";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

app.get("/api/hello", (req, res) => {
  res.status(200).send({ data: "hello from nodejs!" });
});

app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
