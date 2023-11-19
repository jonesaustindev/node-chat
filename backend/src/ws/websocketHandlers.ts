import { WebSocket } from "ws";

export function handleWebSocketConnection(ws: WebSocket) {
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
  ws.on("error", (err) => {
    console.error(`WebSocket error: ${err}`);
  });
  ws.send("Connected to WebSocket server");
}
