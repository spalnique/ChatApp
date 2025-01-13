import http from 'http';
import { Types } from 'mongoose';
import { Server } from 'socket.io';

import { chatService, messageService } from '@services';

import app, { corsConfig } from './app';

const server = http.createServer(app); // HTTP-сервер
const io = new Server(server, {
  cors: corsConfig,
});

const userSockets = new Map<string, string>();

// Socket.IO
io.on('connection', (socket) => {
  const userId = socket.handshake.query.id as string;
  const username = socket.handshake.query.username as string;

  if (userId && username) {
    userSockets.set(userId, socket.id);
    console.log(`User ${username} connected with socketId: ${socket.id}`);
  } else {
    console.log('User info not provided in query');
  }

  socket.on('disconnect', () => {
    userSockets.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        userSockets.delete(userId);
        console.log(`User ${userId} disconnected`);
      }
    });
  });

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

  socket.on('chat:delete', async (chatId) => {
    try {
      const deletedChat = await chatService.deleteById(chatId);

      deletedChat.participants.forEach((objectId) => {
        const id = objectId.toString();

        if (userSockets.has(id)) {
          const receiverSocketId = userSockets.get(id);

          io.to(receiverSocketId).emit('chat:deleted', chatId);
        }
      });
    } catch (error) {
      console.error('Error deleting chat', error);
    }
  });

  socket.on('message:send', async ({ content, author, chatId }) => {
    try {
      const message = await messageService.create({
        author,
        content,
      });

      const chat = await chatService.updateById(chatId, {
        $push: { messages: message.id },
      });

      chat.participants.forEach(({ _id }) => {
        const id = _id.toString();

        if (userSockets.has(id)) {
          const receiverSocketId = userSockets.get(id);

          io.to(receiverSocketId).emit('message:sent', { message, chat });
        }
      });
    } catch (error) {
      console.error('Error sending message', error);
    }
  });

  socket.on('message:edit', async ({ content, messageId, chatId }) => {
    try {
      const chat = await chatService.getById(chatId);
      const message = await messageService.edit(messageId, { content });

      chat.participants.forEach(({ _id }) => {
        const id = _id.toString();

        if (userSockets.has(id)) {
          const receiverSocketId = userSockets.get(id);

          io.to(receiverSocketId).emit('message:edited', { chatId, message });
        }
      });
    } catch (error) {
      console.error('Error editing message', error);
    }
  });

  socket.on('message:delete', async ({ messageId, chatId }) => {
    try {
      await messageService.remove(messageId);

      const chat = await chatService.updateById(chatId, {
        $pull: { messages: messageId },
      });

      chat.participants.forEach(({ _id }) => {
        const id = _id.toString();

        if (userSockets.has(id)) {
          const receiverSocketId = userSockets.get(id);

          io.to(receiverSocketId).emit('message:deleted', {
            chatId,
            messageId,
          });
        }
      });
    } catch (error) {
      console.error('Error deleting message', error);
    }
  });
});

export default server;
