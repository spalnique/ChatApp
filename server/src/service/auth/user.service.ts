import bcryptjs from 'bcryptjs';
import createHttpError from 'http-errors';
import { type HydratedDocument } from 'mongoose';

import UserCollection, { type User } from '../../db/model/user.model';

import {
  type LoginCredentials,
  type RegisterCredentials,
} from '../../@types/credentials.type';

import { ErrorMessage } from '../../@dict/errors.enum';

const create = async (
  payload: RegisterCredentials
): Promise<HydratedDocument<User>> => {
  const duplicate = await UserCollection.findOne({
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

  return UserCollection.create({
    ...payload,
    password: hashedPassword,
  });
};

const find = async (
  payload: LoginCredentials
): Promise<HydratedDocument<User>> => {
  const { email, password } = payload;

  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, ErrorMessage.user404);
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, ErrorMessage.user404);
  }

  return user;
};

export default { create, find };
