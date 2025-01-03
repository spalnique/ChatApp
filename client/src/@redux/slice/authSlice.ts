import { createSlice } from '@reduxjs/toolkit';

import authApi from '../api/authApi';
import type { User } from '../../@types/user.type';

type InitialState = {
  user: User | null;
  isLoading: boolean;
  isError: unknown;
};

const initialState: InitialState = {
  user: null,
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
      .addCase(authApi.register.fulfilled, (state) => {
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
        state.user = payload;
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
        state.isLoading = false;
      });
    builder
      .addCase(authApi.refresh.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(authApi.refresh.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoading = false;
      })
      .addCase(authApi.refresh.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  reducer: authReducer,
  selectors: { selectUser },
} = authSlice;
