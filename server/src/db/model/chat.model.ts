import { model, Schema } from 'mongoose';
import User from './user.model';
import Message from './message.model';

const chatSchema = new Schema(
  {
    participants: { type: [User.schema] },
    messages: { type: [Message.schema] },
    lastMessage: { type: Message.schema },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Chat = model('Chat', chatSchema);
