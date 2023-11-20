import { useState, useEffect } from "react";

type ErrorHandler = (error: Event) => void;

const roomId = 4;

const useWebSocket = (url: string, onError?: ErrorHandler) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [shouldConnect, setShouldConnect] = useState(false);

  useEffect(() => {
    if (shouldConnect && url) {
      const webSocket = new WebSocket(url);

      webSocket.onopen = () => {
        setIsConnected(true);
        joinRoom();
      };

      webSocket.onclose = () => {
        setIsConnected(false);
      };

      webSocket.onerror = (error: Event) => {
        setIsConnected(false);
        if (onError) {
          onError(error);
        }
      };

      webSocket.onmessage = (event: MessageEvent) => {
        console.log("Received message: ", event.data);
      };

      setSocket(webSocket);

      return () => {
        webSocket.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, shouldConnect]);

  const joinRoom = () => {
    socket?.send(JSON.stringify({ action: "joinRoom", roomId }));
  };

  useEffect(() => {
    if (isConnected) {
      joinRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const sendMessage = ({
    token,
    username,
    messageText,
  }: {
    token: string;
    username: string;
    messageText: string;
  }) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          action: "sendMessage",
          token,
          roomId,
          messageText,
          username,
        })
      );
    }
  };

  return { isConnected, sendMessage, shouldConnect, setShouldConnect, socket };
};

export default useWebSocket;
