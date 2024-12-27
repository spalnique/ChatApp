import { RequestHandler } from 'express';
import { ErrorMessage } from '../@dict/errors.enum';

const notFoundHandler: RequestHandler = async (req, res, next) => {
  res.status(404).json({ status: 404, message: ErrorMessage.route404 });
};

export default notFoundHandler;
