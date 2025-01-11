import { Types } from 'mongoose';
import type { UpdateQuery } from 'mongoose';

import type { Chat } from '@types';

import { ChatModel } from '@db';

const populateQuery = [
  { path: 'participants', select: 'displayName username' },
  { path: 'messages', options: { sort: { createdAt: -1 } } },
];

const create = async (payload: Pick<Chat, 'participants'>) => {
  const chat = new ChatModel(payload);
  await chat.save();

  return await chat.populate(populateQuery);
};
const getById = async (chatId: string) =>
  await ChatModel.findById(chatId).populate(populateQuery);

const getAll = async (id: Types.ObjectId) =>
  await ChatModel.find({ participants: id }).populate([
    { path: 'participants', select: 'displayName username' },
    {
      path: 'messages',
      options: { sort: { createdAt: -1 }, limit: 1 },
    },
  ]);

const updateById = async (chatId: string, payload: UpdateQuery<Chat>) =>
  await ChatModel.findByIdAndUpdate(chatId, payload, {
    returnDocument: 'after',
  }).populate(populateQuery);

const deleteById = async (chatId: string) =>
  await ChatModel.findByIdAndDelete(chatId, { returnDocument: 'before' });

export default { create, getById, getAll, updateById, deleteById };
