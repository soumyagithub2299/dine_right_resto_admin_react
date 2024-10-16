import React, { useState } from "react";
import "./GuestTimeSlot.css";
import { HiPlus } from "react-icons/hi";
import { IoMdBackspace } from "react-icons/io";
import { HiPlusSmall } from "react-icons/hi2";
import { BiMinus } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../../src/Loader/Loader/Loader";

const GuestTimeSlot = ({ handleNext, handleBack }) => {

  const userId = sessionStorage.getItem("newSignUpRestoUserId");



  const [mainDiningRows, setMainDiningRows] = useState([
    { id: Date.now(), number: 1, duration: "30" },
    { id: Date.now() + 1, number: 2, duration: "45" },
    { id: Date.now() + 2, number: 3, duration: "60" },
    { id: Date.now() + 3, number: 4, duration: "75" },
    { id: Date.now() + 4, number: 5, duration: "90" },
    { id: Date.now() + 5, number: 6, duration: "105" },
    { id: Date.now() + 6, number: 7, duration: "120" },
    { id: Date.now() + 7, number: 8, duration: "135" },
    { id: Date.now() + 8, number: 9, duration: "150" },
    { id: Date.now() + 9, number: 10, duration: "165" },
    { id: Date.now() + 10, number: 11, duration: "180" },
    { id: Date.now() + 11, number: 12, duration: "180" },
    { id: Date.now() + 12, number: 13, duration: "180" },
    { id: Date.now() + 13, number: 14, duration: "180" },
    { id: Date.now() + 14, number: 15, duration: "180" },
    { id: Date.now() + 15, number: 16, duration: "180" },
    { id: Date.now() + 16, number: 17, duration: "180" },
    { id: Date.now() + 17, number: 18, duration: "180" },
    { id: Date.now() + 18, number: 19, duration: "180" },
    { id: Date.now() + 19, number: 20, duration: "180" },
    { id: Date.now() + 20, number: 21, duration: "180" },
    { id: Date.now() + 21, number: 22, duration: "180" },
    { id: Date.now() + 22, number: 23, duration: "180" },
    { id: Date.now() + 23, number: 24, duration: "180" },
    { id: Date.now() + 24, number: 25, duration: "180" },
  ]);


  const [loading, setLoading] = useState(false);

  const handleIncrement = (index) => {
    const newRows = [...mainDiningRows];
    newRows[index].number += 1;
    setMainDiningRows(newRows);
  };

  const handleDecrement = (index) => {
    const newRows = [...mainDiningRows];
    if (newRows[index].number > 1) {
      newRows[index].number -= 1;
      setMainDiningRows(newRows);
    }
  };

  const addRow = () => {
    setMainDiningRows([
      ...mainDiningRows,
      { id: Date.now(), number: 1, duration: "" },
    ]);
  };

  // Modify to remove a specific row by its id
  const removeRow = (id) => {
    if (mainDiningRows.length > 1) {
      setMainDiningRows(mainDiningRows.filter((row) => row.id !== id));
    } else {
      toast.error("At least one guest slot is required.");
    }
  };

  const handleDurationChange = (index, value) => {
    const newRows = [...mainDiningRows];
    newRows[index].duration = value;
    setMainDiningRows(newRows);
  };
  const validateForm = () => {
    // Ensure each row has a guest count and a duration selected
    return mainDiningRows.every((row) => row.number > 0 && row.duration !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error(
        "Please fill all guest counts and durations before submitting."
      );
      return;
    }

    if (!userId) {
      toast.error("Invalid user ID. Please log in again.");
      return;
    }

    const body = {
      userId: userId,
      restro_guest: mainDiningRows.map((row) => row.number),
      restro_spending_time: mainDiningRows.map(
        (row) => `${row.duration} minutes`
      ),
    };

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/app/restro_guest_time_duration`,
        body
      );

      setLoading(false);

      if (response?.data?.response === true) {
        toast.success(
          response?.data?.success_msg || "Guest Time Slot added successfully."
        );

       handleNext();
      } else {
        toast.error(
          response.data.error_msg || "Error creating account. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error submitting guest time slots:",
        error.response ? error.response.data : error
      );
      toast.error("An error occurred. Please try again.");
    }
  };

  const durationOptions = [
    15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="container Main_AddTable my-5">
        <p className="Heading_AddTable mb-4">Add Guest Time</p>
        <p className="Paragraph_AddTable">
          Add time duration as per guest count.  
        </p>

        <div className="MainDining_AddTable mb-5 mt-5">
          <p className="Subheading1_AddTable">
            Time duration as per guest count
          </p>
          <div className="row">
            {mainDiningRows.map((row, index) => (
              <div
                key={row.id}
                className="row w-100 mb-3"
                style={{ backgroundColor: "#F6F8F9" }}
              >
                <div className="col-12 col-md-6 p-4">
                  <div>
                    <div className="Subheading2_AddTable">
                      COUNT OF GUESTS <span className="text-danger">*</span>
                    </div>
                    <div className="component-guest2">
                      {row.number}
                      <div className="innerSvg_AddTable">
                        <BiMinus
                          className="SubinnerSvg"
                          onClick={() => handleDecrement(index)}
                        />
                        <HiPlusSmall
                          className="SubinnerSvg"
                          onClick={() => handleIncrement(index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 p-4">
                  <div className="Subheading2_AddTable">
                    DURATION (in minutes) <span className="text-danger">*</span>
                  </div>
                  <div className="seating_AddTable">
                    <div className="component-guest1">
                      <select
                        value={row.duration}
                        onChange={(e) =>
                          handleDurationChange(index, e.target.value)
                        }
                        className="table-name-input"
                        style={{ cursor: "pointer" }}
                      >
                        <option value="" disabled>
                          Select duration
                        </option>
                        {durationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option} minutes
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Show only delete button for rows that are not the last one */}
                    <div>
                      <IoMdBackspace
                        className="svg_AddTable"
                        onClick={() => removeRow(row.id)}
                        style={{ marginRight: "10px", fontSize: "25px" }}
                      />
                      {/* Show add button only for the last row */}
                      {index === mainDiningRows.length - 1 && (
                        <HiPlus
                          className="svg_AddTable"
                          style={{ fontSize: "35px" }}
                          onClick={addRow}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="service-button">
          <button type="submit" className="addTable-btn" onClick={handleSubmit}>
            Confirm
          </button>
        </div>

            {/* <div
              style={{
                marginTop: "10px",
                alignContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  marginTop: "10px",
                }}
              >
                <p
                  className="SignUp-LoginPage"
                  style={{
                    margin: "0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Already have an account? Login
                </p>
              </Link>
            </div> */}




      </div>
    </>
  );
};

export default GuestTimeSlot;
