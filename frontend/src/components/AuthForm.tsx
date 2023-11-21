import { useState, FormEvent } from "react";

interface AuthFormProps {
  buttonText: string;
  onSubmit: (username: string, password: string) => void;
}

function AuthForm({ buttonText, onSubmit }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Please fill out all fields");
      return;
    }
    onSubmit(username, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-2/3 m-auto"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 bg-green-800 text-green-300 border border-green-700 focus:outline-none focus:border-green-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-green-800 text-green-300 border border-green-700 focus:outline-none focus:border-green-500"
      />
      <button
        type="submit"
        className="p-2 bg-green-800 text-green-300 border border-green-700 hover:bg-green-600"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
