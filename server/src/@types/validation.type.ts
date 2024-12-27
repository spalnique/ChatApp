import { User } from './user.type';

export type RegisterSchema = Pick<
  User,
  'displayName' | 'email' | 'username' | 'age' | 'password'
>;

export type LoginSchema = Pick<User, 'email' | 'password'>;
