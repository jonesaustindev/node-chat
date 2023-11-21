import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import { useAuth } from "./context/AuthContext";
import CrtWrapper from "./components/CrtWrapper";

function Auth() {
  const { signIn, signUp, user } = useAuth();
  const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");

  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  const handleSubmit = async (username: string, password: string) => {
    try {
      if (formType === "signUp") {
        await signUp(username, password);
      }
      if (formType === "signIn") {
        await signIn(username, password);
      }

      navigate("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormTypeChange = () => {
    setFormType(formType === "signIn" ? "signUp" : "signIn");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const buttonText =
    formType === "signIn"
      ? "Create an account"
      : "Sign in with an existing account";

  return (
    <CrtWrapper>
      {message ? (
        <div className="bg-red-500 text-white p-2">{message}</div>
      ) : null}
      <AuthForm
        buttonText={formType === "signIn" ? "Sign in" : "Sign up"}
        onSubmit={handleSubmit}
      />
      <div className="w-2/3 m-auto mt-4">
        <button
          className="p-2 bg-green-800 text-green-300 border border-green-700 hover:bg-green-600"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          onClick={handleFormTypeChange}
        >
          {buttonText}
        </button>
      </div>
    </CrtWrapper>
  );
}

export default Auth;
