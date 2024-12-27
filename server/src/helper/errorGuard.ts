import { RequestHandler } from 'express';

type ErrorGuard = (controller: RequestHandler) => RequestHandler;

const errorGuard: ErrorGuard = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default errorGuard;
