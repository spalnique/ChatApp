import cors, { CorsOptions } from 'cors';
import express from 'express';

import { errorHandler, notFoundHandler, session } from '@middlewares';
import { authRouter, chatRouter, messageRouter } from '@router';

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
