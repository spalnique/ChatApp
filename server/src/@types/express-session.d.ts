import { HydratedDocument } from 'mongoose';

import type { User } from '@types';

declare module 'express-session' {
  interface SessionData {
    user: HydratedDocument<User>;
    token: string;
  }
}
