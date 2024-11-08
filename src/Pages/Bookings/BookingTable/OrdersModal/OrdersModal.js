import React from 'react';
import './OrdersModal.css'; // Add styles as necessary
import { format } from 'date-fns';

const OrdersModal = ({ show, handleClose, selectedGuest }) => {
  // Return null if the modal should not be displayed
  if (!show) return null;

  // Function to format the start time from 24-hour to 12-hour format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date(); // Using the current date
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Function to calculate the end time based on start time and slot time
  const calculateEndTime = (startTime, slotTime) => {
    const startDate = new Date(); // Using the current date
    const [hours, minutes] = startTime.split(':');
    startDate.setHours(hours);
    startDate.setMinutes(minutes);

    const endDate = new Date(startDate.getTime() + slotTime * 60000); // Add slot_time in minutes
    return format(endDate, 'hh:mm a'); // Format end time to 12-hour AM/PM
  };

  // Format start time using the formatTime function
  const startTimeFormatted = selectedGuest?.start_time ? formatTime(selectedGuest.start_time) : 'Invalid start time';

  // Calculate end time if both start_time and slot_time are valid
  const endTimeFormatted = (selectedGuest?.start_time && selectedGuest?.slot_time)
    ? calculateEndTime(selectedGuest.start_time, selectedGuest.slot_time)
    : 'Invalid time range';

  // Function to calculate the total price for each item
  const calculateItemTotal = (quantity, price) => {
    return quantity * price;
  };

  return (
    <div className="orders-modal-overlay">
      <div className="orders-modal">
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>Order Details</h2>

        {/* Booking Details */}
        <div className="guest-details">
          <p><strong>Booking Name: </strong>{selectedGuest?.details?.booking_name}</p>
          <p><strong>Booking Email: </strong>{selectedGuest?.details?.booking_email}</p>
          <p><strong>Number Of Guests: </strong>{selectedGuest?.no_of_guest}</p>
          <p><strong>Booking Status: </strong>{selectedGuest?.booking_status}</p>
          <p><strong>Booked Table Details: </strong>{selectedGuest?.table_name}</p>

          <p><strong>Booked Time From </strong>{startTimeFormatted} to {endTimeFormatted} <strong>({selectedGuest?.slot_time} Minutes)</strong></p>
        </div>

        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedGuest?.details?.menu?.map((item, index) => (
                <tr key={index}>
                  <td className="menu-item">
                    <img src={item.master_item_image} alt={item.master_item_name} />
                    {item.master_item_name}
                  </td>
                  <td>{item.master_item_description || 'N/A'}</td>
                  <td>{item.product_quantity || 0}</td>
                  <td>₹{item.master_item_price}</td>
                  <td>₹{calculateItemTotal(item.product_quantity || 0, item.master_item_price)}</td> {/* Total price */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <p><strong>Total Net Amount: </strong>₹{selectedGuest?.details?.billing_amount}</p>
          <p><strong>Payment Status: </strong>{selectedGuest?.details?.payment_status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
