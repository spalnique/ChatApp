import express from 'express';

import { chatController } from '@controllers';
import { errorWrapper } from '@helpers';
import { authGuard } from '@middlewares';

const chatRouter = express.Router();

chatRouter.use(authGuard);

chatRouter.post('/', errorWrapper(chatController.create));
chatRouter.get('/', errorWrapper(chatController.getAll));
chatRouter.get('/:chatId', errorWrapper(chatController.getById));
chatRouter.patch('/:chatId', errorWrapper(chatController.updateById));
chatRouter.delete('/:chatId', errorWrapper(chatController.deleteById));

export default chatRouter;
