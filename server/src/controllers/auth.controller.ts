import { type RequestHandler } from 'express';
import createHttpError from 'http-errors';

import { DAY, ONE_MINUTE } from '@constants';
import { ErrorMessage, SessionCookie } from '@dict';
import { createToken } from '@helpers';
import { userService } from '@services';

const register: RequestHandler = async (req, res, _next) => {
  const user = await userService.create(req.body);

  req.session.user = user;
  req.session.token = createToken(user._id, DAY);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged in',
    data: { user: req.session.user, token: req.session.token },
  });
};

const login: RequestHandler = async (req, res, _next) => {
  const user = await userService.find(req.body);

  req.session.user = user;
  req.session.token = createToken(user._id, ONE_MINUTE / 6);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: { user: req.session.user, token: req.session.token },
  });
};

const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(createHttpError(500, ErrorMessage.loggingOutUser));
    }
    res.clearCookie(SessionCookie.name);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged out',
      data: { user: null, token: null },
    });
  });
};

const refresh: RequestHandler = async (req, res, _next) => {
  req.session.token = createToken(req.session.user._id, ONE_MINUTE / 6);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed',
    data: { user: req.session.user, token: req.session.token },
  });
};

export default { register, login, logout, refresh };
