import session from 'express-session';
import store from '../redis';
import env from '../utils/env';
import { ENV } from '../constants/index';
import { SessionCookie } from '../@dict/cookie.enum';

export default session({
  store,
  secret: env(ENV.REDIS_SECRET),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  unset: 'destroy',
  name: SessionCookie.name,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 1000,
    secure: env(ENV.PROD_ENV) === 'true' ? true : false,
  },
});
