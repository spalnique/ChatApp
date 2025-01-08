import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
  LoginCredentials,
  RegisterCredentials,
  RootState,
  User,
} from '@types';

import { authEndpoint, updateToken } from '@reduxtoolkit';

import axiosInstance from '../axios.ts';

type AuthData = { token: string; user: User };
type OriginalRequest = AxiosRequestConfig & {
  retry?: boolean;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err: AxiosError) => {
    const originalRequest = err.config as OriginalRequest;

    if (
      !err.response ||
      originalRequest.url?.includes('login') ||
      err.response.status !== 401 ||
      originalRequest.retry
    ) {
      return Promise.reject(err);
    }

    originalRequest.retry = true;

    try {
      const {
        data: { data },
      } = await axiosInstance.post<AxiosResponse<AuthData>>(
        authEndpoint.refresh
      );
      const newToken = data.token;

      if (newToken) {
        updateToken(newToken);
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };
      }

      return axiosInstance.request(originalRequest);
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      return Promise.reject('Relogin required');
    }
  }
);

const register = createAsyncThunk<AuthData, RegisterCredentials>(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post<AxiosResponse<AuthData>>(
        authEndpoint.register,
        credentials
      );

      updateToken(data.token);

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        updateToken(null);

        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Something went wrong on register');
    }
  }
);

const login = createAsyncThunk<AuthData, LoginCredentials>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.post<AxiosResponse<AuthData>>(
        authEndpoint.login,
        credentials
      );

      updateToken(data.token);

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        updateToken(null);
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Something went wrong on login');
    }
  }
);

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post(authEndpoint.logout);
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Something went wrong on logout');
  } finally {
    updateToken(null);
  }
});

const refresh = createAsyncThunk<AuthData>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const authToken = (thunkAPI.getState() as RootState).auth.token;
    if (!authToken)
      throw new AxiosError('Cannot refresh session. Try logging in first.');
    updateToken(authToken);

    try {
      const {
        data: { data },
      } = await axiosInstance.post<AxiosResponse<AuthData>>(
        authEndpoint.refresh
      );

      updateToken(data.token);

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        updateToken(null);
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Something went wrong on refresh');
    }
  }
);

export const authApi = { register, login, logout, refresh };
