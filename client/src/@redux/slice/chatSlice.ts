import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import type { Chat } from '@types';

import { chatApi } from '@reduxtoolkit';

type InitialState = {
  all: Chat[];
  active: Chat | null;
  isLoading: boolean;
  isError: AxiosError['message'] | string | null;
};

const initialState: InitialState = {
  all: [],
  active: null,
  isLoading: false,
  isError: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, { payload }: PayloadAction<Chat>) => {
      state.active = payload;
    },
  },

  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectAllChats: (state) => state.all,
    selectActiveChat: (state) => state.active,
  },

  extraReducers: (builder) => {
    builder
      .addCase(chatApi.getAll.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(chatApi.getAll.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(chatApi.getAll.fulfilled, (state, { payload }) => {
        state.all = payload;
        state.isLoading = false;
      });

    builder
      .addCase(chatApi.getById.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(chatApi.getById.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(chatApi.getById.fulfilled, (state, { payload }) => {
        state.active = payload;
        state.isLoading = false;
      });

    builder
      .addCase(chatApi.create.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(chatApi.create.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(chatApi.create.fulfilled, (state, { payload }) => {
        state.all = [payload, ...state.all];
        state.active = payload;
        state.isLoading = false;
      });

    builder
      .addCase(chatApi.updateById.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(chatApi.updateById.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(chatApi.updateById.fulfilled, (state, { payload }) => {
        state.all = state.all.map((chat) =>
          chat._id === payload._id ? payload : chat
        );
        state.isLoading = false;
      });

    builder
      .addCase(chatApi.deleteById.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
      .addCase(chatApi.deleteById.rejected, (state, { payload }) => {
        state.isError = payload as string;
        state.isLoading = false;
      })
      .addCase(chatApi.deleteById.fulfilled, (state, { payload }) => {
        state.all = state.all.filter((chat) => chat._id !== payload._id);
        state.active = payload;
        state.isLoading = false;
      });
  },
});

export const {
  reducer: chatReducer,
  actions: { setActiveChat },
  selectors: { selectAllChats, selectActiveChat, selectIsLoading },
} = chatSlice;
