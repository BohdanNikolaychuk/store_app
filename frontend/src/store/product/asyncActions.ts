import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { addSneaker, editSneaker, removeSneaker } from './slice';

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

type NewSneaker = {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
};

export const fetchAddSneaker = createAsyncThunk(
  'sneakers/add',
  async (sneaker: NewSneaker, { dispatch }) => {
    try {
      const { data } = await axios.post('/store/products', sneaker);

      dispatch(addSneaker(data));
      return data;
    } catch (err: any) {
      console.log(err);
    }
  }
);

type UpdateSneaker = {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
};

export const fetchEditSneakerByID = createAsyncThunk(
  'sneaker/put',
  async (props: UpdateSneaker, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`/store/products/${props.id}`, { ...props });

      dispatch(editSneaker(data));
    } catch (err: any) {
      console.log(err);
    }
  }
);
