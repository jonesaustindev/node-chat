import { FormEvent, useState } from "react";

function ChatForm({ onSubmit }: { onSubmit: (messageText: string) => void }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!message) {
      return;
    }
    setMessage("");
    onSubmit(message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 px-2 absolute bottom-2 left-0 right-0 z-10 flex"
    >
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
        className="w-full p-2 bg-green-800 text-green-300 border border-green-700 focus:outline-none focus:border-green-500"
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
      <button
        type="submit"
        className="p-2 bg-green-800 text-green-300 border border-green-700 hover:bg-green-600"
        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
      >
        Send
      </button>
    </form>
  );
}

export default ChatForm;
