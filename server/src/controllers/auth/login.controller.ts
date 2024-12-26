import { RequestHandler } from 'express';
import loginUser from '../../services/auth/login.service';
import createSession from '../../utils/createSession';

const loginController: RequestHandler = async (req, res, next) => {
  console.log(req.cookies.ssid);

  const user = await loginUser(req.body);

  req.session.user = user.toJSON();
  req.session.auth = createSession(user.id);

  res.status(200).json({
    user: req.session.user,
    auth: req.session.auth,
    sessionID: req.sessionID,
  });
};

export default loginController;
