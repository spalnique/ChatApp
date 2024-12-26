import { User } from './user.type';

declare module 'express-session' {
  interface SessionData {
    email: string;
    accessToken: string;
  }
}
