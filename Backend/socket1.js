const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// socket.js
const {server}=require('socket.io')
let onlineuser = [];

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A new client has connected.");
    socket.on("addnewuser", (userid) => {
      console.log("userid", userid);
      !onlineuser.some((user) => user.userid === userid) &&
        onlineuser.push({
          userid,
          socketid: socket.id,
        });
    });
    console.log(onlineuser);
    io.emit("getonlineuser", onlineuser);
    socket.on('newmsg', (data) => {
      const msg = data[0].message;
      const user = onlineuser.filter((user) => user.userid !== data.recipientId);
      console.log("user", user);
      const socket_id = user[0].socketid;
      console.log("socket_id", socket_id);

      if (user && socket_id) {
        socket.to(socket_id).emit("getmsg", msg, (response) => {
          // This callback will be executed when the client receives an acknowledgment from the server
          if (response) {
            console.log("Message sent successfully:", response);
          } else {
            console.log("Message delivery timed out.");
          }
        });
      } else {
        console.log("Recipient socket not found.");
      }
    });



    socket.on("logout", (userid) => {
      // Remove the user from the onlineUsers array
      onlineuser = onlineuser.filter((user) => user.userid !== userid);

      // Emit the updated list of online users to all clients
      io.emit("getonlineuser", onlineuser);

      console.log("User logged out:", userid);
    });

    socket.on("disconnect", () => {
      console.log("A client has disconnected.");
    });
  });
};

module.exports = initSocket;
