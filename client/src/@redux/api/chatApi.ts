import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';

import type { Chat } from '@types';

import { chatEndpoint } from '@reduxtoolkit';

import instance from '../axios.ts';

const getAll = createAsyncThunk<Chat[]>('chat/getAll', async (_, thunkAPI) => {
  try {
    const {
      data: { data },
    } = await instance.get<AxiosResponse<Chat[]>>(chatEndpoint.getAll);

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return thunkAPI.rejectWithValue(err.message);
    }
    return thunkAPI.rejectWithValue('Error loading all chats');
  }
});

const getById = createAsyncThunk<Chat, string>(
  'chat/getById',
  async (id, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.get<AxiosResponse<Chat>>(chatEndpoint.getById(id));
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Error loading chat');
    }
  }
);

const create = createAsyncThunk<Chat, Pick<Chat, 'participants'>>(
  'chat/create',
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.post<AxiosResponse<Chat>>(
        chatEndpoint.create,
        payload
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Error starting new chat');
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
        chatEndpoint.updateById(_id),
        payload
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Error updating chat');
    }
  }
);

const deleteById = createAsyncThunk<Chat, string>(
  'chat/deleteById',
  async (id, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await instance.delete<AxiosResponse<Chat>>(
        chatEndpoint.deleteById(id)
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Error deleting chat');
    }
  }
);

export const chatApi = { getAll, getById, create, updateById, deleteById };
