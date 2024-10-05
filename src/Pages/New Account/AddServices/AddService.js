import React, { useState } from 'react';
import './AddService.css'; 
import { FaAngleLeft, FaRegClock } from 'react-icons/fa';
import { GoPlusCircle } from "react-icons/go";

// Initial hours setup for all days of the week
const initialHours = {
  Monday: { isOpen: true, times: [{ open: '', close: '' }] },
  Tuesday: { isOpen: true, times: [{ open: '', close: '' }] },
  Wednesday: { isOpen: true, times: [{ open: '', close: '' }] },
  Thursday: { isOpen: true, times: [{ open: '', close: '' }] },
  Friday: { isOpen: true, times: [{ open: '', close: '' }] },
  Saturday: { isOpen: true, times: [{ open: '', close: '' }] },
  Sunday: { isOpen: true, times: [{ open: '', close: '' }] },
};

// Generate time options between 10:00 AM and 10:00 PM in 30-minute intervals
const generateTimeOptions = () => {
  const times = [];
  for (let i = 10; i <= 22; i++) { // Time range from 10:00 AM to 10:00 PM
    for (let j = 0; j < 60; j += 30) { // 30-minute intervals
      const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
      times.push(time);
    }
  }
  return times;
};

// Get the time options
const timeOptions = generateTimeOptions();

const AddService = ({ handleNext, handleBack }) => {
  const [hours, setHours] = useState(initialHours);

  // Handle adding a new time slot for a specific day
  const handleAddTime = (day) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        times: [...prevHours[day].times, { open: '', close: '' }],
      },
    }));
  };

  // Handle changing a specific time slot for a specific day
  const handleChange = (day, index, type, value) => {
    const updatedTimes = hours[day].times.map((time, i) =>
      i === index ? { ...time, [type]: value } : time
    );
    setHours((prevHours) => ({
      ...prevHours,
      [day]: { ...prevHours[day], times: updatedTimes },
    }));
  };

  // Handle toggling the "isOpen" status for a specific day
  const handleToggle = (day) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        isOpen: !prevHours[day].isOpen,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
    console.log('Submitted hours:', hours);
  };

  // Handle navigating back to the previous step
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

                {/* Time selection dropdowns for each day */}
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



// import React, { useState } from 'react';
// import './AddService.css'; 
// import { FaAngleLeft, FaRegClock } from 'react-icons/fa';
// import { GoPlusCircle } from "react-icons/go";
// import { AddServiceHoursOTP } from '../../../utils/APIs/credentialsApis';
// import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify


// const initialHours = {
//   Monday: { isOpen: true, times: [{ open: '', close: '' }] },
//   Tuesday: { isOpen: true, times: [{ open: '', close: '' }] },
//   Wednesday: { isOpen: true, times: [{ open: '', close: '' }] },
//   Thursday: { isOpen: true, times: [{ open: '', close: '' }] },
//   Friday: { isOpen: true, times: [{ open: '', close: '' }] },
//   Saturday: { isOpen: true, times: [{ open: '', close: '' }] },
//   Sunday: { isOpen: true, times: [{ open: '', close: '' }] },
// };

// const generateTimeOptions = () => {
//   const times = [];
//   for (let i = 0; i < 24; i++) {
//     for (let j = 0; j < 60; j += 30) {
//       const time = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
//       times.push(time);
//     }
//   }
//   return times;
// };

// const timeOptions = generateTimeOptions();

// const AddService = ({ handleNext, handleBack }) => {
//   const [hours, setHours] = useState(initialHours);
//   const [loading, setLoading] = useState(false); // State for loading

//   const handleAddTime = (day) => {
//     setHours((prevHours) => ({
//       ...prevHours,
//       [day]: {
//         ...prevHours[day],
//         times: [...prevHours[day].times, { open: '', close: '' }],
//       },
//     }));
//   };

//   const handleChange = (day, index, type, value) => {
//     const updatedTimes = hours[day].times.map((time, i) =>
//       i === index ? { ...time, [type]: value } : time
//     );
//     setHours((prevHours) => ({
//       ...prevHours,
//       [day]: { ...prevHours[day], times: updatedTimes },
//     }));
//   };

//   const handleToggle = (day) => {
//     setHours((prevHours) => ({
//       ...prevHours,
//       [day]: {
//         ...prevHours[day],
//         isOpen: !prevHours[day].isOpen,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await AddServiceHoursOTP(hours); // API call with service hours data
//       console.log('API response:', response.data);
//       toast.success('Service hours added successfully!'); // Success toast
//       handleNext(); // Proceed to the next step
//     } catch (error) {
//       toast.error('Failed to submit service hours. Please try again.'); // Error toast
//       console.error('Error submitting hours:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackClick = () => {
//     handleBack(); // Navigate back to the previous step
//   };

//   return (
//     <div className="service-container my-5">
//       <form className="service-form p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
//         <h2 className="login-head">
//           <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} />
//           Add service hours
//         </h2>
//         <div className="row">
//           {Object.keys(hours).map((day) => (
//             <div key={day} className="service-box col-md-6 col-lg-6 my-4">
//               <div className="day-box">
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <h3 className="day-name mb-0">{day}</h3>
//                   <div className="switch-container">
//                     <div className="status">
//                       <span className="status-label">
//                         {hours[day].isOpen ? 'Open' : 'Closed'}
//                       </span>
//                     </div>
//                     <div className="switch">
//                       <input
//                         type="checkbox"
//                         id={`toggle-${day}`}
//                         checked={hours[day].isOpen}
//                         onChange={() => handleToggle(day)}
//                       />
//                       <label htmlFor={`toggle-${day}`} className="slider round"></label>
//                     </div>
//                   </div>
//                 </div>

//                 {hours[day].times.map((time, index) => (
//                   <div className="time-label" key={index}>
//                     <div className="time-box mb-3">
//                       <label className="service-label">Start at</label>
//                       <div className="time-container d-flex align-items-center">
//                         <FaRegClock className="clock-icon" />
//                         <select
//                           className="form-control time-select"
//                           value={time.open}
//                           onChange={(e) => handleChange(day, index, 'open', e.target.value)}
//                           disabled={!hours[day].isOpen}
//                         >
//                           <option value="">_ _ : _ _</option>
//                           {timeOptions.map((timeOption) => (
//                             <option key={timeOption} value={timeOption}>
//                               {timeOption}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="time-box mb-3">
//                       <label className="service-label">End at</label>
//                       <div className="time-container d-flex align-items-center">
//                         <FaRegClock className="clock-icon2" />
//                         <select
//                           className="form-control time-select"
//                           value={time.close}
//                           onChange={(e) => handleChange(day, index, 'close', e.target.value)}
//                           disabled={!hours[day].isOpen}
//                         >
//                           <option value="">_ _ : _ _</option>
//                           {timeOptions.map((timeOption) => (
//                             <option key={timeOption} value={timeOption}>
//                               {timeOption}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {loading && <p className="loading-message">Submitting...</p>} {/* Loading message */}

//         <div className="service-button">
//           <button type="submit" className="service-btn" disabled={loading}>
//             Confirm
//           </button>
//         </div>
//       </form>
//       <ToastContainer /> {/* Toast container to display the toasts */}
//     </div>
//   );
// };

// export default AddService;
