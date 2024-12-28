import { Message } from '../db/model/message.model';

const create = async (payload: Partial<Message>) =>
  await Message.create(payload);

const edit = async (id: string, payload: Partial<Message>) =>
  await Message.findByIdAndUpdate(id, payload, { returnDocument: 'after' });

const remove = async (id: string) =>
  await Message.findByIdAndDelete(id, { returnDocument: 'before' });

export default { create, edit, remove };
