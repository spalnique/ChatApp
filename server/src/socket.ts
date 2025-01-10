import http from 'http';
import { Types } from 'mongoose';
import { Server } from 'socket.io';

import { chatService } from '@services';

import app, { corsConfig } from './app.ts';

const httpServer = http.createServer(app); // HTTP-сервер
const io = new Server(httpServer, {
  cors: corsConfig,
});

const userSockets = new Map<string, string>();

// Socket.IO логіка
io.on('connection', (socket) => {
  const userId = socket.handshake.query.id as string;
  const username = socket.handshake.query.username as string;

  if (userId && username) {
    userSockets.set(userId, socket.id);
    console.log(`User ${username} connected with socketId: ${socket.id}`);
  } else {
    console.log('User info not provided in query');
  }

  // // Реєстрація користувача після підключення
  // socket.on('user:connected', (userId: string) => {
  //   userSockets.set(userId, socket.id);
  //   console.log(`User ${userId} connected with socket ${socket.id}`);
  // });

  // Користувач відключився
  socket.on('disconnect', () => {
    userSockets.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        console.log(`User ${userId} disconnected`);
      }
    });
  });

  // Подія створення чату
  socket.on('chat:create', async (data) => {
    try {
      const participants = [...(data.participants as string[]), userId];
      const transformed = participants.map((id) => new Types.ObjectId(id));

      const chat = await chatService.create({
        participants: transformed,
      });

      participants.forEach((id) => {
        if (userSockets.has(id)) {
          const receiverSocketId = userSockets.get(id);
          io.to(receiverSocketId).emit('chat:created', chat);
        }
      });
      console.log(
        `Chat created: ${chat.id} with participants: ${chat.participants}`
      );
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  });

  socket.on('chat:delete', async (data) => {
    try {
      const chatId = data;
      const deletedChat = await chatService.deleteById(chatId);

      deletedChat.participants.forEach((objectId) => {
        const id = objectId.toString();
        if (userSockets.has(id)) {
          const receiverSocketId = userSockets.get(id);
          io.to(receiverSocketId).emit(
            'chat:deleted',
            deletedChat.id ?? deletedChat._id.toString()
          );
        }
      });
    } catch (error) {
      console.error('Error deleting chat', error);
    }
  });
});

export default httpServer;
