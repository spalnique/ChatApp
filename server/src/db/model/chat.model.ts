import { model, Schema } from 'mongoose';
import type { InferSchemaType } from 'mongoose';

import { Collections } from '@dict';

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

export default model<Chat>(Collections.chat, chatSchema);
