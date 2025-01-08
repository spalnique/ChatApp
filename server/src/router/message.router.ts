import express from 'express';

import { messageController } from '@controllers';
import { errorWrapper } from '@helpers';
import { authGuard } from '@middlewares';

const messageRouter = express.Router();

messageRouter.use(authGuard);

messageRouter.post('/', errorWrapper(messageController.create));
messageRouter.patch('/:messageId', errorWrapper(messageController.editById));
messageRouter.delete('/:messageId', errorWrapper(messageController.deleteById));

export default messageRouter;
