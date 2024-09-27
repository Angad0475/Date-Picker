import { configureStore } from '@reduxjs/toolkit';
import datePickerReducer from './datePickerSlice';

const store = configureStore({
  reducer: {
    datePicker: datePickerReducer,
  },
});

export default store;