import { RequestHandler } from 'express';
import createUser from '../../services/user/create.service';

const registerController: RequestHandler = async (req, res, _next) => {
  const user = await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered new user',
    data: user,
  });
};

export default registerController;
