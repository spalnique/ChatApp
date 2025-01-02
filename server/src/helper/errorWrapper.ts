import { RequestHandler } from 'express';

const errorWrapper =
  (controller: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default errorWrapper;
