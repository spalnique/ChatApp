import express from 'express';

import { userController } from '@controllers';
import { errorWrapper } from '@helpers';
import { authGuard } from '@middlewares';

const userRouter = express.Router();

userRouter.use(authGuard);

userRouter.get('/find/:username', errorWrapper(userController.findByUsername));

export default userRouter;
