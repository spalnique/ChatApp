import { Types } from 'mongoose';

declare module 'express-session' {
  interface SessionData {
    userID: Types.ObjectId;
    token: string;
  }
}
