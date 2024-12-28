import express from 'express';
import cors from 'cors';

import authRouter from './router/auth.router';
import chatRouter from './router/chat.router';
import messageRouter from './router/message.router';

import errorHandler from './middleware/errorHandler';
import session from './middleware/session';
import notFoundHandler from './middleware/notFoundHandler';

const app = express();

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());
app.use(session);

app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('*', notFoundHandler);

app.use(errorHandler);

export default app;
