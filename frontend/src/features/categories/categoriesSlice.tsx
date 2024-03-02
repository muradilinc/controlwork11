import { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
  categories: Category[];
  categoriesLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  categoriesLoading: false,
};

const categoriesSlice = createSlice({
  name: '',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
