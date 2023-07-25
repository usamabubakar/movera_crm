const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', (ws) => {
  // Handle new WebSocket connections
  console.log('New WebSocket connection');

  // Handle WebSocket messages
  ws.on('message', (message) => {
    // Process the received message
    const data = JSON.parse(message);

    // Check if the message is related to a new lead
    if (data.type === 'newLead') {
      // Broadcast the notification to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'newLead' }));
        }
      });
    }
  });
});
