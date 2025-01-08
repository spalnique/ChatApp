import expressSession from 'express-session';

import { ENV_VARS, WEEK } from '@constants';
import { SessionCookie } from '@dict';
import { env } from '@helpers';

import store from '../redis';

const session = expressSession({
  store,
  secret: env(ENV_VARS.REDIS_SECRET),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  unset: 'destroy',
  name: SessionCookie.name,
  cookie: {
    httpOnly: true,
    sameSite: env(ENV_VARS.PROD_ENV) === 'true' ? 'none' : false,
    partitioned: env(ENV_VARS.PROD_ENV) === 'true' ? true : false,
    maxAge: WEEK,
    secure: env(ENV_VARS.PROD_ENV) === 'true' ? true : false,
  },
});

export default session;
