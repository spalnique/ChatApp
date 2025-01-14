import { createContext } from 'react';
import type { Socket } from 'socket.io-client';

export default createContext<Socket | null>(null);
