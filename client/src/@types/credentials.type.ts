export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  displayName?: string;
  isAdult: boolean;
  username: string;
  email: string;
  password: string;
};
