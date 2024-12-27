import express from 'express';
import { getChatByIdController } from '../controller/chat.controller';

const router = express.Router();

router.get('/:id', getChatByIdController);

export default router;
