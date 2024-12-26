import createHttpError from 'http-errors';
import bcryptjs from 'bcryptjs';

import User from '../../db/models/user.model';
import { LoginCredentials } from '../../@types/credentials.type';
import { ErrorMessage } from '../../@dict/errors.enum';

export default async function loginUser(payload: LoginCredentials) {
  const { identifier, password } = payload;

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  if (!user) throw createHttpError(404, ErrorMessage.notFound);

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) throw createHttpError(401, ErrorMessage.wrongPassword);

  return user;
}
