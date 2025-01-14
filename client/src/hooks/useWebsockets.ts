import useSocketContext from './useSocketContext.ts';

export default function useWebsockets() {
  const socket = useSocketContext();

  return {
    isConnected: () => !!socket?.connected,

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

    disconnect: () => socket?.disconnect(),
  };
}
