import { type RequestHandler } from 'express';

import { chatService, messageService } from '@services';

const create: RequestHandler = async (req, res, _next) => {
  const { chatId, content } = req.body;
  const { displayName, username } = req.session.user;

  const message = await messageService.create({
    author: { displayName, username },
    content,
  });

  chatService.updateById(chatId, {
    $push: { messages: message.id },
  });

  res.status(201).json({
    status: 201,
    message: 'Successfulle sent new message',
    data: message,
  });
};

const editById: RequestHandler = async (req, res, _next) => {
  const message = await messageService.edit(req.params.messageId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully edited message',
    data: message,
  });
};

const deleteById: RequestHandler = async (req, res, _next) => {
  const message = await messageService.remove(req.params.messageId);

  chatService.updateById(req.body.chatId, {
    $pull: { messages: message.id },
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted message',
    data: message.id,
  });
};

export default { create, editById, deleteById };
