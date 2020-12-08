require('dotenv').config();
const express = require('express');
const http = require('http');
const db = require('./models/index');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { insertNewMsgToDB } = require('./utils/messages');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Connect to postgres
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

// Run when client connects
io.on('connection', (socket) => {
  console.log('Connected');
  socket.on('joinChat', ({ room }) => {
    console.log(`Socket ${socket.id} connected room ${room}`);
    socket.join(room);

    // Listen for messages
    socket.on('chat', async (data) => {
      // Insert new message to database and return it
      const message = await insertNewMsgToDB(data);

      // Emit message to client
      socket.broadcast.to(room).emit('newMsg', message);
    });
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Message routes
app.use('/api/messages', require('./routes/messageRoutes'));

// Group routes
app.use('/api/groups', require('./routes/groupRoutes'));

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
