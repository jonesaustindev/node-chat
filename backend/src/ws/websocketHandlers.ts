import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { sanitizeString } from "../utils/stringUtils";
import pool from "../db/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface ExtendedWebSocket extends WebSocket {
  room_id?: number;
}

function broadcastMessage({
  roomId,
  message,
  wss,
}: {
  roomId: number;
  message: string;
  wss: WebSocketServer;
}) {
  wss.clients.forEach((client: ExtendedWebSocket) => {
    if (client.readyState === WebSocket.OPEN && client.room_id === roomId) {
      client.send(message);
    }
  });
}

async function addMessage(userId: number, messageText: string) {
  return await pool.query(
    "INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING id",
    [userId, messageText]
  );
}

async function handleSendMessage({
  userId,
  parsedMessage,
  wss,
}: {
  userId: number;
  parsedMessage: any;
  wss: WebSocketServer;
}) {
  if ("roomId" in parsedMessage && "messageText" in parsedMessage) {
    const { roomId, messageText, username } = parsedMessage as {
      roomId: number;
      messageText: string;
      username: string;
    };
    const sanitizedMessageText = sanitizeString(messageText);

    const messageData = {
      username: username,
      message: sanitizedMessageText,
    };

    await addMessage(userId, sanitizedMessageText);
    broadcastMessage({ roomId, message: JSON.stringify(messageData), wss });
  } else {
    console.error("Missing properties in message:", parsedMessage);
  }
}

function handleJoinRoom({
  parsedMessage,
  ws,
}: {
  parsedMessage: any;
  ws: ExtendedWebSocket;
}) {
  if ("roomId" in parsedMessage) {
    ws.room_id = parsedMessage.roomId;
  } else {
    console.error("Missing roomId in message:", parsedMessage);
  }
}

export function handleWebSocketConnection(
  ws: ExtendedWebSocket,
  wss: WebSocketServer
) {
  ws.on("error", (err) => {
    console.error(`WebSocket error: ${err}`);
  });

  ws.on("message", async (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      if ("action" in parsedMessage) {
        switch (parsedMessage.action) {
          case "joinRoom":
            handleJoinRoom({ parsedMessage, ws });
            break;
          case "sendMessage":
            try {
              if ("token" in parsedMessage) {
                const user = jwt.verify(parsedMessage.token, JWT_SECRET) as any; // Replace 'any' with your user type

                if (user.exp > Math.floor(Date.now() / 1000)) {
                  handleSendMessage({
                    parsedMessage,
                    wss,
                    userId: user?.userId,
                  });
                } else {
                  ws.send("Invalid token");
                  return;
                }
              } else {
                ws.send("Invalid token");
              }
            } catch (error) {
              ws.send("Invalid token");
            }
            break;
          default:
            console.error("Unknown action:", parsedMessage.action);
        }
        return;
      }
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  ws.send("Connected to WebSocket server");
}
