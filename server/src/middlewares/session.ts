import expressSession from 'express-session';

import { ENV_VARS, WEEK } from '@constants';
import { SessionCookie } from '@dict';
import { env } from '@helpers';

import store from '../redis';

const isProduction = env(ENV_VARS.APP_ENV) === 'production';

const sameSite = isProduction ? 'none' : false;
const partitioned = isProduction;
const secure = isProduction;

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
    maxAge: WEEK,
    sameSite,
    partitioned,
    secure,
  },
});

export default session;
