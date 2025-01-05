import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';

import instance, { chatEndpoint as chat } from '../axios';

import type { Chat } from '../../@types/chat.type';

const getAll = createAsyncThunk<Chat[]>('chat/getAll', async (_, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await instance.get<AxiosResponse<Chat[]>>(chat.getAll);
    return data;
  } catch (err) {
    console.error(err);

    return thunkAPI.rejectWithValue(err);
  }
});

const getById = createAsyncThunk<Chat, string>(
  'chat/getById',
  async (id, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.get<AxiosResponse<Chat>>(chat.getById(id));
      return data;
    } catch (err) {
      console.error(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

const create = createAsyncThunk<Chat, Pick<Chat, 'participants'>>(
  'chat/create',
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.post<AxiosResponse<Chat>>(chat.create, payload);
      return data;
    } catch (err) {
      console.error(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

const updateById = createAsyncThunk<Chat, Pick<Chat, '_id'> & Partial<Chat>>(
  'chat/updateById',
  async ({ _id, ...payload }, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.patch<AxiosResponse<Chat>>(
        chat.updateById(_id),
        payload
      );
      return data;
    } catch (err) {
      console.error(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

const deleteById = createAsyncThunk<Chat, string>(
  'chat/deleteById',
  async (id, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.delete<AxiosResponse<Chat>>(chat.deleteById(id));
      return data;
    } catch (err) {
      console.error(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const chatApi = { getAll, getById, create, updateById, deleteById };
