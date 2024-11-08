import React, { useEffect, useState } from "react";
import "./TableGuest.css";
import OrdersModal from "../OrdersModal/OrdersModal";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableGuest = () => {
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState([]);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  // Fetch data from API
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
      } else {
        const errorMsg = response?.data?.error_msg || "No Bookings Made";
        toast.info(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Data fetch failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    handleGetAllData();
  }, []);

  // Send the complete guest object to the modal
  const handleOrdersClick = (guest) => {
    setSelectedOrderDetails(guest); // Store the entire guest object
    setShowOrdersModal(true); // Show the modal
  };

  const handleCloseOrdersModal = () => {
    setShowOrdersModal(false);
    setSelectedOrderDetails(null); // Clear the selected guest object
  };

  return (
    <>
      {loading && <Loader />}
      <div className="p-3">
        {/* Table for displaying guest data */}
        <div className="table-responsive mb-5">
          <table className="table table-bordered table-guest">
            <thead className="heading_guest">
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Guest Name</th>
                <th scope="col">Email</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Booking Time</th>
                {/* <th scope="col">Orders</th> */}
              </tr>
            </thead>
            <tbody>
              {guestData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No matching results found.
                  </td>
                </tr>
              ) : (
                guestData.map((guest, index) => (
                  <tr key={guest.customer_id}>
                    <th scope="row">{index + 1}</th> {/* Serial number */}
                    <td>
                      <div className="container-guest">
                        <div className="pic-email-guest">
                          <img
                            className="img-guest"
                            src={guest.customer_profile_image || "default-image.png"}
                            alt={guest.customer_name}
                          />
                          <div>
                            <div className="name-guest">{guest.customer_name}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-guest">{guest.customer_email}</td>
                    <td className="text-guest">{guest.bookingDate}</td>
                    <td className="text-guest">{guest.bookingTime}</td>

                    {/* <td
                      className="edit_guests"
                      onClick={() => handleOrdersClick(guest)}
                    >
                      Orders
                    </td> */}


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
