import session from 'express-session';
import store from '../redis';
import env from '../helper/env';
import { ENV, WEEK } from '../constant/index';
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
    maxAge: WEEK,
    secure: env(ENV.PROD_ENV) === 'true' ? true : false,
  },
});