import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, type AxiosResponse } from 'axios';

import instance, { authEndpoint as auth, updateToken } from '../axios';

import type { LoginCredentials, RegisterCredentials, User } from 'types';
import type { RootState } from '../store';

type AuthData = { token: string; user: User };

const register = createAsyncThunk<void, RegisterCredentials>(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      await instance.post(auth.register, credentials);
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
      } = await instance.post<AxiosResponse<AuthData>>(auth.login, credentials);

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
    await instance.post(auth.logout);
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
      } = await instance.post<AxiosResponse<AuthData>>(auth.refresh);

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
