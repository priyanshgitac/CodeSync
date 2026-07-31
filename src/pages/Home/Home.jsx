import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



/*"Why className instead of class?"

Because class is a reserved keyword in JavaScript (used for creating classes). JSX is JavaScript, so React uses className to apply CSS classes.

This is one of the most common React interview questions.*/ 

function Home() {
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  function createRoom() {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    navigate(`/editor/${id}`);
  }

  function joinRoom() {
    if (roomId.trim() === "") {
      alert("Please enter a Room ID");
      return;
    }

    navigate(`/editor/${roomId}`);
  }

  return (
    <div className="home">
      <div className="home-container">
        <h1>⚡ CodeSync</h1>

        <p>Code Together. Build Faster.</p>

        <button onClick={createRoom}>
          Create New Room
        </button>

        <span>OR</span>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
}

export default Home;