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
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);

      item!.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item!.quantity === 1) {
        item!.quantity = 1;
      } else {
        item!.quantity--;
      }
    }
  }
});

export const { reducer: CartReducer, actions: CartActions } = cartSlice;
