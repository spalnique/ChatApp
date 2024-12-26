import { RequestHandler } from 'express';

import findUser from '../../services/user/find.service';
import createToken from '../../utils/createToken';

const loginController: RequestHandler = async (req, res, _next) => {
  // if (
  //   req.session.email === req.body.email &&
  //   req.get('Authorization') === `Bearer ${req.session.accessToken}`
  // ) {
  //   req.session.touch();
  //   req.session.save();

  //   res.status(200).json({ status: 200, message: 'Already logged in' });
  //   return;
  // }

  const user = await findUser(req.body);

  const token = createToken(user.id);

  Object.assign(req.session, {
    email: user.email,
    token,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: { user, token },
  });
};

export default loginController;
