const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all for now
    methods: ["GET", "POST"]
  }
});

const COLORS = ["red", "green", "blue", "yellow"];
const rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        turnIndex: 0
      };
    }

    const room = rooms[roomId];

    // Assign color if available
    const availableColors = COLORS.filter(c => !Object.values(room.players).includes(c));
    if (availableColors.length === 0) {
      socket.emit("room-full");
      return;
    }

    const assignedColor = availableColors[0];
    room.players[socket.id] = assignedColor;

    io.to(roomId).emit("player-list", room.players);
    socket.emit("color-assigned", assignedColor);
    socket.emit("turn-changed", COLORS[room.turnIndex]);

    console.log(`${socket.id} assigned color ${assignedColor} in room ${roomId}`);
  });

  socket.on("make-move", ({ roomId }) => {
    const room = rooms[roomId];
    const playerColor = room.players[socket.id];
    const currentTurnColor = COLORS[room.turnIndex];

    if (playerColor !== currentTurnColor) {
      socket.emit("not-your-turn");
      return;
    }

    // Broadcast the move
    io.to(roomId).emit("player-moved", { color: playerColor });

    // Advance the turn
    room.turnIndex = (room.turnIndex + 1) % COLORS.length;
    io.to(roomId).emit("turn-changed", COLORS[room.turnIndex]);
  });

  socket.on("disconnecting", () => {
    for (const roomId of socket.rooms) {
      if (rooms[roomId]) {
        delete rooms[roomId].players[socket.id];
        io.to(roomId).emit("player-list", rooms[roomId].players);
      }
    }
    console.log("Disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Socket.IO server on http://localhost:4000");
});
