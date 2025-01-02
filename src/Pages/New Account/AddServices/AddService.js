import React, { useState, useEffect } from "react";
import "./AddService.css";
import { FaRegClock } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../../src/Loader/Loader/Loader";
import ScrollToTop from "../../../utils/scrollToTop/ScrollToTop";

const initialHours = (days) => {
  const hours = {};
  days.forEach((day) => {
    hours[day.day_name] = { isOpen: true, times: { open: "", close: "" } };
  });
  return hours;
};

const AddService = ({ handleNext, handleBack }) => {
  const userId = sessionStorage.getItem("newSignUpRestoUserId");

  const [hours, setHours] = useState({});
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState([]);

  // Fetch days listing dynamically
  useEffect(() => {
    const fetchDaysListing = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getDaysListing`
        );

        if (response?.data?.response === true) {
          const fetchedDays = response?.data?.days || [];
          setDays(fetchedDays);
          setHours(initialHours(fetchedDays)); // Initialize the hours state with fetched days
        } else {
          toast.error("Failed to fetch days listing.");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching days listing:", error);
        toast.error("An error occurred while fetching days listing.");
      }
    };
    fetchDaysListing();
  }, []);

  // Handle input changes
  const handleChange = (day, type, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        times: { ...prevHours[day].times, [type]: value },
      },
    }));
  };

  // Toggle open/close status
  const handleToggle = (day) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: {
        ...prevHours[day],
        isOpen: !prevHours[day].isOpen,
      },
    }));
  };

  // Generate time options for select dropdown
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const ampm = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedMinute = minute === 0 ? "00" : minute;
        options.push(`${formattedHour}:${formattedMinute} ${ampm}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Utility function to convert AM/PM to 24-hour format
  const convertTo24HourFormat = (timeStr) => {
    const [time, modifier] = timeStr.split(" "); // Split time and AM/PM
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12; // Convert PM to 24-hour format
    }

    if (modifier === "AM" && hours === "12") {
      hours = "00"; // Midnight case
    }

    return `${hours}:${minutes}:00`; // Return in HH:MM:SS format
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // setLoading(true);

      const postDataArray = [];

      for (const day of days) {
        const dayData = hours[day.day_name];

        if (dayData.isOpen && (!dayData.times.open || !dayData.times.close)) {
          toast.error(
            `Please fill both open and close times for ${day.day_name}.`
          );
          setLoading(false);
          return;
        }

        const postData = {
          // userId: userId,
          day_id: day.day_id,

          start_time:
            dayData.isOpen && dayData.times.open
              ? convertTo24HourFormat(dayData.times.open)
              : "00:00:00",
          end_time:
            dayData.isOpen && dayData.times.close
              ? convertTo24HourFormat(dayData.times.close)
              : "00:00:00",

          status: dayData.isOpen ? "open" : "close",

          // service_time_id: day.day_id,
        };

        // Validate if open and close times are properly filled for "open" days
        if (dayData.isOpen && (!dayData.times.open || !dayData.times.close)) {
          toast.error(
            `Please fill both open and close times for ${day.day_name}.`
          );
          setLoading(false);
          return;
        }

        // Add postData to the array
        postDataArray.push(postData);
      }

      setLoading(true);

      // Send the entire array in a single POST request
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/insertOrUpdateTimingData`,
        { userId: userId, data: postDataArray }
      );

      setLoading(false);

      if (response.data.response === true) {

        toast.success(response.data.success_msg || "Submitted successfully!");

        handleNext();
        
      } else {
        toast.error(
          response.data.error_msg || "Error occured. Please try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred while submitting data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollToTop />


      {loading && <Loader />}

      <div className="service-container my-5">
        <form
          className="service-form p-4 border rounded shadow-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="login-head">Add service hours</h2>
          <div className="row">
            {days.map((day) => (
              <div
                key={day.day_id}
                className="service-box col-md-6 col-lg-6 my-4"
              >
                <div className="day-box">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="day-name mb-0">{day.day_name}</h3>
                    <div className="switch-container">
                      <div className="status">
                        <span className="status-label">
                          {hours[day.day_name]?.isOpen ? "Open" : "Closed"}
                        </span>
                      </div>
                      <div className="switch">
                        <input
                          type="checkbox"
                          id={`toggle-${day.day_name}`}
                          checked={hours[day.day_name]?.isOpen}
                          onChange={() => handleToggle(day.day_name)}
                        />
                        <label
                          htmlFor={`toggle-${day.day_name}`}
                          className="slider round"
                        ></label>
                      </div>
                    </div>
                  </div>

                  <div className="time-label">
                    <div className="time-box mb-3">
                      <label className="service-label">Starts at <span className="text-danger">*</span> </label>
                      <div className="time-container d-flex align-items-center">
                        <FaRegClock className="clock-icon" />
                        <select
                          className="form-control time-select"
                          value={hours[day.day_name]?.times.open}
                          onChange={(e) =>
                            handleChange(day.day_name, "open", e.target.value)
                          }
                          disabled={!hours[day.day_name]?.isOpen}
                          style={{ cursor: "pointer" }}
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
                      <label className="service-label">Closed at <span className="text-danger">*</span> </label>
                      <div className="time-container d-flex align-items-center">
                        <FaRegClock className="clock-icon2" />
                        <select
                          className="form-control time-select"
                          value={hours[day.day_name]?.times.close}
                          onChange={(e) =>
                            handleChange(day.day_name, "close", e.target.value)
                          }
                          disabled={!hours[day.day_name]?.isOpen}
                          style={{ cursor: "pointer" }}
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
                </div>
              </div>
            ))}
          </div>
          <div className="service-button">
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="service-btn"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddService;
