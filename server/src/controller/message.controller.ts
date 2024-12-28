import { type RequestHandler } from 'express';
import messageService from '../service/message.service';
import chatService from '../service/chat.service';

const create: RequestHandler = async (req, res, _next) => {
  const { chatId, content } = req.body;

  const message = await messageService.create({
    authorId: req.session.user._id,
    content,
  });

  chatService.updateById(chatId, {
    $push: { messages: message.id },
  });

  // проінформувати усіх клієнтів у відкритому сокеті для цього чата про створення повідомлення

  res.status(201).json({
    status: 201,
    message: 'Successfulle sent new message',
    data: message,
  });
};

const editById: RequestHandler = async (req, res, _next) => {
  const message = await messageService.edit(req.params.messageId, req.body);

  // проінформувати усіх клієнтів у відкритому сокеті для цього чата про редагування повідомлення

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

  // проінформувати усіх клієнтів у відкритому сокеті для цього чата про видалення повідомлення

  res.status(200).json({
    status: 200,
    message: 'Successfully deleted message',
    data: message.id,
  });
};

export default { create, editById, deleteById };
