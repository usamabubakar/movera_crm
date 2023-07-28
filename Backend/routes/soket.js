const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetchuser = require('../middleware/fetchuser');

const startSSEServer = () => {
  const app = express();
  app.use(cors());

  let connectedClients = [];

  // SSE route for client connections
  app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();

    const client = {
      id: Date.now(),
      res,
    };

    connectedClients.push(client);

    // Handle client disconnection
    req.on('close', () => {
      connectedClients = connectedClients.filter((c) => c.id !== client.id);
    });
  });

  // SSE endpoint to send notifications
  app.post('/api/sse/notify',fetchuser, (req, res) => {
    const notificationData = req.body;
    const username=req.user_login.name
    const isAdmin = req.user_login.isadmin;

    sendSSENotification(notificationData, username, isAdmin);

    res.status(200).json({ message: 'Notification sent' });
  });

  function sendSSENotification(notificationData, username,isAdmin) {
    const eventData = `data: ${JSON.stringify({
      message: `New Lead added by ${username}`,
      isAdmin: isAdmin // Include the isAdmin value in the SSE data
    })}\n\n`;

    // Send the notification data to all connected SSE clients
    connectedClients.forEach((client) => {
      client.res.write(eventData);
    });
  }
  const port = 5001;
app.listen(port, () => {
  console.log(`SSE server listening on port ${port}`);
});
};

module.exports = startSSEServer;
