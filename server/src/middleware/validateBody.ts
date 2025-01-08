import createHttpError from 'http-errors';
import type { RequestHandler } from 'express';
import { type ObjectSchema, ValidationError } from 'yup';

const validateBody =
  (schema: ObjectSchema<any>): RequestHandler =>
  async (req, _res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        const error = createHttpError(400, 'Bad Request', {
          errors: err.inner || err,
        });
        next(error);
        return;
      }

      next(err);
    }
  };

export default validateBody;
