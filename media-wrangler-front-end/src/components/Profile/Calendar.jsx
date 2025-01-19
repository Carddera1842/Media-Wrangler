import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; // Add a CSS file for custom styles

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarPlaceholder({ user }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !start || !end) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          start,
          end,
          userId: user.id,
        }),
      });

      if (response.ok) {
        alert('Event added successfully!');
        setTitle('');
        setStart('');
        setEnd('');
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred while adding the event.');
    }
  };

  const events = []; // Placeholder for events

  return (
    <div className="profile-calendar-container">
      <div className="calendar-card">
        <h2>Calendar</h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month']}
          defaultView="month"
          selectable
          style={{ height: '400px', marginTop: '20px' }}
        />
      </div>

      <div className="event-form-card">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Event title"
            />
          </div>
          <div className="form-group">
            <label>Start Date/Time:</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date/Time:</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CalendarPlaceholder;
