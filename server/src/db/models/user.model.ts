import { model, Schema } from 'mongoose';
import { User } from '../../@types/user.type';

const userSchema = new Schema(
  {
    displayName: { type: String, default: null },
    age: { type: Number, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userChats: { type: [Schema.Types.ObjectId], ref: 'Chat', default: [] },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model<User>('User', userSchema);
