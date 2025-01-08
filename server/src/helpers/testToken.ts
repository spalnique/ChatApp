import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { ENV_VARS } from '@constants';

import env from './env.ts';

export default function (userID: Types.ObjectId, token: string) {
  const { payload }: JwtPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET), {
    complete: true,
    ignoreExpiration: true,
  });

  return {
    isOwner: userID.toString() === payload.id,
    isExpired: new Date() > new Date(payload.exp * 1000),
  };
}
