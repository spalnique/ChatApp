import createHttpError from 'http-errors';
import bcryptjs from 'bcryptjs';

import User from '../../db/models/user.model';
import { LoginCredentials } from '../../@types/credentials.type';
import { ErrorMessage } from '../../@dict/errors.enum';

export default async function findUser(payload: LoginCredentials) {
  const { email, password } = payload;

  const user = await User.findOne({ email });
  if (!user) throw createHttpError(404, ErrorMessage.notFound);

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) throw createHttpError(401, ErrorMessage.wrongPassword);

  return user;
}
