import express from 'express';
import { getChatByIdController } from '../controllers/chat/getChatById.controller';

const router = express.Router();

router.get('/:id', getChatByIdController);

export default router;
