import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
 
import { setDate, setRecurrence } from './Redux/datePickerSlice';


import SimpleCalendar from './SimpleCalendar'; // Calendar preview component
import './App.css';

const DatePickerComponent = () => {
  const dispatch = useDispatch();
  const { selectedDate, recurrence, recurringDates } = useSelector((state) => state.datePicker);

  const handleDateChange = (date) => {
    dispatch(setDate(date));
  };

  const handleRecurrenceChange = (e) => {
    dispatch(setRecurrence(e.target.value));
  };

  return (
    <div className="date-picker-container">
      <h2>Select Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="custom-input"
        dateFormat="MM/dd/yyyy"
        placeholderText="Click to select a date"
      />

      <div className="recurrence-options">
        <label>Recurrence: </label>
        <select value={recurrence} onChange={handleRecurrenceChange}>
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="calendar-preview">
        <h3>Calendar Preview</h3>
        <SimpleCalendar selectedDate={selectedDate} recurringDates={recurringDates} />
      </div>
    </div>
  );
};

export default DatePickerComponent;
