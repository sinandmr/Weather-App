import { createSlice } from '@reduxjs/toolkit';

export const position = createSlice({
  name: 'position',
  initialState: {
    latitude: 35.2881,
    longitude: 36.985,
    name: 'Adana',
  },
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeLatLon: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { changeName, changeLatLon } = position.actions;

export default position.reducer;
