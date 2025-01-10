import { io } from 'socket.io-client';

import type { Chat, User } from '@types';

import { addChat, deleteChat, store } from '@reduxtoolkit';

const WSS_URL = JSON.parse(import.meta.env.VITE_PROD_ENV)
  ? import.meta.env.VITE_WSS_PROD_URL
  : import.meta.env.VITE_WSS_DEV_URL;

export const IO = ({ _id: id, username }: User) => {
  const socket = io(WSS_URL, {
    query: { id, username },
    reconnection: true,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.connected);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket?.disconnected);
  });

  socket.on('chat:created', (data: Chat) => {
    console.log('New chat started');
    console.log(data);
    store.dispatch(addChat(data));
  });

  socket.on('chat:deleted', (data: string) => {
    store.dispatch(deleteChat(data));
    console.log('Chat deleted');
  });

  return socket;
};
