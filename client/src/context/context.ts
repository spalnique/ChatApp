import { createContext } from 'react';
import type { Socket } from 'socket.io-client';

export const socketContext = createContext<Socket | null>(null);
