import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Loader/Loader/Loader";
import "./BookingTable.css";
import OrdersModal from "./OrdersModal/OrdersModal";
import { RxCross2 } from "react-icons/rx";

const BookingTable = () => {
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ChoosenDate, setChoosenDate] = useState();

  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
      newDate.setDate(newDate.getDate() + 1);
      handleGetAllData(newDate);
      setChoosenDate(newDate);
      return newDate;
    });
  };

  const handleGetAllData = async (date) => {
    setChoosenDate(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const bookingDate = `${year}-${month}-${day}`;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllDiningAreaBookingAndAllocatedTables?booking_date=${bookingDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (Array.isArray(response?.data) && response?.data) {
        setGuestData(response?.data);
        setNoDataMessage(false);

        if (response.data.length === 0) {
          setNoDataMessage(true);
        }
      } else {
        setGuestData([]);
        setNoDataMessage(true);
        const errorMsg = response?.data?.error_msg || "An error occurred.";
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

  const handleOrdersClick = (guest) => {
    setSelectedGuest(guest);
    setShowOrdersModal(true);
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedGuest(null);
  };

  const handleClearSearch = () => setSearchTerm("");

  const filteredGuests = guestData.filter((guest) =>
    guest.booking_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "36px",
              color: "black",
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
              fontSize: "36px",
              color: "black",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={handleNextDay}
          >
            &#8594;
          </button>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <div className="search-container mb-3">
            <input
              type="text"
              placeholder="Search by Guest Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control search-input"
            />
            {searchTerm && (
              <RxCross2 className="clear-icon" onClick={handleClearSearch} />
            )}
          </div>
        </div>
        {filteredGuests.length === 0 && (
          <div
            className="no-data-message"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <strong style={{ color: "red", fontSize: "20px" }}>
              {searchTerm.trim()
                ? "No results found for your search."
                : "No bookings available for this date."}
            </strong>
          </div>
        )}
        {filteredGuests.length > 0 && (
          <div className="table-responsive mb-5">
            <table className="table table-bordered table-guest">
              <thead className="heading_guest">
                <tr>
                  <th scope="col" style={{ width: "7%" }}>
                    Sr.
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Guest
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Time
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    Total Payment
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Payment Mode
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Payment Status
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Booking Status
                  </th>
                  <th scope="col" style={{ width: "7%" }}>
                    Guests Count
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Table
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest, index) => (
                  <tr key={guest.table_id}>
                    <th scope="row" className="id-guest">
                      {index + 1}
                    </th>
                    <td>{guest?.booking_name}</td>
                    <td>{formatTime(guest.booking_time)}</td>
                    <td>₹{guest.billing_amount}</td>
                    <td>{guest.payment_mod}</td>
                    <td>{guest.payment_status}</td>
                    <td
                      className={`status ${guest.booking_status}`}
                      style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {guest.booking_status}
                    </td>
                    <td>{guest.booking_no_of_guest}</td>
                    <td>{guest.tables}</td>
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
