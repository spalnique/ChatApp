import { HydratedDocument } from 'mongoose';

export type User = HydratedDocument<{
  displayName: string;
  age: number;
  username: string;
  email: string;
  password: string;
  userChats: string[];
  createdAt: Date;
  updatedAt: Date;
}>;
