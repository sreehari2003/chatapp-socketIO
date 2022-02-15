const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);
const socket = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

socket.on("connection", (skt) => {
  console.log("hello new user");

  //to single client
  skt.emit("message", "Welcome to the chat");

  //to sll client except the user itself
  skt.broadcast.emit("message", "a new user joined the chat");

  //brodacst to every one

  // socket.emit("message",)
});

const port = 3000 || process.env.PORT;

server.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
});
