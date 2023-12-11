import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  initialState: { token: null },
  name: "auth",
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const getCurrenToken = (state) => state.auth.token;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
