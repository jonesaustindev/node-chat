import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import useWebSocket from "./hooks/useWebSocket";
import ChatForm from "./components/ChatForm";
import useChatMessages from "./hooks/useChatMessages";

const WS_URL = `${import.meta.env.VITE_WS_URL}/ws`;

function Chat() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { sendMessage, isConnected, shouldConnect, setShouldConnect, socket } =
    useWebSocket(WS_URL);

  const { messages } = useChatMessages(!!user, socket);

  const handleConnect = () => {
    setShouldConnect(true);
  };

  const handleWsMessageSend = (messageText: string) => {
    if (user?.username) {
      sendMessage({
        token: localStorage.getItem("token") || "",
        username: user?.username,
        messageText,
      });
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate("/auth");
  };

  // Init chat
  useEffect(() => {
    if (!user) {
      navigate("/auth", {
        state: { message: "You must be signed in to chat." },
      });
    } else {
      setShouldConnect(true);
    }
  }, [user, navigate, shouldConnect, setShouldConnect]);

  console.log(messages);

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
      <h1>Chat</h1>
      <div className="card">
        <p>WebSocket is {isConnected ? "connected" : "disconnected"}</p>
        {messages && messages.length > 0 ? (
          <div>
            {messages?.map((message, index) => {
              return (
                <div key={index} className="flex">
                  <p className="mr-2">{message.username}</p>
                  <p>{message.message}</p>
                </div>
              );
            })}
          </div>
        ) : null}
        <div>
          {shouldConnect ? (
            <ChatForm onSubmit={handleWsMessageSend} />
          ) : (
            <button onClick={handleConnect}>Connect to WS</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
