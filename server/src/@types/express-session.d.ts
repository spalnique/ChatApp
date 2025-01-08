import { HydratedDocument, Types } from 'mongoose';

import { type User } from '../db/model/user.model';

declare module 'express-session' {
  interface SessionData {
    user: HydratedDocument<User>;
    token: string;
  }
}
