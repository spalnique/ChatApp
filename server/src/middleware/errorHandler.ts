import { ErrorRequestHandler } from 'express';
import { isHttpError } from 'http-errors';

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (isHttpError(err)) {
    if (err.message === 'Unauthorized') {
      req.session.destroy((error) => {
        if (error) {
          res
            .status(500)
            .json({ status: 500, message: 'Errored deleting session' });
        }
        res.status(err.status).json({
          status: err.status,
          message: err.message,
          data: err,
        });
      });
    } else {
      res.status(err.status).json({
        status: err.status,
        message: err.message,
        data: err,
      });
    }
  } else {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: err,
    });
  }
};

export default errorHandler;
