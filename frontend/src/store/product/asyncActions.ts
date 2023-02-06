import axios from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { removeSneaker } from './slice';

export const fetchAllSneakers = createAsyncThunk('sneakers/get', async () => {
  try {
    const { data } = await axios.get('/store/products');

    return data;
  } catch (err: any) {
    console.log(err);
  }
});

export const fetchDeleteSneaker = createAsyncThunk(
  'sneakers/delete',
  async (id: string, { dispatch }) => {
    dispatch(removeSneaker(id));
    try {
      const { data } = await axios.delete(`/store/products/${id}`);
    } catch (err: any) {
      console.log(err);
    }
  }
);
