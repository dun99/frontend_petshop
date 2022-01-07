import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersApi from "api/usersApi";
import { toast } from "react-toastify";

let initialState = {
  listUser: [],
  filters: {
    _page: 1,
    _limit: 10,
  },
};

export const fetchUser = createAsyncThunk("user/getUsers", async () => {
  const res = await usersApi.getAllUser();
  return res;
});

export const userSlice = createSlice({
  name: "users",
  initialState,

  reducers: {},

  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.listUser = action.payload.data;
      state.count = action.payload.data.length;
    },
  },
});
export default userSlice.reducer;
