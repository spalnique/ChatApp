import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
  { author: { type: String }, content: { type: String } },
  { timestamps: true, versionKey: false }
);

export default model('Message', messageSchema);
