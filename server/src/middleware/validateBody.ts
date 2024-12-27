import createHttpError from 'http-errors';
import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

const validateBody =
  (schema: ObjectSchema): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const error = createHttpError(400, 'Bad Request', {
        errors: err.details,
      });
      next(error);
    }
  };

export default validateBody;
