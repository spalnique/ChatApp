import jwt from 'jsonwebtoken';
import { type Types } from 'mongoose';

import env from './env';

import { ENV } from '../constant/index';

export default function createToken(id: Types.ObjectId, ttl: number) {
  return jwt.sign({ id }, env(ENV.JWT_SECRET), {
    expiresIn: `${ttl}`,
  });
}
