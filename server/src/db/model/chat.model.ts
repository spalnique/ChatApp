import { type InferSchemaType, model, Schema } from 'mongoose';
import { Collections } from '../../@dict/collection.enum';

const chatSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: Collections.user,
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: Collections.message,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type Chat = InferSchemaType<typeof chatSchema>;

export const Chat = model(Collections.chat, chatSchema);
