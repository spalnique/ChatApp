import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

import env from './env';
import { ENV } from '../constant/index';

export default function isActiveUserToken(
  userID: Types.ObjectId,
  token: string
) {
  const { payload }: JwtPayload = jwt.verify(token, env(ENV.JWT_SECRET), {
    complete: true,
    ignoreExpiration: true,
  });

  return {
    isOwner: userID.toString() === payload.id,
    isExpired: new Date() > new Date(payload.exp * 1000),
  };
}
