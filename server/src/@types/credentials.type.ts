import { User } from './user.type';

export type RegisterCredentials = Pick<
  User,
  'username' | 'age' | 'email' | 'password'
>;

export type LoginCredentials = { identifier: string; password: string };
