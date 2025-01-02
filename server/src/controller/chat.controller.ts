import { type RequestHandler } from 'express';
import chatService from '../service/chat.service';
import createHttpError from 'http-errors';
import userService from '../service/user.service';

const create: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.create({
    participants: [req.session.user._id, ...req.body.participants],
  });

  userService.update([req.session.user._id, ...req.body.participants], {
    $addToSet: { chats: chat._id },
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created new chat',
    data: chat,
  });
};

const getById: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.getById(req.params.chatId);

  if (!chat) {
    throw createHttpError(404, 'Chat not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found chat',
    data: chat,
  });
};

const getAll: RequestHandler = async (req, res, _next) => {
  const chats = await chatService.getAll(req.session.user.chats);

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved all chats',
    data: chats,
  });
};

const updateById: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.updateById(req.params.chatId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully updated chat',
    data: chat,
  });
};

const deleteById: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.deleteById(req.params.chatId);

  userService.update(chat.participants, { $pull: { chats: chat.id } });

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted chat',
    data: chat,
  });
};

export default { create, getById, getAll, deleteById, updateById };
