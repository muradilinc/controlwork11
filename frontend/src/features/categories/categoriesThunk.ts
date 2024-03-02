import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../http/axiosApi';
import { Category } from '../../types';

export const getCategories = createAsyncThunk<Category[]>(
  'categories/getAll',
  async () => {
    const response = await axiosApi.get<Category[]>('/categories');
    return response.data;
  },
);
