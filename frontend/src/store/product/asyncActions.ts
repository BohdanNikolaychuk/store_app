import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { SneakerActions } from './slice';

export const fetchAllSneakers = createAsyncThunk('sneakers/get', async () => {
  try {
    const { data } = await axios.get('/store/products');

    return data;
  } catch (err: any) {}
});

export const fetchDeleteSneaker = createAsyncThunk(
  'sneakers/delete',
  async (id: string, { dispatch }) => {
    dispatch(SneakerActions.removeSneaker(id));
    try {
      const { data } = await axios.delete(`/store/products/${id}`);
    } catch (err: any) {}
  }
);

export type NewSneaker = {
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  size: Array<{ size: string }>;
};

export const fetchAddSneaker = createAsyncThunk(
  'sneakers/add',
  async (sneaker: NewSneaker, { dispatch }) => {
    try {
      const { data } = await axios.post('/store/products', sneaker);

      dispatch(SneakerActions.addSneaker(data));
      return data;
    } catch (err: any) {}
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
  async (props: UpdateSneaker, { dispatch }) => {
    try {
      const { data } = await axios.put(`/store/products/${props.id}`, { ...props });

      dispatch(SneakerActions.editSneaker(data));
      return data;
    } catch (err: any) {}
  }
);
