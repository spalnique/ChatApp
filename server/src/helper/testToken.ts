import jwt, { JwtPayload } from 'jsonwebtoken';

import env from './env';
import { ENV } from '../constant/index';
import { Types } from 'mongoose';

export default function isActiveUserToken(
  userID: Types.ObjectId,
  token: string
) {
  const { payload }: JwtPayload = jwt.verify(token, env(ENV.JWT_SECRET), {
    complete: true,
    ignoreExpiration: true,
  });

  return userID.toString() === payload.id;

  // return { isCorresponding, isExpired };
}
