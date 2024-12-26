import { User } from './user.type';

declare module 'express-session' {
  interface SessionData {
    user: User;
    auth: { accessToken: string; accessTokenValidUntil: Date };
  }
}
