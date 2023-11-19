import { useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface HelloResponse {
  data: string;
}

async function fetchHello(): Promise<HelloResponse> {
  return await fetch(`${BASE_URL}/api/hello`).then((res) => res.json());
}

function App() {
  const [helloMessage, setHelloMessage] = useState("");

  const handleClick = async () => {
    try {
      const res = await fetchHello();
      setHelloMessage(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>Get hello message</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {helloMessage ? (
        <div className="card">
          <p>{helloMessage}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
