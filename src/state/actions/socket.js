// // socket.js

// // Import the necessary libraries or modules
// // No external libraries are required for the native WebSocket API

// // Initialize the WebSocket connection
// const socket = new WebSocket('ws://localhost:5000'); // Replace with your server URL

// // Define event handlers
// socket.addEventListener('open', () => {
//   console.log('WebSocket connection established');
// });

// socket.addEventListener('message', (event) => {
//   console.log('Received message:', event.data);
//   // Handle the received message as needed
// });

// socket.addEventListener('close', () => {
//   console.log('WebSocket connection closed');
// });

// // Function to send a message
// const sendMessage = (message) => {
//   socket.send(message);
// };

// // Export the WebSocket connection and message sending function
// export { socket, sendMessage };
