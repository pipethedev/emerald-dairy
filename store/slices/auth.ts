"use client";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {},
//   reducers: {},
// });

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token || "");
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      console.log("CLEARED_USER");
    },
  },
  extraReducers: (builder) => {
    builder;
    // Handle signupUser and other async thunks similarly...
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice;
