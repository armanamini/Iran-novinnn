
import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './slice';

const store = configureStore({
  reducer: {
    input: inputReducer,
  },
});

export default store;