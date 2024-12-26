import { RequestHandler } from 'express';
import registerUser from '../../services/auth/register.service';

const registerController: RequestHandler = async (req, res, _next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered new user',
    data: user,
  });
};

export default registerController;
