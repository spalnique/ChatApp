import type { Message } from '@types';

import { MessageModel } from '@db';

const create = async (payload: Partial<Message>) =>
  await MessageModel.create(payload);

const edit = async (id: string, payload: Partial<Message>) =>
  await MessageModel.findByIdAndUpdate(id, payload, {
    returnDocument: 'after',
  });

const remove = async (id: string) =>
  await MessageModel.findByIdAndDelete(id, { returnDocument: 'before' });

export default { create, edit, remove };
