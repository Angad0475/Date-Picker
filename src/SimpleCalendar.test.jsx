import React from 'react';
import { render, screen } from '@testing-library/react';
import SimpleCalendar from './SimpleCalendar';
import { format } from 'date-fns';

describe('SimpleCalendar', () => {
  const selectedDate = new Date(2024, 8, 10); // September 10, 2024 (A Tuesday)
  const recurringDates = [
    new Date(2024, 8, 10), // Same as selected
    new Date(2024, 8, 17), // Next Tuesday
    new Date(2024, 8, 24)  // Following Tuesday
  ];

  test('renders day labels correctly', () => {
    render(<SimpleCalendar selectedDate={selectedDate} recurringDates={[]} />);
    
    const dayLabels = screen.getAllByText(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/i);
    expect(dayLabels).toHaveLength(7); // Ensure there are 7 day labels
    expect(dayLabels[0]).toHaveTextContent('Mon');
    expect(dayLabels[1]).toHaveTextContent('Tue');
    expect(dayLabels[2]).toHaveTextContent('Wed');
    expect(dayLabels[3]).toHaveTextContent('Thu');
    expect(dayLabels[4]).toHaveTextContent('Fri');
    expect(dayLabels[5]).toHaveTextContent('Sat');
    expect(dayLabels[6]).toHaveTextContent('Sun');
  });

  test('renders selected date correctly', () => {
    render(<SimpleCalendar selectedDate={selectedDate} recurringDates={[]} />);
    
    const selectedDay = screen.getByText('10');
    expect(selectedDay).toBeInTheDocument();
    expect(selectedDay.closest('.calendar-day')).toHaveClass('selected'); // Check if the selected class is applied
  });

  test('renders recurring dates correctly', () => {
    render(<SimpleCalendar selectedDate={selectedDate} recurringDates={recurringDates} />);
    
    recurringDates.forEach(date => {
      const recurringDay = screen.getByText(format(date, 'd'));
      expect(recurringDay).toBeInTheDocument();
      expect(recurringDay.closest('.calendar-day')).toHaveClass('recurring'); // Check if the recurring class is applied
    });
  });

  test('renders previous month days correctly', () => {
    render(<SimpleCalendar selectedDate={selectedDate} recurringDates={[]} />);
    
    // Check for days from the previous month (1, 2, 3, ... depending on the month)
    const previousMonthDays = ['1', '2', '3', '4', '5', '6', '7']; // Update as needed based on your calendar logic
    previousMonthDays.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('renders all calendar days correctly', () => {
    render(<SimpleCalendar selectedDate={selectedDate} recurringDates={recurringDates} />);
    
    // Check the total number of rendered days, including the previous month's and next month's days
    const calendarDays = screen.getAllByText(/\d+/); // Match all day numbers (1-31)
    
    expect(calendarDays.length).toBe(42); // Ensure there are 42 days rendered
  });
});
