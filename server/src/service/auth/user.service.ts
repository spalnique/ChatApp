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
      throw createHttpError(
        409,
        duplicate.username === payload.username
          ? ErrorMessage.usernameInUse
          : ErrorMessage.emailInUse
      );
    }

    const hashedPassword = await bcryptjs.hash(payload.password, 10);

    return userModel.create({
      ...payload,
      password: hashedPassword,
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(500, ErrorMessage.creatingUser);
  }
};

const find = async (
  payload: LoginCredentials
): Promise<HydratedDocument<User>> => {
  try {
    const { email, password } = payload;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw createHttpError(404, ErrorMessage.user404);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, ErrorMessage.wrongPassword);
    }

    return user;
  } catch (error) {
    console.error(error);
    throw createHttpError(500, ErrorMessage.findingUser);
  }
};

export default { create, find };
