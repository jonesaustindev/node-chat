import env from "dotenv";
env.config();

import http from "http";
import { Server as WebSocketServer } from "ws";

import app from "./app";
import { handleWebSocketConnection } from "./ws/websocketHandlers";

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

wss.on("connection", handleWebSocketConnection);

server.on("upgrade", (request, socket, head) => {
  if (request.url === "/ws") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    console.log("Unknown URL");
    socket.destroy();
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
