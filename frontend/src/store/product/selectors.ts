import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ISneakers } from './types';

const selectSneakersData = (state: RootState) => state.sneakers;

export const selectedSneakersByID = (id: string) => {
  return createSelector(selectSneakersData, (state) =>
    state.sneakers.find((sneakers: ISneakers) => sneakers._id === id)
  );
};
