import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import "./BookingModal.css";

const BookingModal = ({ show, handleClose, onSave, newSelectedBookingTable, bookings, setBookings }) => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [time, setTime] = useState("");
  const [table, setTable] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [course, setCourse] = useState("");
  const [menu, setMenu] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);

  const courseMenuMap = {
    "Course 1": ["Menu 1-1", "Menu 1-2", "Menu 1-3"],
    "Course 2": ["Menu 2-1", "Menu 2-2", "Menu 2-3"],
    "Course 3": ["Menu 3-1", "Menu 3-2", "Menu 3-3"],
  };

  useEffect(() => {
    if (show && newSelectedBookingTable) {
      setTable(newSelectedBookingTable.table.name);
      setTime(newSelectedBookingTable.timeSlot);
    } else {
      setTable("");
      setTime("");
    }
  }, [show, newSelectedBookingTable]);

  useEffect(() => {
    if (course) {
      setMenuOptions(courseMenuMap[course]);
      setMenu(""); // Reset menu selection when course changes
    } else {
      setMenuOptions([]); // Clear menu options if no course is selected
    }
  }, [course]);

  const handleSave = () => {
    // Validation: Check if required fields are filled
    if (!name || !guests || !time || !table || !email || !phone || !course || !menu) {
      toast.error("Please fill all fields!");
      return;
    }

    const newBooking = {
      id: bookings.length + 1, // Example ID generation
      table,
      time,
      guests: Number(guests),
      status: "upcoming",
      details: {
        name,
        menu,
        payment: "Pending", // Example default value for payment status
      },
      booked_for_limit: guests * 30, // Assuming 30 minutes per guest
    };

    // Save the new booking
    setBookings([...bookings, newBooking]);
    if (typeof onSave === "function") {
      onSave(newBooking); // Call onSave with the new booking
    }

    // Clear form after saving
    setName("");
    setGuests("");
    setTime("");
    setTable("");
    setEmail("");
    setPhone("");
    setComment("");
    setCourse("");
    setMenu("");
    setMenuOptions([]); // Reset menu options after save

    handleClose();
  };

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer to your component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="d-flex align-items-center">
          <Modal.Title className="me-auto">Create New Booking</Modal.Title>
          <IconButton
            onClick={handleClose}
            aria-label="close"
            style={{ color: 'black' }}
          >
            <CloseIcon />
          </IconButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group controlId="formGuests">
              <Form.Label>No. of Guests</Form.Label>
              <Form.Control
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder="Enter number of guests"
              />
            </Form.Group>

            <div className="d-flex mb-3">
              <Form.Group controlId="formTime" className="mr-2" style={{ flex: 1 }}>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formTable" className="ml-2" style={{ flex: 1 }}>
                <Form.Label>Table</Form.Label>
                <Form.Control
                  as="select"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  disabled
                >
                  <option value="">{table}</option>
                </Form.Control>
              </Form.Group>
            </div>

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

            <Form.Group controlId="formCourse">
              <Form.Label>Select Course</Form.Label>
              <Form.Control
                as="select"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">Choose a course...</option>
                <option value="Course 1">Course 1</option>
                <option value="Course 2">Course 2</option>
                <option value="Course 3">Course 3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMenu">
              <Form.Label>Select Menu</Form.Label>
              <Form.Control
                as="select"
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                disabled={!menuOptions.length}
              >
                <option value="">Choose a menu...</option>
                {menuOptions.map((menuItem, index) => (
                  <option key={index} value={menuItem}>{menuItem}</option>
                ))}
              </Form.Control>
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

BookingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  newSelectedBookingTable: PropTypes.shape({
    table: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
    }).isRequired,
    timeSlot: PropTypes.string.isRequired,
  }),
  bookings: PropTypes.array.isRequired, // Add bookings prop type
  setBookings: PropTypes.func.isRequired, // Add setBookings prop type
};

export default BookingModal;
