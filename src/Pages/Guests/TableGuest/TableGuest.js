import React, { useEffect, useState } from "react";
import "./TableGuest.css";
import OrdersModal from "../OrdersModal/OrdersModal";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";

const TableGuest = () => {
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState([]);
  const [filteredGuestData, setFilteredGuestData] = useState([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const handleGetAllData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getBookingUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      if (Array.isArray(response?.data) && response.data.length > 0) {
        const formattedData = response.data.map((guest) => ({
          ...guest,
          bookingDate: new Date(guest.booking_date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          bookingTime: new Date(guest.booking_date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }),
        }));
        setGuestData(formattedData);
        setFilteredGuestData(formattedData);
      } else {
        const errorMsg = response?.data?.error_msg || "No Guests Found.";
        toast.info(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Data fetch failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {
    handleGetAllData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filteredData = guestData.filter((guest) =>
        guest.customer_name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGuestData(filteredData);
    } else {
      setFilteredGuestData(guestData);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredGuestData(guestData);
  };

  const handleOrdersClick = (guest) => {
    setSelectedOrderDetails(guest);
    setShowOrdersModal(true);
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedOrderDetails(null);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-3">
        <div className="d-flex justify-content-end mb-3">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Guest Name"
              value={searchTerm}
              onChange={handleSearch}
              className="form-control search-input"
            />
            {searchTerm && (
              <RxCross2 className="clear-icon" onClick={clearSearch} />
            )}
          </div>
        </div>
        <div className="table-responsive mb-5">
          <table className="table table-bordered table-guest">
            <thead className="heading_guest">
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Guest Name</th>
                <th scope="col">Email</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuestData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No guests found.
                  </td>
                </tr>
              ) : (
                filteredGuestData.map((guest, index) => (
                  <tr key={guest.customer_id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="container-guest">
                        <div className="pic-email-guest">
                          <div>
                            <div className="name-guest">{guest.customer_name}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-guest">{guest.customer_email}</td>
                    <td className="text-guest">{guest.bookingDate}</td>
                    <td className="text-guest">{guest.bookingTime}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedOrderDetails && (
          <OrdersModal
            show={showOrdersModal}
            handleClose={handleCloseOrdersModal}
            selectedGuest={selectedOrderDetails}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default TableGuest;
