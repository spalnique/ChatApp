import { type RequestHandler } from 'express';
import createHttpError from 'http-errors';

import { chatService, userService } from '@services';

const create: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.create({
    participants: [req.session.user._id, ...req.body.participants],
  });

  userService.update([req.session.user._id, ...req.body.participants], {
    $addToSet: { chats: chat._id },
  });

  req.session.user.chats.push(chat._id);

  // проінформувати клієнтів про створення нового чату

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
  const chats = await chatService.getAll(req.session.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved all chats',
    data: chats,
  });
};

const updateById: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.updateById(req.params.chatId, req.body);

  // проінформувати про оновлення чату

  res.status(200).json({
    status: 200,
    message: 'Successfully updated chat',
    data: chat,
  });
};

const deleteById: RequestHandler = async (req, res, _next) => {
  const chat = await chatService.deleteById(req.params.chatId);

  // проінформувати про видалення чату

  userService.update(chat.participants, { $pull: { chats: chat._id } });

  req.session.user.chats = req.session.user.chats.filter((item) => {
    console.log(item === chat.id);
    return item !== chat.id;
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted chat',
    data: chat,
  });
};

export default { create, getById, getAll, deleteById, updateById };
