import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import auth from './user/slice';
import sneakers from './product/slice';
const rootReducer = combineReducers({
  auth,
  sneakers
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
