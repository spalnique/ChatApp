import bcryptjs from 'bcryptjs';
import createHttpError from 'http-errors';
import { Types } from 'mongoose';
import type { HydratedDocument, UpdateQuery } from 'mongoose';

import type {
  LoginCredentials,
  RegisterCredentials,
  User,
  Username,
} from '@types';

import { UserModel } from '@db';
import { ErrorMessage } from '@dict';

const create = async (
  payload: RegisterCredentials
): Promise<HydratedDocument<User>> => {
  const duplicate = await UserModel.findOne({
    $or: [{ username: payload.username }, { email: payload.email }],
  });

  if (duplicate) {
    throw createHttpError(
      409,
      duplicate.username === payload.username
        ? ErrorMessage.usernameInUse
        : ErrorMessage.emailInUse
    );
  }

  const hashedPassword = await bcryptjs.hash(payload.password, 10);

  return UserModel.create({
    ...payload,
    password: hashedPassword,
  });
};

const find = async (
  payload: LoginCredentials
): Promise<HydratedDocument<User>> => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createHttpError(404, ErrorMessage.badCredentials);
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, ErrorMessage.badCredentials);
  }

  return user;

  // return user.populate({
  //   path: 'chats',
  //   populate: [
  //     { path: 'participants', select: 'displayName id' },
  //     { path: 'messages' },
  //   ],
  // });
};

const findByUsername = async ({ username }: Username) => {
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    throw createHttpError(404, ErrorMessage.user404);
  }

  return user.id;
};

const update = async (ids: Types.ObjectId[], payload: UpdateQuery<User>) => {
  await UserModel.updateMany({ _id: { $in: ids } }, payload);
};

export default { create, find, update, findByUsername };
