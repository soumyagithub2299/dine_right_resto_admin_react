import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  if (!show) return null;

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
      // Ensure `selectedGuest?.details?.booking_id` and token are defined before making the request
      if (!selectedGuest?.details?.booking_id) {
        toast.error("Booking ID is missing.");
        return;
      }
      if (!token) {
        toast.error("Authorization token is missing.");
        return;
      }
  
      setLoading(true);
  
      // Use axios.post with the correct structure, passing the token in headers
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/releaseTable/${selectedGuest?.details?.booking_id}`,
        {}, // Empty body for the POST request, unless your API requires data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
  
      setLoading(false);
  
      if (response?.data?.response === true) {
        handleGetAllData(); // Refresh the data if the table is released successfully
        setOpenClearDialog(false); // Close the dialog
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
            {selectedGuest?.no_of_guest}
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
        </div>

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
                          marginRight: "10px", // Adds space between image and name
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
                      <span>{item?.master_item_name}</span>{" "}
                      {/* Keeps name next to the image */}
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

        <div className="order-summary">
          <p>
            <strong>Total Net Amount: </strong>₹
            {selectedGuest?.details?.billing_amount}
          </p>
          <p>
            <strong>Payment Status: </strong>
            {selectedGuest?.details?.payment_status}
          </p>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpenClearDialog(true)}
          style={{
            marginBottom: "25px",
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#FFCCCB",
            color: "black",
            display: "block",
            width: "300px",
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
          Clear Table
        </Button>

        <Dialog
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
          open={openClearDialog}
          onClose={() => setOpenClearDialog(false)}
        >
          <DialogTitle>Clear Booking Confirmation</DialogTitle>
          <DialogContent>
            <p>
              Are you sure you want to clear the booking for{" "}
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
            <Button onClick={() => setOpenClearDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClearTable} color="error">
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