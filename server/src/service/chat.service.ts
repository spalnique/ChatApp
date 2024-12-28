import { Types, type UpdateQuery } from 'mongoose';
import { Chat } from '../db/model/chat.model';

const create = async (payload: Pick<Chat, 'participants'>) =>
  await Chat.create(payload);

const getById = async (chatId: string) =>
  await Chat.findById(chatId)
    .populate('participants', 'id displayName')
    .populate('messages');

const getAll = async (ids: Types.ObjectId[]) =>
  await Chat.find({ _id: { $in: ids } })
    .populate('participants', 'id displayName')
    .populate({
      path: 'messages',
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

const updateById = async (chatId: string, payload: UpdateQuery<Chat>) =>
  await Chat.findByIdAndUpdate(chatId, payload, {
    returnDocument: 'after',
  });

const deleteById = async (chatId: string) =>
  await Chat.findByIdAndDelete(chatId, { returnDocument: 'before' });

export default { create, getById, getAll, updateById, deleteById };
