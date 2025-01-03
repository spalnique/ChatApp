import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';

import instance, { authEndpoint as auth, updateToken } from '../axios';

import type {
  LoginCredentials,
  RegisterCredentials,
} from '../../@types/credentials.type';
import type { User } from '../../@types/user.type';

type AuthData = { token: string; user: User };

const register = createAsyncThunk<void, RegisterCredentials>(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      await instance.post(auth.register, credentials);
    } catch (err) {
      console.error(err);

      updateToken();
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const login = createAsyncThunk<User, LoginCredentials>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.post<AxiosResponse<AuthData>>(auth.login, credentials);

      updateToken(data.token);

      return data.user;
    } catch (err) {
      console.error(err);

      updateToken();
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post(auth.logout);
  } catch (err) {
    console.error(err);

    return thunkAPI.rejectWithValue(err);
  } finally {
    updateToken();
  }
});

const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await instance.post<AxiosResponse<AuthData>>(auth.refresh);

    updateToken(data.token);
  } catch (err) {
    console.error(err);

    updateToken();
    return thunkAPI.rejectWithValue(err);
  }
});

export default { register, login, logout, refresh };
