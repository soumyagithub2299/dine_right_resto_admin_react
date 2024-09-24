import React, { useState } from 'react';
import './AddService.css'; 
import { FaAngleLeft, FaRegClock } from 'react-icons/fa';
import { GoPlusCircle } from "react-icons/go";

const initialHours = {
  Monday: { isOpen: true, times: [{ open: '', close: '' }] },
  Tuesday: { isOpen: true, times: [{ open: '', close: '' }] },
  Wednesday: { isOpen: true, times: [{ open: '', close: '' }] },
  Thursday: { isOpen: true, times: [{ open: '', close: '' }] },
  Friday: { isOpen: true, times: [{ open: '', close: '' }] },
  Saturday: { isOpen: true, times: [{ open: '', close: '' }] },
  Sunday: { isOpen: true, times: [{ open: '', close: '' }] },
};

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
      times.push(time);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const AddService = ({ handleNext, handleBack }) => {
  const [hours, setHours] = useState(initialHours);

  const handleAddTime = (day) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        times: [...prevHours[day].times, { open: '', close: '' }],
      },
    }));
  };

  const handleChange = (day, index, type, value) => {
    const updatedTimes = hours[day].times.map((time, i) =>
      i === index ? { ...time, [type]: value } : time
    );
    setHours((prevHours) => ({
      ...prevHours,
      [day]: { ...prevHours[day], times: updatedTimes },
    }));
  };

  const handleToggle = (day) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        isOpen: !prevHours[day].isOpen,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
    console.log('Submitted hours:', hours);
  };

  const handleBackClick = () => {
    handleBack(); // Navigate back to the previous step
  };

  return (
    <div className="service-container my-5">
      <form className="service-form p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
        <h2 className="login-head">
          <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} />
          Add service hours
        </h2>
        <div className="row">
          {Object.keys(hours).map((day) => (
            <div key={day} className="service-box col-md-6 col-lg-6 my-4">
              <div className="day-box">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="day-name mb-0">{day}</h3>
                  <div className="switch-container">
                    <div className="status">
                      <span className="status-label">
                        {hours[day].isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                    <div className="switch">
                      <input
                        type="checkbox"
                        id={`toggle-${day}`}
                        checked={hours[day].isOpen}
                        onChange={() => handleToggle(day)}
                      />
                      <label htmlFor={`toggle-${day}`} className="slider round"></label>
                    </div>
                  </div>
                </div>

                {hours[day].times.map((time, index) => (
                  <div className="time-label" key={index}>
                    <div className="time-box mb-3">
                      <label className="service-label">Start at</label>
                      <div className="time-container d-flex align-items-center">
                        <FaRegClock className="clock-icon" />
                        <select
                          className="form-control time-select"
                          value={time.open}
                          onChange={(e) => handleChange(day, index, 'open', e.target.value)}
                          disabled={!hours[day].isOpen}
                        >
                          <option value="">_ _ : _ _</option>
                          {timeOptions.map((timeOption) => (
                            <option key={timeOption} value={timeOption}>
                              {timeOption}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="time-box mb-3">
                      <label className="service-label">End at</label>
                      <div className="time-container d-flex align-items-center">
                        <FaRegClock className="clock-icon2" />
                        <select
                          className="form-control time-select"
                          value={time.close}
                          onChange={(e) => handleChange(day, index, 'close', e.target.value)}
                          disabled={!hours[day].isOpen}
                        >
                          <option value="">_ _ : _ _</option>
                          {timeOptions.map((timeOption) => (
                            <option key={timeOption} value={timeOption}>
                              {timeOption}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Uncomment to allow adding more service hours */}
                {/* {hours[day].isOpen && (
                  <button
                    type="button"
                    className="plus-btn"
                    onClick={() => handleAddTime(day)}
                  >
                    <GoPlusCircle className='plus-icon'/>Add a new service hour
                  </button>
                )} */}
              </div>
            </div>
          ))}
        </div>
        <div className="service-button">
          <button type="submit" className="service-btn">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
