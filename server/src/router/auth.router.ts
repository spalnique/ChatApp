import express from 'express';

import authController from '../controller/auth.controller';
import authGuard from '../middleware/authGuard';
import validateBody from '../middleware/validateBody';
import errorWrapper from '../helper/errorWrapper';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/schema/auth.schema';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  errorWrapper(authController.register)
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  errorWrapper(authController.login)
);
router.post('/logout', errorWrapper(authController.logout));
router.post('/refresh', authGuard, errorWrapper(authController.refresh));

export default router;
