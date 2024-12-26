import { RequestHandler } from 'express';

const refreshController: RequestHandler = async (req, res, next) => {
  console.log(req.session.id);
  res.send();
};

export default refreshController;
