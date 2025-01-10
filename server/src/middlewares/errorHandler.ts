import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: err,
    });
  }
};

export default errorHandler;
