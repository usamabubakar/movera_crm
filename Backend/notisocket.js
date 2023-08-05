const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// socket.js
const {server}=require('socket.io')

const notiSocket =(io) => {
    io.on("connection", (socket) => {
        // console.log("socke listen ne lead added" ,io)
        socket.on("newlead", (newLeadData) => {
            console.log("new lead added in socket", newLeadData)
            io.emit("newlead_noti", newLeadData);
          });
    })

};

module.exports = notiSocket;
