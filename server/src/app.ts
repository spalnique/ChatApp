import express from 'express';
import cors from 'cors';

import authRouter from './routers/auth.router';
import chatRouter from './routers/chat.router';

import errorHandler from './middlewares/errorHandler.controller';
import sessionHandlerController from './middlewares/sessionHandler.controller';

const app = express();
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

app.use(sessionHandlerController);
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);
app.use(errorHandler);

export default app;
