import React, { useEffect, useState } from "react";
import "./BookingTable.css";
import OrdersModal from "./OrdersModal/OrdersModal";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingTable = () => {
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null); // To hold the selected guest object
  const [noDataMessage, setNoDataMessage] = useState(false); // Flag for no data message

  const [ChoosenDate, setChoosenDate] = useState();



  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // const formatTime = (time) => {
  //   const date = new Date(`1970-01-01T${time}Z`);
  //   return date.toLocaleTimeString("en-US", {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  // };

  // Function to format the start time from 24-hour to 12-hour format
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date(); // Using the current date
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // const handlePrevDay = () => {
  //   setCurrentDate((prevDate) => {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0); // Reset the time to 00:00:00 for accurate comparison

  //     const newDate = new Date(prevDate);
  //     newDate.setDate(newDate.getDate() - 1); // Decrement day by 1

  //     // Check if newDate is before today, prevent update if so
  //     if (newDate < today) {
  //       return prevDate; // Return the previous date without changing it
  //     }
  //     handleGetAllData(newDate);

  //     return newDate;
  //   });
  // };

  const handlePrevDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1); 
      handleGetAllData(newDate); 
     setChoosenDate(newDate);

      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1); // Increment day by 1
      handleGetAllData(newDate);
     setChoosenDate(newDate);

      return newDate;
    });
  };




  const handleGetAllData = async (date) => {
    setChoosenDate(date);
  // Manually format the date to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const bookingDate = `${year}-${month}-${day}`;



    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllocatedTables?booking_date=${bookingDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (Array.isArray(response?.data) && response?.data) {
        setGuestData(response?.data);
        setNoDataMessage(false); // Hide no data message
        if(response.data.length === 0){
          const errorMsg = "No Bookings Made";
          toast.info(errorMsg);
          }
      } else {
        setGuestData([]); // Clear the previous data
        setNoDataMessage(true); // Show no data message
        const errorMsg = response?.data?.error_msg || "No Bookings Made";
        toast.info(errorMsg);
      }



    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {
    handleGetAllData(currentDate);
    setChoosenDate(currentDate);
  }, [currentDate]);

  // Send the complete guest object to the modal
  const handleOrdersClick = (guest) => {
    setSelectedGuest(guest); // Store the entire guest object
    setShowOrdersModal(true); // Show the modal
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedGuest(null); // Clear the selected guest object
  };

  return (
    <>
      {loading && <Loader />}

      <div className="p-3">
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    color: "black", // Set all text to black
    fontWeight: "bold",
    fontSize: "20px", // Adjust font size for date text if needed
  }}
>
  <button
    style={{
      background: "none",
      border: "none",
      fontSize: "36px", // Larger font size for bigger arrows
      color: "black", // Set arrows color to black
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={handlePrevDay}
  >
    &#8592;
  </button>
  
  <span>{formatDate(currentDate)}</span>
  
  <button
    style={{
      background: "none",
      border: "none",
      fontSize: "36px", // Larger font size for bigger arrows
      color: "black", // Set arrows color to black
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={handleNextDay}
  >
    &#8594;
  </button>
</div>


        {/* Conditionally show the no data message */}
        {noDataMessage ? (
          <div className="no-data-message">
            <strong style={{ color: "red", fontSize: "20px" }}>
              No bookings available for this date.
            </strong>
          </div>
        ) : (
          <div className="table-responsive mb-5">
            <table className="table table-bordered table-guest">
              <thead className="heading_guest">
                <tr>
                  <th scope="col">Sr No.</th>
                  <th scope="col">Guest Name</th>
                  <th scope="col">Time</th>

                  <th scope="col">Total Payment</th>

                  <th scope="col">Payment Status</th>

                  <th scope="col">Booking Status</th>
                  <th scope="col">Guests Count</th>
                  <th scope="col">Table</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {guestData.map((guest, index) => (
                  <tr key={guest.table_id}>
                    <th scope="row" className="id-guest">
                      {index + 1}
                    </th>
                    <td>
                      <div className="container container-guest">
                        <div className="pic-email-guest">
                       
                     
                            <div className="row name-email-guest">
                              <div className="name-guest">
                                {guest.details?.booking_name}
                              </div>
                              <div className="email-guest">
                                {guest.details?.booking_email}
                              </div>
                            </div>
                         
                        </div>
                      </div>
                    </td>
                    <td className="text-guest">
                      {formatTime(guest.start_time)}
                    </td>

                    <td className="text-guest">
                      ₹{guest.details.billing_amount}
                    </td>

                    <td className="text-guest">
                      {guest.details.payment_status}
                    </td>

                    <td
                      className={`status ${guest.booking_status}`}
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      <div
                        className={`status-background-${guest.booking_status}`}
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {guest.booking_status}
                      </div>
                    </td>

                    <td className="text-guest">{guest.no_of_guest}</td>
                    <td className="text-guest">{guest.table_name}</td>
                    <td
                      className="edit_guests"
                      onClick={() => handleOrdersClick(guest)}
                    >
                      <span className="material-icons">edit</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedGuest && (
          <OrdersModal
            show={showOrdersModal}
            handleClose={handleCloseOrdersModal}
            selectedGuest={selectedGuest}
            handleGetAllData={() => handleGetAllData(ChoosenDate)}
          />
        )}

        
      </div>
      <ToastContainer />
    </>
  );
};

export default BookingTable;
