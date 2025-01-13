import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Socket } from 'socket.io-client';

import { socketContext } from '@context';
import { selectUser, useAppSelector } from '@reduxtoolkit';
import { IO } from '@websockets';

const SocketProvider = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectUser);

  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (user && !socket) {
      const newSocket = IO(user);
      setSocket(newSocket);
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [user, socket]);

  const value = {
    isConnected: !!socket?.connected,
    createChat: (...participants: string[]) => {
      socket?.emit('chat:create', { participants });
    },
    deleteChat: (chatId: string) => {
      socket?.emit('chat:delete', chatId);
    },
    sendMessage: (data: {
      chatId: string;
      author: { displayName: string | null; username: string };
      content: string;
    }) => {
      socket?.emit('message:send', data);
    },
    editMessage: (
      chatId: string,
      messageId: string,
      content: string | null
    ) => {
      socket?.emit('message:edit', { chatId, messageId, content });
    },
    deleteMessage: (chatId: string, messageId: string) => {
      socket?.emit('message:delete', { chatId, messageId });
    },
  };

  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};

export default SocketProvider;
