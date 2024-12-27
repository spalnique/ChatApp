import express from 'express';

import authController from '../controller/auth.controller';
import authenticate from '../middleware/authenticate';
import validateBody from '../middleware/validateBody';
import errorGuard from '../helper/errorGuard';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/schema/auth.schema';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  errorGuard(authController.register)
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  errorGuard(authController.login)
);
router.post('/logout', errorGuard(authController.logout));
router.post('/refresh', authenticate, errorGuard(authController.refresh));

export default router;
