import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin, IRegistration } from '../../@types/IAuth.interface';
import axios from '../../utils/axios';
import { AuthActions } from './slice';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }: IRegistration, { rejectWithValue }) => {
    try {
      await axios.post(`auth/register`, { username, email, password });
    } catch (err: any) {
      let error = err;

      if (error.message) {
        throw rejectWithValue(error.message);
      }
      if (error.response.data.result) {
        throw rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async (UserData: ILogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`auth/login`, UserData);

      localStorage.setItem('userToken', data.access_token);
      return data;
    } catch (err: any) {
      let error = err;

      if (error.message) {
        throw rejectWithValue(error.message);
      }
      if (error.response.data.result) {
        throw rejectWithValue(error.message);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`auth/me`);
      return data;
    } catch (err: any) {
      dispatch(AuthActions.logout());
      let error = err;
      if (error.response.message) {
        throw rejectWithValue(error.message);
      }
    }
  }
);
