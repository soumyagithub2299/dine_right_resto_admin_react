import React, { useState } from 'react';
import './DayWiseTime.css';

const DayWiseTime = () => {
  // Arrays for days and time options
  const daysOfWeek = ['Monday;', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const startTimes = Array.from({ length: 12 }, (_, i) => `${i + 1} AM`);
  const endTimes = Array.from({ length: 12 }, (_, i) => `${i + 1} PM`);

  // Initialize state for each day's start and end times
  const [times, setTimes] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = { startTime: '', endTime: '' };
      return acc;
    }, {})
  );

  // Handler for updating time for each day
  const handleTimeChange = (day, type, value) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [day]: {
        ...prevTimes[day],
        [type]: value,
      },
    }));
  };

  return (
    <div className='container mb-3'>
      {/* Common Opening Time Heading */}
      <div className='SubHeading-Profile mb-2'>Opening Time:</div>
      
      {daysOfWeek.map((day) => (
       <div className='Main-DayWiseTime'>
        <div className='row row-DayWiseTime' key={day}>
          <div className='col-12 col-md-6'>
            <div className='container '>
                
              <div className='flex-DayWiseTime mb-5'>
                <div>{day}</div>

                {/* Start Time Dropdown */}
                <select
                  className='btn-DayWiseTime'
                  value={times[day].startTime}
                  onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                >
                  <option value='' disabled>Select Start Time</option>
                  {startTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {/* End Time Dropdown */}
                <select
                  className='btn-DayWiseTime'
                  value={times[day].endTime}
                  onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                >
                  <option value='' disabled>Select End Time</option>
                  {endTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayWiseTime;
