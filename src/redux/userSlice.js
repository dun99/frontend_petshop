import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { toast } from "react-toastify";

let initialState = {
  user: {},
  listUser: [],
  filters: {
    _page: 1,
    _limit: 10,
  },
  current: {},
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

export const fetchUser = createAsyncThunk("user/getUsers", async () => {
  const res = await userApi.getAllUser();
  return res;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const res = await userApi.deleteUser(id);
  toast.success("Delete success", {
    position: "top-right",
  });
  return id;
});

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

    [fetchUser.fulfilled]: (state, action) => {
      state.listUser = action.payload;
      state.count = action.payload.length;
    },

    [deleteUser.fulfilled]: (state, action) => {
      const userId = action.payload;
      const newUsers = [...state.listUser].filter((item) => item.id !== userId);
      state.listUser = newUsers;
    },
  },
});
export default userSlice.reducer;
