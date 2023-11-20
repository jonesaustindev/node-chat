import { NavLink } from "react-router-dom";

import "./App.css";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, signOut } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Hello {user?.username}!</h1>
          <div>
            <NavLink to={`/chat`} className="mr-2">
              Go to chat
            </NavLink>
            <button onClick={signOut}>Sign out</button>
          </div>
        </div>
      ) : (
        <div>
          <NavLink to={`/auth`}>Go to auth</NavLink>
        </div>
      )}
    </div>
  );
}

export default App;
