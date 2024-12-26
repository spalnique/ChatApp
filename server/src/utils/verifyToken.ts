import jwt, { TokenExpiredError } from 'jsonwebtoken';

import env from './env';
import { ENV } from '../constants/index';

export default function isTokenValid(token: string) {
  try {
    jwt.verify(token, env(ENV.JWT_SECRET));
    return true;
  } catch (err) {
    if (err instanceof TokenExpiredError) return false;
    throw err;
  }
}
