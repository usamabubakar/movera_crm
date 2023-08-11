const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// socket.js
const { server } = require('socket.io')
let onlineuser = {};

const initSocket = (io) => {
  io.on('connection', (socket) => {

    console.log("soket")
    socket.on("addnewuser", (id) => {
      if (!onlineuser[id]) {
        onlineuser[id] = socket.id // Add the user to the onlineUsers object
      }
      io.emit("getonlineuser", onlineuser);
      console.log("onlineuser", onlineuser)
    })
    // Server-side code
    socket.on('newmsg', (data) => {
      const id= data[0]?.recipientId
      const msg=data[0]?.message
      console.log(data)
      console.log(id, msg)

      const recipientSocket = onlineuser[id];
      console.log(recipientSocket)
      if (recipientSocket) {
      const chek=  io.to(recipientSocket).emit('getmsg', msg);
      console.log("respone", chek)
      if(chek ){
        console.log("masg send success")
      }
      } else {
        console.log('Recipient socket not found.');
      }
    });



    socket.on("disconnect", (reason) => {
      console.log(`A client has disconnected. Reason: ${reason}`);
      // You can add additional logic based on the reason here
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  })

  // io.on("connection", (socket) => {
  //   socket.on('error', (error) => {
  //     console.error('Socket error:', error);
  //   });

  //   socket.on("connect", () => {
  //     console.log("A new client has connected.", socket.id);
  //   });
  //   socket.on("addnewuser", (userid) => {
  //     console.log("useridd", userid);
  //     !onlineuser.some((user) => user.userid === userid) &&
  //       onlineuser.push({
  //         userid,
  //         socketid: socket.id,
  //       });
  //       console.log(onlineuser);
  //   });

  //   io.emit("getonlineuser", onlineuser);
  //   socket.on('newmsg', (data) => {
  //     const msg = data[0]?.message;
  //     console.log(data)
  //     const user = onlineuser.filter((user) => user.userid !== data.recipientId);
  //     console.log("user", user);
  //     const socket_id = user[0]?.socketid;
  //     console.log("socket_id", socket_id);

  //     if (user && socket_id) {
  //       socket.to(socket_id).emit("getmsg", msg, (response) => {
  //         // This callback will be executed when the client receives an acknowledgment from the server
  //         if (response) {
  //           console.log("Message sent successfully:", response);
  //         } else {
  //           console.log("Message delivery timed out.");
  //         }
  //       });
  //     } else {
  //       console.log("Recipient socket not found.");
  //     }
  //   });



  //   socket.on("logout", (userid) => {
  //     // Remove the user from the onlineUsers array
  //     onlineuser = onlineuser.filter((user) => user.userid !== userid);

  //     // Emit the updated list of online users to all clients
  //     io.emit("getonlineuser", onlineuser);

  //     console.log("User logged out:", userid);
  //   });


  // });
};

module.exports = initSocket;
