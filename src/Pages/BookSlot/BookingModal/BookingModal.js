import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import "./BookingModal.css";
import axios from "axios";

const BookingModal = ({
  show,
  handleClose,
  ChoosenDate,
  newSelectedBookingTable,
  handleGetAllData
}) => {
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [time, setTime] = useState("");
  const [table, setTable] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (show && newSelectedBookingTable) {
      setTable(newSelectedBookingTable?.table?.table_name || "");
      setTime(newSelectedBookingTable.bookingStartTime || "");
    } else {
      setTable("");
      setTime("");
    }
  }, [show, newSelectedBookingTable]);
  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^[0-9]{10}$/;
  
    if (!name || !guests || !time || !table || !email || !phone) {
      toast.error("Please fill all fields!");
      return;
    }
  
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
  
    const formattedTime = time.includes(":") && time.split(":").length === 2
      ? `${time}:00`
      : time;
  
    const year = ChoosenDate.getFullYear();
    const month = String(ChoosenDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(ChoosenDate.getDate()).padStart(2, '0');
    const bookingDate = `${year}-${month}-${day}`;
  
    const bookingData = {
      booking_name: name,
      booking_email: email,
      booking_no_of_guest: guests,
      booking_date: bookingDate,
      booking_time: formattedTime,
      dining_area_id: newSelectedBookingTable?.table?.dining_area_id,
      booking_comment: comment,
      table_ids: [newSelectedBookingTable?.table?.table_id],
    };
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/insertNewBooking`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setLoading(false);
  
      if (response?.data?.response === true) {
        toast.success("Booking done successfully!");
        // Clear the form
        setName("");
        setGuests(1);
        setTime("");
        setTable("");
        setEmail("");
        setPhone("");
        setComment("");
  
        handleClose(); // Close the modal
        handleGetAllData();
      } else {
        const errorMsg = response.data?.message || "Failed.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error occurred:", error);
      toast.error("An error occurred, please try again.");
    }
  };
  
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="d-flex align-items-center">
          <Modal.Title className="me-auto">Create New Booking</Modal.Title>
          <IconButton
            onClick={handleClose}
            aria-label="close"
            style={{ color: "black" }}
          >
            <CloseIcon />
          </IconButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex mb-3">
              <Form.Group
                controlId="formTime"
                className="mr-2"
                style={{ flex: 1 }}
              >
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" value={time} disabled />
              </Form.Group>

              <Form.Group
                controlId="formTable"
                className="ml-2"
                style={{ flex: 1 }}
              >
                <Form.Label>Table</Form.Label>
                <Form.Control as="select" value={table} disabled>
                  <option value="">{table}</option>
                </Form.Control>
              </Form.Group>
            </div>

            <Form.Group
              controlId="formGuests"
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "100%",
                margin: "10px auto", // Center the form group
              }}
            >
              <Form.Label className="text-center w-100">
                No. of Guests
              </Form.Label>
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    if (guests > 1) {
                      setGuests(guests - 1);
                    } else {
                      toast.warn("Number of guests cannot be less than 1.");
                    }
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "20px",
                    transition:
                      "transform 0.2s ease, background-color 0.2s ease",
                  }}
                  className="guest-button-minus"
                >
                  -
                </Button>

                <div
                  style={{
                    width: "60px",
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "0 10px",
                  }}
                >
                  {guests}
                </div>

                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    const maxGuests =
                      newSelectedBookingTable?.table?.table_no_of_seats || 1;
                    if (guests < maxGuests) {
                      setGuests(guests + 1);
                    } else {
                      toast.warn(
                        `Number of guests cannot exceed ${maxGuests} for ${newSelectedBookingTable?.table?.table_name}.`
                      );
                    }
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    fontSize: "20px",
                    transition:
                      "transform 0.2s ease, background-color 0.2s ease",
                  }}
                  className="guest-button-plus"
                >
                  +
                </Button>
              </div>
              <Form.Text className="text-muted text-center d-block mt-2">
                Guests limit: Min 1 and Max{" "}
                {newSelectedBookingTable?.table?.table_no_of_seats || 1}
              </Form.Text>

              <style jsx>{`
                .guest-button-minus:hover,
                .guest-button-plus:hover {
                  transform: scale(1); /* Increase size */
                  background-color: #007bff; /* Change background to blue */
                  border-color: #007bff; /* Change border color to blue */
                  color: white; /* Change text color to white */
                }
              `}</style>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </Form.Group>

            <Form.Group controlId="formComment">
              <Form.Label>Booking Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any special requests or comments"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="Cancel-BookingModal" onClick={handleClose}>
            Close
          </Button>
          <Button className="Save-BookingModal" onClick={handleSave}>
            Save Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookingModal;
