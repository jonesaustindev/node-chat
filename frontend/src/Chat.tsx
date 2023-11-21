import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import useWebSocket from "./hooks/useWebSocket";
import ChatForm from "./components/ChatForm";
import useChatMessages from "./hooks/useChatMessages";
import CrtWrapper from "./components/CrtWrapper";

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

  return (
    <CrtWrapper>
      {!shouldConnect ? (
        <button className="text-white" onClick={handleConnect}>
          Connect to WS
        </button>
      ) : (
        <div>
          <div className="flex justify-between">
            <div className="w-56 py-2 border-2 border-green-500 flex justify-center items-center">
              <p
                className="font-bold text-xs"
                style={{
                  textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
                }}
              >
                Connection status: {isConnected ? "connected" : "disconnected"}
              </p>
            </div>
            <button
              className="w-32 py-2 border-2 border-green-500 flex justify-center items-center"
              style={{
                textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
              }}
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
          <div className="mt-8 overflow-y-auto h-5/6 relative">
            {messages && messages.length > 0 ? (
              <div>
                {messages?.map((message, index) => {
                  const isCurrentUser = user?.username === message.username;
                  return (
                    <div key={index} className="flex mb-2">
                      <p
                        className="font-bold relative z-10 mr-2"
                        style={{
                          textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
                        }}
                      >
                        {isCurrentUser ? ">" : ""}
                        {message.username}:
                      </p>
                      <p
                        className="relative z-10"
                        style={{
                          textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
                        }}
                      >
                        {message.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}
      {shouldConnect ? <ChatForm onSubmit={handleWsMessageSend} /> : null}
    </CrtWrapper>
  );
}

export default Chat;
