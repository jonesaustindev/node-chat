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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
