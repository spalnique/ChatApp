import type { User } from '../db/model/user.model';

export type RegisterSchema = Pick<
  User,
  'displayName' | 'email' | 'username' | 'isAdult' | 'password'
>;

export type LoginSchema = Pick<User, 'email' | 'password'>;
