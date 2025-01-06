import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../index';
import type { User } from 'types';

type InitialState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isError: unknown;
};

const initialState: InitialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},

  selectors: {
    selectUser: (state) => state.user,
  },

  extraReducers: (builder) => {
    builder
      .addCase(authApi.register.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.register.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(authApi.register.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
      });

    builder
      .addCase(authApi.login.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.login.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(authApi.login.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
      });

    builder
      .addCase(authApi.logout.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.logout.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(authApi.logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
      });
    builder
      .addCase(authApi.refresh.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.refresh.rejected, (state, { payload }) => {
        state.user = null;
        state.token = null;
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(authApi.refresh.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
      });
  },
});

export const {
  reducer: authReducer,
  selectors: { selectUser },
} = authSlice;
