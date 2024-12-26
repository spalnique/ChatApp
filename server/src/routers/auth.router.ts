import express from 'express';

import errorGuard from '../utils/errorGuard';
import refreshController from '../controllers/auth/refresh.controller';
import registerController from '../controllers/auth/register.controller';
import loginController from '../controllers/auth/login.controller';
import logoutController from '../controllers/auth/logout.controller';

const router = express.Router();

router.post('/', errorGuard(refreshController));
router.post('/register', errorGuard(registerController));
router.post('/login', errorGuard(loginController));
router.post('/logout', errorGuard(logoutController));

export default router;
