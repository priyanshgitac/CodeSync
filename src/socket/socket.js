import { io } from "socket.io-client";

const socket = io("https://codesync-gmcm.onrender.com", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Socket Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Socket Error:", err.message);
});

export default socket;