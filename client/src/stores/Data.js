import { createSlice } from '@reduxjs/toolkit';

export const data = createSlice({
  name: 'data',
  initialState: {
    city: '',
    temp: '',
    min: '',
    max: '',
    icon: '',
  },
  reducers: {
    setData: (state, action) => {
      state.city = action.payload.city;
      state.temp = action.payload.temp;
      state.min = action.payload.min;
      state.max = action.payload.max;
      state.icon = action.payload.icon;
    },
  },
});

export const { setData } = data.actions;

export default data.reducer;
