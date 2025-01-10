import { createSlice } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import type { User } from '@types';

import { authApi } from '@reduxtoolkit';

type InitialState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: AxiosError['message'] | string | null;
};

const initialState: InitialState = {
  user: null,
  token: null,
  isLoading: false,
  isRefreshing: false,
  isError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},

  selectors: {
    selectUser: (state) => state.user,
    selectIsRefreshing: (state) => state.isRefreshing,
  },

  extraReducers: (builder) => {
    builder
      .addCase(authApi.register.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.register.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(authApi.register.fulfilled, (state, { payload }) => {
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
        state.isError = payload as string;
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
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(authApi.logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
      });
    builder
      .addCase(authApi.refresh.pending, (state) => {
        state.isRefreshing = true;
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.refresh.rejected, (state, { payload }) => {
        state.user = null;
        state.token = null;
        state.isError = payload as string;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(authApi.refresh.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.isLoading = false;
        state.isRefreshing = false;
      });
  },
});

export const {
  reducer: authReducer,
  selectors: { selectUser, selectIsRefreshing },
} = authSlice;
