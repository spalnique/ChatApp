import { model, Schema } from 'mongoose';
import type { InferSchemaType } from 'mongoose';

import { Collections } from '@dict';

const userSchema = new Schema(
  {
    displayName: { type: String, default: null },
    isAdult: { type: Boolean, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    chats: [
      { type: Schema.Types.ObjectId, ref: Collections.chat, default: [] },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export type User = InferSchemaType<typeof userSchema>;

export default model<User>(Collections.user, userSchema);
