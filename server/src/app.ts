import express from 'express';
import cors, { CorsOptions } from 'cors';

import authRouter from './router/auth.router';
import chatRouter from './router/chat.router';
import messageRouter from './router/message.router';

import errorHandler from './middleware/errorHandler';
import session from './middleware/session';
import notFoundHandler from './middleware/notFoundHandler';

const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://chat-client-jj38.onrender.com',
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();

app.set('trust proxy', 1);

app.use(cors(corsConfig));
app.use(express.json());
app.use(session);

app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('*', notFoundHandler);

app.use(errorHandler);

export default app;
