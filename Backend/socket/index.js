const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:3000"
});

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("listening on 5000"); // Change the message to reflect the correct port
});

io.listen(5000); // Change the port to 5000
