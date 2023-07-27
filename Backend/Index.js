const express = require('express');
const connectDatabase = require('./db');
const app = express();
const expressIp = require('express-ip');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const initSocket = require('../Backend/routes/soket');
const http = require('http');
const startSSEServer = require('./routes/soket');
const server = http.createServer(app);
const multer = require('multer');
// // ...
const path = require('path');

// const upload = require('./routes/multerconfig');

// // ... other configurations and middleware ...

// // Use the 'upload' middleware to handle file uploads
// app.use(upload);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Initialize the socket.io instance
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true,
  reconnection: false
});
app.use(cors());
connectDatabase();

const port = 5000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(expressIp().getIpInfoMiddleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/emailsent', require('./routes/emailsent'));
app.use('/api/agentcurd', require('./routes/agentcurd'));
app.use('/api/vendorcrud', require('./routes/vendorcrud'));
app.use('/api/sendemail', require('./routes/email'));
app.use('/api/lead', require('./routes/lead'));
app.use('/api/dashbord', require('./routes/dashbord'));
app.use('/api/vendor', require('./routes/vendorlead'));
app.use('/api/fetchuserdata', require('./routes/fetchuserdata'));
app.use('/api/agreement', require('./routes/agreement'));
app.use('api/sse/notify', require('./routes/soket'))
app.use('/api/chat', require('./routes/chat'));



app.use(express.static('../build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})



// Chat functionality

var clients = [];

// io.on('connection', function(client) {
//   var userId = client.handshake.query.userId;

//   // Check if the user ID already exists in the client array
//   var existingClientIndex = clients.findIndex(function(c) {
//     return c.userId === userId;
//   });

//   // If the user ID exists, remove the existing client object
//   if (existingClientIndex !== -1) {
//     clients.splice(existingClientIndex, 1);
//   }

//   // Create a new client object with the user ID and push it to the array
//   clients.push({ userId: userId, client: client });

//   var clientIds = clients.map(client => client.userId);
//   console.log(clientIds);

//   client.on('send_private_message', function(data) {
//     console.log('Received message:', data);

//     // Extract the recipient ID from the received data
//     var recipientId = data.recipientId;

//     // Find the client object of the recipient in the clients array
//     var recipientClient = clients.find(function(c) {
//       return c.userId === recipientId;
//     });

//     if (recipientClient) {
//       // Emit the message to the recipient
//       try {
//         recipientClient.client.emit('private_message', { message: data.message });
//         console.log("Message sent");
//       } catch (error) {
//         console.error("Error occurred while sending the message:", error);
//       }
//     } else {
//       console.log('Recipient not found in clients');
//       // Handle the case when the recipient is not in the clients array
//     }
//   });

//   client.on('disconnect', function() {
//     clients.splice(clients.findIndex(function(c) {
//       return c.client.id === client.id;
//     }), 1);
//   });
// });

let onlineuser = []
io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("addnewuser", (userid) => {
    console.log("userid", userid)
    !onlineuser.some(user => user.userid === userid) &&
      onlineuser.push({
        userid,
        socketid: socket.id
      })
  })
  console.log(onlineuser)
  io.emit("getonlineuser", onlineuser)
  socket.on('newmsg', (data) => {
    const msg=data[0].message
    const user = onlineuser.filter((user) => user.userid!== data.recipientId);
    const socket_id= user[0].socketid
    if(user){
      io.to(socket_id).emit("getmsg", msg, (response) => {
        // This callback will be executed when the client receives an acknowledgment from the server
        if (response) {
          console.log("Message sent successfully:", response);
        } else {
          console.log("Message delivery timed out.");
        }
      })

    }
  })


  socket.on('logout', (userid) => {
    // Remove the user from the onlineUsers array
    onlineuser = onlineuser.filter((user) => user.userid !== userid);

    // Emit the updated list of online users to all clients
    io.emit('getonlineuser', onlineuser);

    console.log('User logged out:', userid);
  });

});


// io.listen(5000);
// startSSEServer();
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});