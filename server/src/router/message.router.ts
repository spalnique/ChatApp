import express from 'express';
import errorWrapper from '../helper/errorWrapper';
import authGuard from '../middleware/authGuard';
import messageController from '../controller/message.controller';

const router = express.Router();

router.use(authGuard);

router.post('/', errorWrapper(messageController.create));
router.patch('/:messageId', errorWrapper(messageController.editById));
router.delete('/:messageId', errorWrapper(messageController.deleteById));

export default router;
