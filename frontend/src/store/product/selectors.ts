import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ISneakers } from './types';

export const selectSneakersData = (state: RootState) => state.sneakers;

export const selecetSneakersByID = (id: string) => {
  return createSelector(selectSneakersData, (state) =>
    state.sneakers.find((sneakers: ISneakers) => sneakers._id === id)
  );
};
