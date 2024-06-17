// const socketIo = require('socket.io');

// const Message = require('./models/messageModel'); // Ensure you import the Message model

// function setupWebSocket(server) {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('New client connected');

//     // Handle incoming messages from clients
//     socket.on('sendMessage', async (data) => {
//       const { sender, receiver, message } = data;
//       const newMessage = new Message({ sender, receiver, message });
//       await newMessage.save();
//       io.emit('receiveMessage', newMessage);
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
// }

// module.exports = setupWebSocket;
