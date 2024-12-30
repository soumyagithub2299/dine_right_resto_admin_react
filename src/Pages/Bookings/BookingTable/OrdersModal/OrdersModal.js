import React, { useEffect, useState } from "react";
import "./OrdersModal.css";
import { format } from "date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../../Loader/Loader/Loader";

const OrdersModal = ({
  show,
  handleClose,
  selectedGuest,
  handleGetAllData,
}) => {
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");


  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const calculateEndTime = (startTime, slotTime) => {
    const startDate = new Date();
    const [hours, minutes] = startTime.split(":");
    startDate.setHours(hours);
    startDate.setMinutes(minutes);
    const endDate = new Date(startDate.getTime() + slotTime * 60000);
    return format(endDate, "hh:mm a");
  };

  const startTimeFormatted = selectedGuest?.start_time
    ? formatTime(selectedGuest.start_time)
    : "Invalid start time";

  const endTimeFormatted =
    selectedGuest?.start_time && selectedGuest?.slot_time
      ? calculateEndTime(selectedGuest.start_time, selectedGuest.slot_time)
      : "Invalid time range";

  const calculateItemTotal = (quantity, price) => {
    return quantity * price;
  };

  const handleClearTable = async () => {
    try {
      if (!selectedGuest?.details?.booking_id) {
        toast.error("Booking ID is missing.");
        return;
      }
      if (!token) {
        toast.error("Authorization token is missing.");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/releaseTable/${selectedGuest?.details?.booking_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (response?.data?.response === true) {
        handleGetAllData();
        setOpenClearDialog(false);
        handleClose();
        toast.success(response?.data?.message || "Table released successfully.");
      } else {
        toast.error(response?.data?.message || "Error in releasing the table.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  const handleChangeStatus = async () => {
    try {
      if (!selectedGuest?.details?.booking_id) {
        toast.error("Booking ID is missing.");
        return;
      }
      if (!token) {
        toast.error("Authorization token is missing.");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/inprogressTable/${selectedGuest?.details?.booking_id}`,
        { status: "In Progress" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (response?.data?.response === true) {
        handleGetAllData();
        setOpenStatusDialog(false);
        handleClose();
        toast.success(response?.data?.message || "Status changed successfully.");
      } else {
        toast.error(response?.data?.message || "Error in changing status.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };
































  const generateTimeSlots = () => {
    const slots = [];
    let hour = 0;
    let minute = 0;
    while (hour < 24) {
      const period = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedMinute = minute === 0 ? "00" : minute < 10 ? `0${minute}` : minute;
      
      // Use template strings to ensure consistent formatting
      const timeSlot = `${displayHour}:${formattedMinute} ${period}`;
      slots.push(timeSlot);
      
      minute += 15;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }
    return slots;
  };
  
  const timeSlots = generateTimeSlots();



  const [isButtonEnabled, setIsButtonEnabled] = useState(false);


  const [startTime, setStartTime] = useState(selectedGuest?.start_time || "");
  const [endTime, setEndTime] = useState(selectedGuest?.end_time || "");

  useEffect(() => {
    if (selectedGuest) {
      setStartTime(selectedGuest?.start_time);
      setEndTime(selectedGuest?.end_time);
    }
  }, [selectedGuest]);


  useEffect(() => {
    // Enable button if the timings have changed
    if (
      selectedGuest &&
      (startTime !== selectedGuest?.start_time || endTime !== selectedGuest?.end_time)
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [startTime, endTime, selectedGuest]);
  













  const handleUpdate = async () => {
    try {
      if (!selectedGuest?.details?.booking_id) {
        toast.error("Booking ID is missing.");
        return;
      }
      if (!token) {
        toast.error("Authorization token is missing.");
        return;
      }
  
      setLoading(true);
  
      // Calculate slot time in minutes
      const startTimeMinutes = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
      const endTimeMinutes = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
      const slotTime = endTimeMinutes - startTimeMinutes;
  
      const response = await axios.patch(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/updateBookingTimes`,
        {
          booking_id: selectedGuest?.details?.booking_id,
          booking_time: startTime,
          booking_end_time: endTime,
          slot_time: slotTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setLoading(false);
  
      if (response?.data?.response === true) {
        handleGetAllData();
        setOpenStatusDialog(false);
        handleClose();
        toast.success(response?.data?.message || "Booking Timing changed successfully.");
      } else {
        toast.error(response?.data?.message || "Error in changing Booking Timing.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };
  





  // Generate time options in 15-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time24 = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:00`;
        const time12 = convertTo12HourFormat(hour, minute);
        times.push({ time24, time12 });
      }
    }
    return times;
  };

  // Convert 24-hour format to 12-hour AM/PM format
  const convertTo12HourFormat = (hour, minute) => {
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert hour to 12-hour format, with 0 as 12
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const timeOptions = generateTimeOptions();





  // if (!show) return null;

  return (
    <>
      {loading && <Loader />}

      <div className="orders-modal-overlay">
        <div className="orders-modal">
          <div className="modal-header">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            <h2>Order Details</h2>
          </div>

          <div className="guest-details">
            <p>
              <strong>Booking Name: </strong>
              <span style={{ fontWeight: "bold" }}>
                {selectedGuest?.details?.booking_name}
              </span>
            </p>
            <p>
              <strong>Booking Email: </strong>
              {selectedGuest?.details?.booking_email}
            </p>
            <p>
              <strong>Number Of Guests: </strong>
              {selectedGuest?.details?.booking_no_of_guest}
            </p>
            <p>
              <strong>Booking Status: </strong>
              {selectedGuest?.booking_status}
            </p>
            <p>
              <strong>Booked Table Details: </strong>
              {selectedGuest?.table_name}
            </p>
            <p>
              <strong>Booked Time From </strong>
              {startTimeFormatted} to {endTimeFormatted}{" "}
              <strong>({selectedGuest?.slot_time} Minutes)</strong>
            </p>






































            <div>




            <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label>
            <strong>Start Time:</strong>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select Start Time</option>
              {timeOptions.map(({ time24, time12 }) => (
                <option key={time24} value={time24}>
                  {time12}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ flex: 1 }}>
          <label>
            <strong>End Time:</strong>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                margin: "10px 0",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select End Time</option>
              {timeOptions.map(({ time24, time12 }) => (
                <option key={time24} value={time24}>
                  {time12}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>









      <button
        onClick={handleUpdate} // Replace with your update function
        disabled={!isButtonEnabled}

        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isButtonEnabled ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          cursor: isButtonEnabled ? "pointer" : "not-allowed",
          marginTop: "15px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) =>
          isButtonEnabled &&
          (e.currentTarget.style.backgroundColor = "#45a049")
        }
        onMouseOut={(e) =>
          isButtonEnabled &&
          (e.currentTarget.style.backgroundColor = "#4CAF50")
        }
      >
        Update Booking Timings
      </button>

      </div>























































          </div>

{selectedGuest?.details?.table_booked_by_resto_admin === 0 && (

          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Menu Item</th>
                  <th>Item Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedGuest?.details?.menu?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                          }}
                        >
                          <img
                            src={item.master_item_image}
                            alt={item.master_item_name}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <span>{item?.master_item_name}</span>
                      </div>
                    </td>
                    <td>{item.master_item_description || "N/A"}</td>
                    <td>{item.product_quantity || 0}</td>
                    <td>₹{item.master_item_price}</td>
                    <td>
                      ₹
                      {calculateItemTotal(
                        item.product_quantity || 0,
                        item.master_item_price
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

)}



          <div className="order-summary">

          {selectedGuest?.details?.table_booked_by_resto_admin === 0 && (

            <p>
              <strong>Total Net Amount: </strong>₹
              {selectedGuest?.details?.billing_amount}
            </p>

            )}

            <p>
              <strong>Payment Status: </strong>
              {selectedGuest?.details?.payment_status}
            </p>
          </div>







          {selectedGuest?.booking_status !== "inprogress" &&  selectedGuest?.booking_status !== "completed" && (
          <Button
            variant="contained"
            disabled={selectedGuest?.booking_status === "inprogress"}
            onClick={() => setOpenStatusDialog(true)}
            style={{
              marginBottom: "45px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#87CEFA",
              color: "black",
              display: "block",
              width: "300px",
              cursor: selectedGuest?.booking_status === "inprogress" ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "blue";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#87CEFA";
              e.currentTarget.style.color = "black";
            }}
          >
            Change Table/Booking Status
          </Button>
          )}


{selectedGuest?.booking_status !== "upcoming" && selectedGuest?.booking_status !== "completed" && (
          <Button
            variant="contained"
            disabled={selectedGuest?.booking_status === "upcoming"}
            onClick={() => setOpenClearDialog(true)}
            style={{
              marginBottom: "45px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#FFCCCB",
              color: "black",
              display: "block",
              width: "300px",
              cursor: selectedGuest?.booking_status === "upcoming" ? "not-allowed" : "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "red";
              e.currentTarget.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FFCCCB";
              e.currentTarget.style.color = "black";
            }}
          >
            Release Table/Booking
          </Button>
)}
  

          <Dialog
            BackdropProps={{
              style: {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
            }}
            open={openClearDialog}
            onClose={() => setOpenClearDialog(false)}
          >
            <DialogTitle>Confirm Clear Table</DialogTitle>
            <DialogContent>
            <p>
              Are you sure you want to clear/release the booking for{" "}
              <strong>{selectedGuest?.details?.booking_name}</strong> of{" "}
              <strong>{selectedGuest?.table_name}</strong> from{" "}
              <strong>{startTimeFormatted}</strong> to{" "}
              <strong>{endTimeFormatted}</strong> {" for "}{" "}
              <strong>
                {selectedGuest ? selectedGuest?.no_of_guest : ""} guests{" "}
              </strong>
              ?
            </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenClearDialog(false)}>Cancel</Button>
              <Button onClick={handleClearTable} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            BackdropProps={{
              style: {
                backgroundColor: "rgba(0,0,0,0.3)",
              },
            }}
            open={openStatusDialog}
            onClose={() => setOpenStatusDialog(false)}
          >
            <DialogTitle>Change Status</DialogTitle>
            <DialogContent>
  Are you sure you want to change the status from{" "}
  <strong style={{ color: "black", fontWeight: "bold" }}>Confirmed</strong> to{" "}
  <strong style={{ color: "green", fontWeight: "bold" }}>In Progress</strong>{" "}
  for <strong>{selectedGuest?.details?.booking_name}</strong> of{" "}
  <strong>{selectedGuest?.table_name}</strong> from{" "}
  <strong>{startTimeFormatted}</strong> to{" "}
  <strong>{endTimeFormatted}</strong> for{" "}
  <strong>
    {selectedGuest ? selectedGuest?.no_of_guest : ""} guests
  </strong>?
</DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenStatusDialog(false)}>Cancel</Button>
              <Button onClick={handleChangeStatus} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default OrdersModal;
