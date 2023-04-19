import { createSlice, current } from '@reduxjs/toolkit';
import { fetchAllSneakers } from './asyncActions';
import { State } from './types';

const initialState: State = {
  sneakers: [],
  status: 'init'
};

const sneakersSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {
    addSneaker(state, action) {
      state.sneakers.push(action.payload);
    },
    removeSneaker(state, action) {
      state.sneakers = state.sneakers.filter((sneaker) => sneaker._id !== action.payload);
    },
    editSneaker(state, action) {
      const index = state.sneakers.findIndex((element) => element._id === action.payload._id);
      state.sneakers[index] = action.payload;
    },
    removeSize(state, action) {
      const findSneaker = state.sneakers.find((element) => element._id === action.payload._id);
      console.log(current(findSneaker));
      let indexOFSize = findSneaker?.size?.findIndex(
        (element: any) => element.size === action.payload.removeSize
      );
      findSneaker?.size?.splice(indexOFSize!, 1);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSneakers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSneakers.fulfilled, (state, action) => {
        state.status = 'success';

        state.sneakers = action.payload;
      })
      .addCase(fetchAllSneakers.rejected, (state) => {
        state.status = 'error';
      });
  }
});

export const { reducer: SneakerReducer, actions: SneakerActions } = sneakersSlice;
