import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item } from '../../types';
import axiosApi from '../../http/axiosApi';
import { RootState } from '../../app/store';

export const getItems = createAsyncThunk<Item[], string | undefined>(
  'items/getAll',
  async (categoryId) => {
    let items: Item[] = [];
    if (categoryId) {
      const response = await axiosApi.get<Item[]>(`/categories/${categoryId}`);
      items = response.data;
    } else {
      const response = await axiosApi.get<Item[]>('/items');
      items = response.data;
    }
    return items;
  },
);

export const getItemById = createAsyncThunk<Item, string>(
  'items/getOne',
  async (id) => {
    const response = await axiosApi.get<Item>(`/items/${id}`);
    if (!response.data) {
      throw new Error('No found!');
    }
    return response.data;
  },
);

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  'items/delete',
  async (id, { getState }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/items/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
  },
);
