const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const util = require("./utils/msg");
const userUtil = require("./utils/user");

const app = express();

const server = http.createServer(app);
const socket = socketIo(server);

app.use(express.static(path.join(__dirname, "public")));

const bot = "admin";
//all these connection "joinRoom" words are coming from frontend
socket.on("connection", (skt) => {
  skt.on("join", ({ username, room }) => {
    const us = userUtil.userJoin(skt.id, username, room);
    //to single current client
    skt.emit("message", util.formatMessage(bot, "Welcome to the chat"));
    //to talk client except the user itself
    skt.broadcast.emit(
      "message",
      util.formatMessage(bot, "a new user " + username + " joined the chat")
    );
  });

  //brodacst to every one
  //// socket.emit("message",)

  //when user disconnect

  skt.on("disconnect", () => {
    const current = userUtil.getCurrentUser(skt.id);

    //sending message to every one
    socket.emit(
      "message",
      util.formatMessage(bot, `A user ${current.user} has left the chat`)
    );
  });

  //listen chatr message

  skt.on("chatMessage", (msg) => {
    const current = userUtil.getCurrentUser(skt.id);
    console.log(current.room);

    socket.emit("message", util.formatMessage(current.user, msg));
  });
});

const port = 3000 || process.env.PORT;

server.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
});
