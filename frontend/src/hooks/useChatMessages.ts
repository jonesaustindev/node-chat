import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_OPTIONS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

interface Message {
  id: number;
  user_id: number;
  username: string;
  message: string;
  created_at: string;
}

const useChatMessages = (isConnected: boolean, webSocket: WebSocket | null) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (isConnected) {
      try {
        const fetchMessages = async () => {
          const response = await fetch(`${BASE_URL}/api/chat/messages`, {
            ...BASE_OPTIONS,
          });
          const messages = await response.json();
          setMessages(messages?.data);
        };

        fetchMessages();
      } catch (error) {
        console.error("Get chat messages error: ", error);
      }
    }
  }, [isConnected]);

  useEffect(() => {
    if (webSocket && isConnected) {
      const handleMessage = (event: MessageEvent) => {
        const newMessage: Message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      webSocket.addEventListener("message", handleMessage);

      return () => {
        webSocket.removeEventListener("message", handleMessage);
      };
    }
  }, [webSocket, isConnected]);

  return { messages };
};

export default useChatMessages;
