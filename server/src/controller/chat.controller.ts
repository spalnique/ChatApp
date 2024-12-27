import { type RequestHandler } from 'express';
import { getChatById } from '../service/chat/getChatById.service';

export const getChatByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) res.json('Wrong id');

  const chat = await getChatById(id);

  res.json(chat);
};
