import { createSlice } from '@reduxjs/toolkit';
import { addWeeks, addMonths } from 'date-fns';

// Utility function to generate recurring dates
const generateRecurringDates = (startDate, recurrenceType) => {
  const dates = [];
  if (!startDate || recurrenceType === 'none') return dates;

  for (let i = 1; i <= 5; i++) {
    if (recurrenceType === 'weekly') {
      dates.push(addWeeks(startDate, i));
    } else if (recurrenceType === 'monthly') {
      dates.push(addMonths(startDate, i));
    }
  }
  return dates;
};

// Initial state
const initialState = {
  selectedDate: null,
  recurrence: 'none',
  recurringDates: [],
};

// Create the slice
const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
      state.recurringDates = generateRecurringDates(action.payload, state.recurrence);
    },
    setRecurrence: (state, action) => {
      state.recurrence = action.payload;
      state.recurringDates = generateRecurringDates(state.selectedDate, action.payload);
    },
    clearDate: (state) => {
      state.selectedDate = null;
      state.recurrence = 'none';
      state.recurringDates = [];
    },
  },
});

// Export actions and reducer
export const { setDate, setRecurrence, clearDate } = datePickerSlice.actions;
export default datePickerSlice.reducer;
