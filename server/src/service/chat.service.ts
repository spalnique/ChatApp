import { type UpdateQuery } from 'mongoose';
import { Chat } from '../db/model/chat.model';

const create = async (payload: Pick<Chat, 'participants'>) =>
  await Chat.create(payload);

const getById = async (chatId: string) =>
  await Chat.findById(chatId).populate('participants').populate('messages');

const updateById = async (chatId: string, payload: UpdateQuery<Chat>) =>
  await Chat.findByIdAndUpdate(chatId, payload, {
    returnDocument: 'after',
  });

const deleteById = async (chatId: string) =>
  await Chat.findByIdAndDelete(chatId, { returnDocument: 'before' });

export default { create, getById, updateById, deleteById };
