import { useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import type { Socket } from 'socket.io-client';

import { socketContext } from '@context';
import { selectUser, useAppSelector } from '@reduxtoolkit';
import { IO } from '@websockets';

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUser);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user && !socket) {
      const newSocket = IO(user);
      setSocket(newSocket);
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [user, socket]);

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
export default SocketProvider;
