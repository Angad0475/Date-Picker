import React from 'react';
import { format, isSameDay, getDaysInMonth, startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import './App.css';

const SimpleCalendar = ({ selectedDate, recurringDates }) => {
  const month = selectedDate ? selectedDate.getMonth() : new Date().getMonth();
  const year = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();

  // Calculate the first and last days of the month
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);

  // Calculate the starting and ending days of the calendar view
  const startDay = startOfWeek(firstDayOfMonth); // This will include days from the previous month
  const endDay = endOfWeek(lastDayOfMonth); // This will include days from the next month

  // Generate array of days for the calendar
  const daysArray = [];
  let currentDay = startDay;
  while (currentDay <= endDay) {
    daysArray.push(currentDay);
    currentDay = new Date(currentDay);
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Day labels
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {dayLabels.map((label, index) => (
          <div key={index} className="calendar-header-day">{label}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {daysArray.map((day, index) => {
          const isSelected = isSameDay(day, selectedDate);
          const isRecurring = recurringDates.some((recurringDate) => isSameDay(day, recurringDate));

          return (
            <div
              key={index}
              className={`calendar-day ${isSelected ? 'selected' : ''} ${isRecurring ? 'recurring' : ''}`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleCalendar;
