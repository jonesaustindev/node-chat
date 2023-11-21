import { NavLink } from "react-router-dom";

import "./App.css";
import { useAuth } from "./context/AuthContext";
import CrtWrapper from "./components/CrtWrapper";

function App() {
  const { user, signOut } = useAuth();

  return (
    <CrtWrapper>
      <div className="flex flex-col h-screen flex-1 justify-center items-center">
        {user ? (
          <div className="w-64">
            <h1
              style={{
                textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
              }}
              className="text-2xl font-bold"
            >
              Hello {user?.username}!
            </h1>
            <div className="flex gap-4 mt-4">
              <NavLink
                to={`/chat`}
                className="flex-1 py-2 border-2 border-green-500 flex justify-center items-center"
                style={{
                  textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
                }}
              >
                Go to chat
              </NavLink>
              <button
                className="flex-1 py-2 border-2 border-green-500 flex justify-center items-center"
                style={{
                  textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
                }}
                onClick={signOut}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <NavLink
              className="flex-1 p-2 border-2 border-green-500 flex justify-center items-center"
              style={{
                textShadow: "0px 0px 8px rgba(0, 255, 0,0.5)",
              }}
              to={`/auth`}
            >
              Ready to chat? Get started here!
            </NavLink>
          </div>
        )}
      </div>
    </CrtWrapper>
  );
}

export default App;
