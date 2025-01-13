import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';

import type { Chat, Message } from '@types';

import { authApi, chatApi } from '@reduxtoolkit';

type InitialState = {
  all: Chat[];
  active: Chat | null;
  isLoading: boolean;
  isError: AxiosError['message'] | string | null;
};

type AddMessagePayload = { chat: Chat; message: Message };
type DeleteMessagePayload = { chatId: string; messageId: string };
type EditMessagePayload = { chatId: string; message: Message };

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
    addChat: (state, { payload }: PayloadAction<Chat>) => {
      state.all.unshift(payload);
      state.active = payload;
    },

    deleteChat: (state, { payload }: PayloadAction<string>) => {
      const chatIndex = state.all.findIndex((chat) => chat._id === payload);

      if (chatIndex !== -1) {
        state.all.splice(chatIndex, 1);
      }

      if (state.active && state.active._id === payload) {
        state.active = null;
      }
    },

    addMessage: (state, { payload }: PayloadAction<AddMessagePayload>) => {
      const chatIndex = state.all.findIndex(
        (chat) => chat._id === payload.chat._id
      );

      if (chatIndex !== -1) {
        state.all[chatIndex].updatedAt = payload.chat.updatedAt;
        state.all[chatIndex].messages.unshift(payload.message);

        if (state.active && state.active._id === payload.chat._id) {
          state.active.updatedAt = payload.chat.updatedAt;
          state.active.messages.unshift(payload.message);
        }
      }
    },

    editMessage: (state, { payload }: PayloadAction<EditMessagePayload>) => {
      const chatIndex = state.all.findIndex(
        (chat) => chat._id === payload.chatId
      );

      if (chatIndex !== -1) {
        const messageIndex = state.all[chatIndex].messages.findIndex(
          (message) => message._id === payload.message._id
        );

        if (messageIndex !== -1) {
          state.all[chatIndex].messages[messageIndex] = payload.message;
        }

        if (state.active && state.active._id === payload.chatId) {
          state.active.messages[messageIndex] = payload.message;
        }
      }
    },

    deleteMessage: (
      state,
      { payload }: PayloadAction<DeleteMessagePayload>
    ) => {
      const chatIndex = state.all.findIndex(
        (chat) => chat._id === payload.chatId
      );

      if (chatIndex !== -1) {
        const messageIndex = state.all[chatIndex].messages.findIndex(
          (message) => message._id === payload.messageId
        );

        if (messageIndex !== -1) {
          state.all[chatIndex].messages.splice(messageIndex, 1);
        }

        if (state.active && state.active._id === payload.chatId) {
          state.active.messages.splice(messageIndex, 1);
        } 
      }
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
        state.all = state.all.map((chat) => {
          if (chat._id === payload._id) return payload;
          return chat;
        });
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

    builder.addCase(authApi.logout.fulfilled, (state) => {
      state.active = null;
      state.all = [];
    });
  },
});

export const {
  reducer: chatReducer,
  actions: { addChat, deleteChat, addMessage, editMessage, deleteMessage },
  selectors: { selectAllChats, selectActiveChat, selectIsLoading },
} = chatSlice;
