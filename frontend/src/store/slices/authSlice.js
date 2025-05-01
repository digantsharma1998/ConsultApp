import { createSlice } from '@reduxjs/toolkit';
import * as authAPI from '../../api/auth';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;