import type { Request } from 'express';

import isActiveUserToken from './testToken';

const validateAuthHeader = (req: Request) => {
  const result = {
    authHeader: '',
    isBearer: false,
    isActiveSession: false,
    isOwner: false,
    isExpired: true,
  };

  result.authHeader = req.get('Authorization') ?? '';
  const [bearer, token] = result.authHeader.split(' ');

  if (!result.authHeader) return result;

  result.isBearer = bearer === 'Bearer';
  if (!result.isBearer) return result;

  result.isActiveSession = token === req.session.token;
  if (!result.isActiveSession) return result;

  const { isOwner, isExpired } = isActiveUserToken(req.session.user._id, token);

  return { ...result, isOwner, isExpired };
};

export default validateAuthHeader;
