import { useState, useEffect, useCallback } from "react";

type MessageType = string; // TODO: update once chat is ready

type MessageHandler = (message: MessageType) => void;

type ErrorHandler = (error: Event) => void;

const useWebSocket = (
  url: string,
  onMessage: MessageHandler,
  onError?: ErrorHandler
) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [shouldConnect, setShouldConnect] = useState(false);

  useEffect(() => {
    if (shouldConnect) {
      const webSocket = new WebSocket(url);

      webSocket.onopen = () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
      };

      webSocket.onclose = () => {
        console.log("WebSocket Disconnected");
        setIsConnected(false);
      };

      webSocket.onerror = (error: Event) => {
        console.error("WebSocket Error: ", error);
        setIsConnected(false);
        if (onError) {
          onError(error);
        }
      };

      setSocket(webSocket);

      return () => {
        webSocket.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, shouldConnect]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event: MessageEvent) => {
      if (onMessage) {
        onMessage(event.data as MessageType);
      }
    };
  }, [socket, onMessage]);

  const sendMessage = useCallback(
    (message: MessageType) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    },
    [socket]
  );

  return { isConnected, sendMessage, shouldConnect, setShouldConnect };
};

export default useWebSocket;
