import axios from 'axios';

const baseURL = JSON.parse(import.meta.env.VITE_PROD_ENV)
  ? import.meta.env.VITE_API_PROD_URL
  : import.meta.env.VITE_API_DEV_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export function updateToken(value: string | null): void {
  instance.defaults.headers.common.Authorization = value
    ? `Bearer ${value}`
    : value;
}

export const authEndpoint = {
  register: 'auth/register',
  login: 'auth/login',
  logout: 'auth/logout',
  refresh: 'auth/refresh',
};

export const chatEndpoint = {
  create: 'chat',
  getAll: 'chat',
  getById: (id: string) => `chat/${id}`,
  updateById: (id: string) => `chat/${id}`,
  deleteById: (id: string) => `chat/${id}`,
};

export default instance;
