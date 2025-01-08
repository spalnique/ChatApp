import jwt from 'jsonwebtoken';
import { type Types } from 'mongoose';

import { ENV_VARS } from '@constants';

import env from './env.ts';

export default function (id: Types.ObjectId, ttl: number) {
  return jwt.sign({ id }, env(ENV_VARS.JWT_SECRET), {
    expiresIn: `${ttl}`,
  });
}
