import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectCartData = (state: RootState) => state.cart;
