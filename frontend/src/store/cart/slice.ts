import { createSlice } from '@reduxjs/toolkit';
import { ISneakers } from '../product/types';

type State = {
  cart: ISneakers[];
};

const initialState: State = {
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemCart = state.cart.find((item: ISneakers) => item._id === action.payload._id);
      if (itemCart) {
        itemCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item._id !== action.payload);
      state.cart = removeItem;
    }
  }
});
export default cartSlice.reducer;
export const { addToCart, removeItem } = cartSlice.actions;
