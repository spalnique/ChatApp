import { Message } from './message.type';
import { User } from './user.type';

export type Chat = {
  _id: string;
  participants: Partial<User>[];
  messages: Partial<Message>[];
  createdAt: string;
  updatedAt: string;
};
