import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

let initialState = {
  user: {},
};

export const fetchUserById = createAsyncThunk(
  "user/getUserById",
  async (id) => {
    const res = await userApi.getUser(id);
    return res;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userInfo) => {
    const res = await userApi.updateUser(userInfo);
    return res;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {},

  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {
      state.user = action.payload;
    },

    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default userSlice.reducer;
