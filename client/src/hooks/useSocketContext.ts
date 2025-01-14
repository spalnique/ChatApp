import { useContext } from 'react';

import { socketContext } from '@context';

export default function useSocketContext() {
  const context = useContext(socketContext);

  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }

  return context;
}
