import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../http/axiosApi';
import {
  GlobalError,
  LoginMutation,
  RegisterMutation,
  AuthResponse,
  ValidationError,
} from '../../types';
import { RootState } from '../../app/store';
import { logoutState } from './usersSlice';

export const register = createAsyncThunk<
  AuthResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<AuthResponse>(
      '/users',
      registerMutation,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<AuthResponse>(
      '/users/sessions',
      loginMutation,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {
      headers: {
        'Authorization': 'Bearer' + token,
      },
    });
    dispatch(logoutState());
  },
);
