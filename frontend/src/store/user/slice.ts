import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, userLogin } from './asyncActions';
import { State } from './types';

const initialState: State = {
  isAuth: null,
  user: null,
  token: null,
  loading: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.error = null;
      state.isAuth = null;
      state.loading = null;
      state.user = null;
      state.token = null;
      localStorage.removeItem('userToken');
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.access_token;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = null;
      state.error = action.payload as string;
    });

    //get current user

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isAuth = null;
    });
  }
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;