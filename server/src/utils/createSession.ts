import jwt from 'jsonwebtoken';

import env from './env';
import { ENV, FIFTEEN_MINUTES } from '../constants/index';

const createSession = (userID: string) => {
  const accessToken = jwt.sign({ userID }, env(ENV.JWT_SECRET));
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);

  return {
    accessToken,
    accessTokenValidUntil,
  };
};

export default createSession;
