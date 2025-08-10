import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapCreateSuccess: false,
  createdMapId: "",
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCreateSuccess: (state, action) => {
      state.mapCreateSuccess = action.payload.success;
      state.createdMapId = action.payload.mapId || "";
    },
    clearMapCreateSuccess: (state) => {
      state.mapCreateSuccess = false;
      state.createdMapId = "";
    },
  },
});

export const { setMapCreateSuccess, clearMapCreateSuccess } = mapSlice.actions;

export default mapSlice.reducer;
