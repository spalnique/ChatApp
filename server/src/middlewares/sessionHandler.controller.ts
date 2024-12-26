import session from 'express-session';
import store from '../redis';
import env from '../utils/env';
import { ENV } from '../constants/index';

const secret = env(ENV.REDIS_SECRET);

export default session({
  store,
  secret,
  resave: false,
  saveUninitialized: false,
  name: 'ssid',
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 60 * 1000,
  },
});
