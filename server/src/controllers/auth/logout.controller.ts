import { RequestHandler } from 'express';

const logoutController: RequestHandler = async (req, res, next) => {
  console.log(req);
};

export default logoutController;
