import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import type {
  AuthData,
  LoginCredentials,
  RegisterCredentials,
  RootState,
} from '@types';

import { authEndpoint, store } from '@reduxtoolkit';

import axiosInstance from '../axios.ts';

let subscribers: Array<InternalAxiosRequestConfig> = [];

function subscribeTokenRefresh(request: InternalAxiosRequestConfig) {
  const isDuplicateRequest = subscribers.some(({ url }) => url === request.url);

  if (!isDuplicateRequest) subscribers.push(request);
}

function onRefreshed() {
  const requests = [...subscribers];
  subscribers = [];
  requests.forEach((request) => {
    axiosInstance(request).catch((err) => {
      console.error('Failed to retry request:', request, err);
    });
  });
}

axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config;
    const isRefreshRequest = request?.url?.endsWith(authEndpoint.refresh);

    if (!request || error.status !== 401 || isRefreshRequest) {
      return Promise.reject(error);
    }

    const isAuthorized = request.headers.Authorization;
    const isRefreshing = store.getState().auth.isRefreshing;

    if (!isRefreshing && isAuthorized) {
      try {
        await store.dispatch(refresh()).unwrap();
        onRefreshed();

        return axiosInstance(request);
      } catch (refreshError) {
        subscribers = [];
        await store.dispatch(logout()).unwrap();

        return Promise.reject(refreshError);
      }
    }

    subscribeTokenRefresh(request);

    return Promise.reject(error);
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

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
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

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
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
  }
});

const refresh = createAsyncThunk<AuthData>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const authToken = (thunkAPI.getState() as RootState).auth.token;
    if (!authToken)
      throw new AxiosError('Cannot refresh session. Try logging in first.');
    try {
      const {
        data: { data },
      } = await axiosInstance.post<AxiosResponse<AuthData>>(
        authEndpoint.refresh
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkAPI.rejectWithValue(err.message);
      }

      return thunkAPI.rejectWithValue('Something went wrong on refresh');
    }
  }
);

export const authApi = { register, login, logout, refresh };
