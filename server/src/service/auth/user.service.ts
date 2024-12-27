import bcryptjs from 'bcryptjs';
import createHttpError from 'http-errors';
import { HydratedDocument } from 'mongoose';

import userModel from '../../db/model/user.model';

import {
  LoginCredentials,
  RegisterCredentials,
} from '../../@types/credentials.type';
import { User } from '../../@types/user.type';
import { ErrorMessage } from '../../@dict/errors.enum';

const create = async (
  payload: RegisterCredentials
): Promise<HydratedDocument<User>> => {
  try {
    const duplicate = await userModel.findOne({
      $or: [{ username: payload.username }, { email: payload.email }],
    });

    if (duplicate) {
      if (duplicate.username === payload.username) {
        throw createHttpError(409, ErrorMessage.usernameInUse);
      }

      if (duplicate.email === payload.email) {
        throw createHttpError(409, ErrorMessage.emailInUse);
      }
    }

    const hashedPassword = await bcryptjs.hash(payload.password, 10);

    return userModel.create({
      ...payload,
      password: hashedPassword,
    });
  } catch (error) {
    throw createHttpError(500, ErrorMessage.creatingUser);
  }
};

const find = async (
  payload: LoginCredentials
): Promise<HydratedDocument<User>> => {
  const { email, password } = payload;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw createHttpError(404, ErrorMessage.notFound);
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, ErrorMessage.wrongPassword);
  }

  return user;
};

export default { create, find };
