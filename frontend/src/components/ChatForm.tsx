import { FormEvent, useState } from "react";

function ChatForm({ onSubmit }: { onSubmit: (messageText: string) => void }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!message) {
      return;
    }
    onSubmit(message);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Type here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
}

export default ChatForm;
