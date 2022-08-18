import DataReducer from './stores/Data';
import PositionReducer from './stores/Position';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    position: PositionReducer,
    data: DataReducer,
  },
});
export default store;
