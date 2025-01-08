import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';

import type { Chat } from '@types';

import { chatEndpoint } from '@reduxtoolkit';

import axiosInstance from '../axios.ts';

const getAll = createAsyncThunk<Chat[]>('chat/getAll', async (_, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get<AxiosResponse<Chat[]>>(chatEndpoint.getAll);
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
      } = await axiosInstance.get<AxiosResponse<Chat>>(
        chatEndpoint.getById(id)
      );
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
      } = await axiosInstance.post<AxiosResponse<Chat>>(
        chatEndpoint.create,
        payload
      );
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
      } = await axiosInstance.patch<AxiosResponse<Chat>>(
        chatEndpoint.updateById(_id),
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
      } = await axiosInstance.delete<AxiosResponse<Chat>>(
        chatEndpoint.deleteById(id)
      );
      return data;
    } catch (err) {
      console.error(err);

      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const chatApi = { getAll, getById, create, updateById, deleteById };
