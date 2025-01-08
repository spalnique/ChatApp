import { model, Schema } from 'mongoose';
import type { InferSchemaType } from 'mongoose';

import { Collections } from '@dict';

const messageSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: Collections.user,
      required: true,
    },
    content: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false }
);

export type Message = InferSchemaType<typeof messageSchema>;

export default model<Message>(Collections.message, messageSchema);
