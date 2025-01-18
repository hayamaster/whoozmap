import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  userName: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = "";
      state.userName = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
