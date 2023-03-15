import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, userLogin } from './asyncActions';
import { State } from './types';

const initialState: State = {
  isAuth: null,
  user: null,
  token: null,
  status: 'init'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = null;
      state.status = 'init';
      state.user = null;
      state.token = null;
      localStorage.removeItem('userToken');
    }
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = 'success';
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = 'error';
        state.isAuth = null;
      })

      //get current user

      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.isAuth = true;
        state.user = action.payload;
      })

      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isAuth = null;
        state.status = 'error';
      });
  }
});

export const { reducer: AuthReducer, actions: AuthActions } = authSlice;
