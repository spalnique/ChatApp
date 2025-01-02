import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import validateAuthHeader from '../helper/validateAuthHeader';

const authGuard: RequestHandler = (req, _res, next) => {
  if (!req.session.user || !req.session.user?._id) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const { authHeader, isBearer, isActiveSession, isOwner, isExpired } =
    validateAuthHeader(req);

  if (!authHeader) {
    return next(
      createHttpError(401, 'Unauthorized: Provide authorization header')
    );
  }

  if (!isBearer) {
    return next(
      createHttpError(
        401,
        'Unauthorized: Authorization header must be of type Bearer'
      )
    );
  }

  if (!isActiveSession || !isOwner) {
    return next(createHttpError(401, 'Unauthorized: Token is not valid'));
  }

  console.log(`Route: ${req.baseUrl + req.path} \n`, {
    authHeader,
    isBearer,
    isActiveSession,
    isOwner,
    isExpired,
  });

  if (isExpired && req.path !== '/refresh') {
    return next(createHttpError(401, 'Unauthorized: Token expired'));
  }

  next();
};

export default authGuard;
