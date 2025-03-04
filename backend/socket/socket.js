import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId, socketId}

io.on("connection", (socket) => {
  console.log(`🟢 Người dùng đã kết nối: ${socket.id}`);
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log(`🔴 Người dùng đã ngắt kết nối: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  socket.on("TYPING", ({ fullName }) => {
    if (fullName) {
      socket.broadcast.emit("USER_TYPING", { fullName });
    }
  });

  socket.on("STOP_TYPING", ({ fullName }) => {
    if (fullName) {
      socket.broadcast.emit("USER_STOP_TYPING", { fullName });
    }
  });
});

export { app, io, server };
