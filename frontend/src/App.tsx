import { useState } from "react";
import "./App.css";
import useWebSocket from "./hooks/useWebSocket";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const WS_URL = `${import.meta.env.VITE_WS_URL}/ws`;

interface HelloResponse {
  data: string;
}

async function fetchHello(): Promise<HelloResponse> {
  return await fetch(`${BASE_URL}/api/hello`).then((res) => res.json());
}

function App() {
  const [helloMessage, setHelloMessage] = useState("");

  const handleWebSocketMessage = (event: string) => {
    console.log("Received message:", event);
  };

  const handleWebSocketError = (error: Event) => {
    console.error("Error:", error);
  };

  const { sendMessage, isConnected, shouldConnect, setShouldConnect } =
    useWebSocket(WS_URL, handleWebSocketMessage, handleWebSocketError);

  const handleClick = async () => {
    try {
      const res = await fetchHello();
      setHelloMessage(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnect = () => {
    setShouldConnect(true);
  };

  const handleWsMessageSend = () => {
    sendMessage("Hello from client");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <p>WebSocket is {isConnected ? "connected" : "disconnected"}</p>
        <div>
          {shouldConnect ? (
            <button onClick={handleWsMessageSend}>
              Send message to server
            </button>
          ) : (
            <button onClick={handleConnect}>Connect to WS</button>
          )}
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={handleClick}>Get hello message</button>
      {helloMessage ? (
        <div className="card">
          <p>{helloMessage}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
