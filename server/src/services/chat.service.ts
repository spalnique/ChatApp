import { Types } from 'mongoose';
import type { UpdateQuery } from 'mongoose';

import type { Chat } from '@types';

import { ChatModel } from '@db';

const create = async (payload: Pick<Chat, 'participants'>) =>
  await ChatModel.create(payload);

const getById = async (chatId: string) =>
  await ChatModel.findById(chatId)
    .populate('participants', 'id displayName')
    .populate('messages');

const getAll = async (ids: Types.ObjectId[]) =>
  await ChatModel.find({ _id: { $in: ids } })
    .populate('participants', 'id displayName')
    .populate({
      path: 'messages',
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

const updateById = async (chatId: string, payload: UpdateQuery<Chat>) =>
  await ChatModel.findByIdAndUpdate(chatId, payload, {
    returnDocument: 'after',
  });

const deleteById = async (chatId: string) =>
  await ChatModel.findByIdAndDelete(chatId, { returnDocument: 'before' });

export default { create, getById, getAll, updateById, deleteById };
