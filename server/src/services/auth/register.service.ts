import bcryptjs from 'bcryptjs';
import createHttpError from 'http-errors';

import User from '../../db/models/user.model';
import { RegisterCredentials } from '../../@types/credentials.type';
import { ErrorMessage } from '../../@dict/errors.enum';

export default async function registerUser(payload: RegisterCredentials) {
  const { username, age, email, password } = payload;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    if (existingUser.username === username) {
      throw createHttpError(409, ErrorMessage.usernameInUse);
    }

    if (existingUser.email === email) {
      throw createHttpError(409, ErrorMessage.emailInUse);
    }
  }

  const encryptedPassword = await bcryptjs.hash(password, 10);

  try {
    return await User.create({
      username,
      age,
      email,
      password: encryptedPassword,
    });
  } catch (error) {
    throw createHttpError(500, ErrorMessage.creatingUser);
  }
}
