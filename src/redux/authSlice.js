import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";
import usersApi from "api/usersApi";
import { toast } from "react-toastify";

let initialState = {
  user: {
    _id: "",
    avatar: "",
    name: "",
    phone: "",
    role: "",
  },
};

export const signup = createAsyncThunk("auth/createAuth", async (userInfo) => {
  const res = await authApi.signup(userInfo);
  return res;
});

export const googleSignin = createAsyncThunk(
  "auth/sininWithGoogle",
  async () => {
    const res = await authApi.singinWithGoogle();
    return res;
  }
);

export const loginRequest = createAsyncThunk("auth/login", async (userInfo) => {
  const res = await authApi.signin(userInfo);

  return res;
});

export const logoutRequest = createAsyncThunk("auth/logout", async () => {
  const res = await authApi.logout();
  return res;
});

export const fetchUserById = createAsyncThunk(
  "user/getUserById",
  async (id) => {
    const res = await usersApi.getUserById(id);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userInfo) => {
    const res = await usersApi.update(userInfo);
    toast.success("Update success", {
      position: "top-right",
    });
    localStorage.setItem("user", JSON.stringify(res.data));
    return res;
  }
);

export const updateUserForAdmin = createAsyncThunk(
  "user/updateUserForAdmin",
  async (userInfo) => {
    const res = await usersApi.update(userInfo);
    toast.success("Update success", {
      position: "top-right",
    });
    return res;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  // reducers: {
  //   setUserCurrent: (state, action) => {
  //     state.currentUser = action.payload;
  //     state.isAuth = true;
  //   },

  //   logout: (state) => {
  //     state.isAuth = false;
  //     state.currentUser = null;
  //   },

  //   loginWithGoogle: (state, action) => {
  //     state.currentUser = action.payload;
  //     state.isAuth = true;
  //   },
  // },

  extraReducers: {
    [loginRequest.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    [logoutRequest.fulfilled]: (state) => {
      state.user = null;
      state.isAuth = false;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.user = action.payload.data;
    },

    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload.data;
    },
  },
});
export const { setisAuth, setUserCurrent, loginWithGoogle } = authSlice.actions;
export default authSlice.reducer;
