import axios from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addSneaker, removeSneaker } from './slice';
import { ISneakers } from './types';

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

export const fetchAddSneaker = createAsyncThunk(
  'sneakers/add',
  async (sneaker: ISneakers, { dispatch }) => {
    try {
      const { data } = await axios.post('/store/products', sneaker);
      console.log(data);
      dispatch(addSneaker(data));
      return data;
    } catch (err: any) {
      console.log(err);
    }
  }
);
