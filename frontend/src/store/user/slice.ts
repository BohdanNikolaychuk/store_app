import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCurrentUser, userLogin } from './asyncActions';
import { State } from './types';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState: State = {
  isAuth: !!userToken,
  userName: null,
  role: null,
  loading: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;

      state.userName = action.payload.user.username;
      state.role = action.payload.user.roles;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //get current user

    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.userName = action.payload?.data.username;
      state.role = action.payload?.data.roles;
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  }
});

export default authSlice.reducer;
