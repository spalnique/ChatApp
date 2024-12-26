import jwt from 'jsonwebtoken';

import env from './env';
import { ENV, FIFTEEN_MINUTES } from '../constants/index';

export default function createToken(userID: string) {
  return jwt.sign({ userID }, env(ENV.JWT_SECRET), {
    expiresIn: `${FIFTEEN_MINUTES}`,
  });
}
