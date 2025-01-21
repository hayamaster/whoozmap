import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  userName: "",
  email: "",
  token: "",
  isGoogleLogin: false,
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
    isGoogleLogin: (state, action) => {
      state.isGoogleLogin = action.payload;
    },
  },
});

export const { setUser, setToken, logout, isGoogleLogin } = userSlice.actions;

export default userSlice.reducer;
