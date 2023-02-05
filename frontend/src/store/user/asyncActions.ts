import axios from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin, IRegistration } from '../../@types/IAuth.interface';

export const userLogin = createAsyncThunk(
  'auth/login',
  async (UserData: ILogin, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(`auth/login`, UserData, config);

      localStorage.setItem('userToken', data.access_token);
      return data;
    } catch (err: any) {
      localStorage.clear();
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

export const getCurrentUser = createAsyncThunk('auth/me', async () => {
  try {
    const data = await axios.get(`auth/me`);
    return data;
  } catch (err: any) {
    let error = err;
    if (error.response.data) {
      localStorage.clear();
    }
  }
});
