import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cart from './cart/slice';
import { SneakerReducer } from './product/slice';
import auth from './user/slice';

const rootReducer = combineReducers({
  auth,
  sneakers: SneakerReducer,
  cart
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
