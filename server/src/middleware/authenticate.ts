import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import validateAuthHeader from '../helper/validateAuthHeader';

const authenticate: RequestHandler = (req, _res, next) => {
  if (!req.session || !req.session.userID) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const {
    authHeader,
    isBearer,
    isActiveSession,
    isActiveUserToken,
    // isExpired,
  } = validateAuthHeader(req);

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

  if (!isActiveSession || !isActiveUserToken) {
    return next(createHttpError(401, 'Unauthorized: Token is not valid'));
  }

  // if (isExpired) {
  //   return next(createHttpError(401, 'Unauthorized: Token expired'));
  // }

  next();
};

export default authenticate;

// import validateSession from '../utils/validateSession';

// const authenticate: RequestHandler = (req, _res, next) => {

//   try {
//     const { authHeader, isBearer, isMatch, isExpired } = validateSession(req);

//     if (!authHeader) {
//       next(createHttpError(401, 'Unauthorized: Provide authorization header'));
//     }

//     if (!isBearer) {
//       next(
//         createHttpError(
//           401,
//           'Unauthorized: Authorization header must be of type Bearer'
//         )
//       );
//     }

//     if (!isMatch) {
//       next(createHttpError(401, 'Unauthorized: Token is not valid'));
//     }

//     if (isExpired) {
//       next(createHttpError(401, 'Unauthorized: Token expired'));
//     }

//     next();
//   } catch (err) {
//     next(err);
//   }
// };
