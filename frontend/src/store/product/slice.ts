import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllSneakers } from './asyncActions';
import { ISneakers, State } from './types';

const initialState: State = {
  sneakers: [],
  loading: null,
  error: ''
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
      // state.sneakers = state.sneakers.
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllSneakers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSneakers.fulfilled, (state, action) => {
      state.loading = false;

      state.sneakers = action.payload;
    });
    builder.addCase(fetchAllSneakers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { removeSneaker, addSneaker } = sneakersSlice.actions;

export default sneakersSlice.reducer;