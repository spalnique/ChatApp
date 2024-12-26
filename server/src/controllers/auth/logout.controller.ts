import { RequestHandler } from 'express';
import { SessionCookie } from '../../@dict/cookie.enum';

const logoutController: RequestHandler = async (req, res, next) => {
  // if (!req.session.email || !req.session.accessToken) {
  //   res.status(200).json({ status: 200, message: 'Already logged out' });
  //   return;
  // }

  req.session.destroy((err) => {
    if (err) next(err);

    res.clearCookie(SessionCookie.name);

    res.status(200).json({ status: 200, message: 'Successfully logged out' });
  });
};

export default logoutController;
