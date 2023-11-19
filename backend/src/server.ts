import env from "dotenv";
env.config();

import http from "http";
import { Server as WebSocketServer } from "ws";

import app from "./app";
import { handleWebSocketConnection } from "./ws/websocketHandlers";

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", handleWebSocketConnection);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
