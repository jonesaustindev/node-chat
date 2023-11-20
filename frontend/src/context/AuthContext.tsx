import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BASE_OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

interface AuthContextType {
  user: { username: string } | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<{ username: string } | null>(null);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const signIn = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/auth/sign-in`, {
      ...BASE_OPTIONS,
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data?.token);
      localStorage.setItem("user", JSON.stringify(data?.user));
      setUser(data?.user);
    } else {
      signOut();
    }
  };

  const signUp = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
      ...BASE_OPTIONS,
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data?.token);
      localStorage.setItem("user", JSON.stringify(data?.user));
      setUser(data?.user);
    } else {
      signOut();
    }
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const parsedUser = JSON.parse(userFromStorage);
      setUser(parsedUser);
    } else {
      signOut();
    }
  }, []);

  const authContextValue = { user, signIn, signUp, signOut };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
