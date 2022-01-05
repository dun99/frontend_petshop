import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import usersApi from "api/usersApi";
let initialState = {
  isAuth: false,
  currentUser: {},
  user: {},
};

export const signup = createAsyncThunk("auth/createAuth", async (userInfo) => {
  console.log("userinfo", userInfo);
  const res = await authApi.signup(userInfo);
  return res;
});

export const loginRequest = createAsyncThunk("auth/login", async (userInfo) => {
  const res = await authApi.signin(userInfo);
  return res;
});

export const logoutRequest = createAsyncThunk("auth/logout", async () => {
  const res = await authApi.logout();
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserCurrent: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },

    logout: (state) => {
      state.isAuth = false;
      state.currentUser = null;
    },

    loginWithGoogle: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
  },

  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      // state.currentUser = action.payload;
      // state.isAuth = true;
    },

    [loginRequest.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },

    [logoutRequest.fulfilled]: (state) => {
      state.currentUser = null;
      state.isAuth = false;
    },
  },
});
export const { setisAuth, setUserCurrent, loginWithGoogle } = authSlice.actions;
export default authSlice.reducer;
