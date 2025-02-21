import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapCreateSuccess: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCreateSuccess: (state, action) => {
      state.mapCreateSuccess = action.payload;
    },
  },
});

export const { setMapCreateSuccess } = mapSlice.actions;

export default mapSlice.reducer;
