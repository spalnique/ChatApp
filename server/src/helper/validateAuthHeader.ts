import type { Request } from 'express';

import isActiveUserToken from './testToken';

const validateAuthHeader = (req: Request) => {
  const result = {
    authHeader: '',
    isBearer: false,
    isActiveSession: false,
    isActiveUserToken: false,
    // isExpired: true,
  };

  result.authHeader = req.get('Authorization') ?? '';
  const [bearer, token] = result.authHeader.split(' ');

  if (!result.authHeader) return result;

  result.isBearer = bearer === 'Bearer';
  if (!result.isBearer) return result;

  result.isActiveSession = token === req.session.token;
  if (!result.isActiveSession) return result;

  result.isActiveUserToken = isActiveUserToken(req.session.userID, token);

  return result;
};

export default validateAuthHeader;
