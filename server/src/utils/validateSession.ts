import type { Request } from 'express';

import isTokenValid from './verifyToken';

const validateSession = async (req: Request) => {
  const result = {
    authHeader: '',
    isBearer: false,
    isMatch: false,
    isExpired: true,
  };

  result.authHeader = req.get('Authorization') ?? '';
  if (!result.authHeader) return result;

  result.isBearer = result.authHeader.split(' ')[0] === 'Bearer';
  if (!result.isBearer) return result;

  result.isMatch = result.authHeader.split(' ')[1] === req.session.accessToken;
  if (!result.isMatch) return result;

  result.isExpired = isTokenValid(req.session.accessToken);

  return result;
};

export default validateSession;
