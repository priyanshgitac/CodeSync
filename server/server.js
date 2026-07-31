const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://code-sync-six-silk.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

// roomId -> array of socket ids
const roomUsers = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    socket.roomId = roomId;

    if (!roomUsers[roomId]) {
      roomUsers[roomId] = [];
    }

    roomUsers[roomId].push(socket.id);

    io.to(roomId).emit("users-update", roomUsers[roomId]);

    console.log(`${socket.id} joined ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  socket.on("disconnect", () => {
    console.log("User Left:", socket.id);

    const roomId = socket.roomId;

    if (roomId && roomUsers[roomId]) {
      roomUsers[roomId] = roomUsers[roomId].filter(
        (id) => id !== socket.id
      );

      io.to(roomId).emit("users-update", roomUsers[roomId]);

      if (roomUsers[roomId].length === 0) {
        delete roomUsers[roomId];
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});