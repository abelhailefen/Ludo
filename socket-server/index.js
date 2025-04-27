const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const COLORS = ["red", "green", "blue", "yellow"];
const rooms = {}; // Track players and game state

io.on("connection", (socket) => {
  console.log(`🔌 New connection: ${socket.id}`);

  socket.on("join-room", (roomId) => {
    console.log(`${socket.id} joined room: ${roomId}`);
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: {},
        turn: null
      };
    }

    // Assign a color
    const availableColors = COLORS.filter(
      (color) => !Object.values(rooms[roomId].players).includes(color)
    );

    if (availableColors.length === 0) {
      socket.emit("room-full");
      return;
    }

    const assignedColor = availableColors[0];
    rooms[roomId].players[socket.id] = assignedColor;
    socket.emit("color-assigned", assignedColor);

    // If first player, start turn
    if (!rooms[roomId].turn) {
      rooms[roomId].turn = assignedColor;
    }

    // Broadcast updated players and current turn
    io.to(roomId).emit("player-list", rooms[roomId].players);
    io.to(roomId).emit("turn-changed", rooms[roomId].turn);
  });

  socket.on("roll-dice", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room) return;

    // Only allow if it's your turn
    const playerColor = room.players[socket.id];
    if (room.turn !== playerColor) return;

    const diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(`${playerColor} rolled a ${diceRoll}`);

    // Emit dice roll result
    io.to(roomId).emit("dice-rolled", { color: playerColor, value: diceRoll });

    // Switch turn to next player
    const colorsInRoom = Object.values(room.players);
    const currentIndex = colorsInRoom.indexOf(room.turn);
    const nextIndex = (currentIndex + 1) % colorsInRoom.length;
    room.turn = colorsInRoom[nextIndex];

    io.to(roomId).emit("turn-changed", room.turn);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
    for (const roomId in rooms) {
      if (rooms[roomId].players[socket.id]) {
        delete rooms[roomId].players[socket.id];

        // If no players left, delete the room
        if (Object.keys(rooms[roomId].players).length === 0) {
          delete rooms[roomId];
        } else {
          io.to(roomId).emit("player-list", rooms[roomId].players);

          // If the leaving player was the current turn
          if (rooms[roomId].turn === rooms[roomId].players[socket.id]) {
            const colorsInRoom = Object.values(rooms[roomId].players);
            rooms[roomId].turn = colorsInRoom[0] || null;
            io.to(roomId).emit("turn-changed", rooms[roomId].turn);
          }
        }
      }
    }
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
