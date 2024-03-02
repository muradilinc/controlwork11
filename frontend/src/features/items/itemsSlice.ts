import { Item } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getItemById, getItems } from './itemsThunk';

interface ItemsState {
  items: Item[];
  item: Item | null;
  itemsLoading: boolean;
  itemLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  item: null,
  itemsLoading: false,
  itemLoading: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.itemsLoading = false;
    });
    builder.addCase(
      getItems.fulfilled,
      (state, { payload: items }: PayloadAction<Item[]>) => {
        state.itemsLoading = false;
        state.items = items;
      },
    );
    builder.addCase(getItems.rejected, (state) => {
      state.itemsLoading = false;
    });
    builder.addCase(getItemById.pending, (state) => {
      state.itemLoading = true;
    });
    builder.addCase(
      getItemById.fulfilled,
      (state, { payload: item }: PayloadAction<Item>) => {
        state.itemLoading = false;
        state.item = item;
      },
    );
    builder.addCase(getItemById.rejected, (state) => {
      state.itemLoading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state: RootState) => state.items.items;
export const selectItem = (state: RootState) => state.items.item;
export const selectItemsLoading = (state: RootState) =>
  state.items.itemsLoading;
export const selectItemLoading = (state: RootState) => state.items.itemLoading;
