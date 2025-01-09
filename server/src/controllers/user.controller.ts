import type { RequestHandler } from 'express';

import { userService } from '@services';

const findByUsername: RequestHandler = async (req, res, _next) => {
  const { username } = req.params;
  const userId = await userService.findByUsername({ username });

  res.status(200).json({
    status: 200,
    data: userId,
  });
};

export default { findByUsername };
