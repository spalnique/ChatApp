import { io } from 'socket.io-client';

import type { User } from '@types';

import {
  addChat,
  addMessage,
  deleteChat,
  deleteMessage,
  editMessage,
  store,
} from '@reduxtoolkit';

const { VITE_ENV, VITE_WSS_DEV_URL, VITE_WSS_PROD_URL } = import.meta.env;

const WSS_URL =
  VITE_ENV === 'production' ? VITE_WSS_PROD_URL : VITE_WSS_DEV_URL;
const secure = VITE_ENV === 'production';

export const IO = ({ _id, username }: User) => {
  const socket = io(WSS_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    query: { id: _id, username },
    secure,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.connected);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket?.disconnected);
  });

  socket.on('chat:created', (chat) => {
    store.dispatch(addChat(chat));
    console.log('New chat started');
  });

  socket.on('chat:deleted', (id) => {
    const { payload } = store.dispatch(deleteChat(id));
    console.log('Chat deleted:', payload);
  });

  socket.on('message:sent', ({ chat, message }) => {
    store.dispatch(addMessage({ chat, message }));
    console.log('Message sent');
  });

  socket.on('message:edited', ({ chatId, message }) => {
    store.dispatch(editMessage({ chatId, message }));
    console.log('Message edited');
  });

  socket.on('message:deleted', ({ chatId, messageId }) => {
    store.dispatch(deleteMessage({ chatId, messageId }));
    console.log('Message deleted');
  });

  return socket;
};
