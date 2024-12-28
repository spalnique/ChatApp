import express from 'express';
import chatController from '../controller/chat.controller';
import errorWrapper from '../helper/errorWrapper';
import authGuard from '../middleware/authGuard';

const router = express.Router();

router.use(authGuard);

router.post('/', errorWrapper(chatController.create));
router.get('/:chatId', errorWrapper(chatController.getById));
router.patch('/:chatId', errorWrapper(chatController.updateById));
router.delete('/:chatId', errorWrapper(chatController.deleteById));

export default router;
