import { createContext } from 'react';

export const socketContext = createContext<{
  isConnected: boolean;

  createChat: (...participants: string[]) => void;

  deleteChat: (chatId: string) => void;

  sendMessage: (data: {
    chatId: string;
    author: { displayName: string | null; username: string };
    content: string;
  }) => void;

  editMessage: (
    chatId: string,
    messageId: string,
    content: string | null
  ) => void;

  deleteMessage: (chatId: string, messageId: string) => void;
} | null>(null);
