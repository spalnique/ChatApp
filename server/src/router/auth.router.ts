import express from 'express';

import { authController } from '@controllers';
import { errorWrapper } from '@helpers';
import { authGuard, validateBody } from '@middlewares';
import { loginUserSchema, registerUserSchema } from '@validation';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  errorWrapper(authController.register)
);
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  errorWrapper(authController.login)
);
authRouter.post('/logout', errorWrapper(authController.logout));
authRouter.post('/refresh', authGuard, errorWrapper(authController.refresh));

export default authRouter;
