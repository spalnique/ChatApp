import express from 'express';
import cors from 'cors';

import authRouter from './router/auth.router';
import chatRouter from './router/chat.router';

import errorHandler from './middleware/errorHandler.controller';
import sessionHandler from './middleware/sessionHandler';

const app = express();

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

app.use(sessionHandler);
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use(errorHandler);

export default app;
