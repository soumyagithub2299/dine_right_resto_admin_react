import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import "./BookingModal.css";

const BookingModal = ({ show, handleClose, onSave }) => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");
  const [time, setTime] = useState("");
  const [table, setTable] = useState(""); // Set table with initial empty value
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSave = () => {
    if (typeof onSave === "function") {
      onSave({
        name,
        guests: Number(guests),
        time,
        table,
        email,
        phone,
        comment,
      });

      // Clear form after saving
      setName("");
      setGuests("");
      setTime("");
      setTable(""); // Reset table to empty after save
      setEmail("");
      setPhone("");
      setComment("");

      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Booking</Modal.Title>
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
            <Form.Label>No of Guests</Form.Label>
            <Form.Control
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Enter number of guests"
            />
          </Form.Group>

          <div className="d-flex">
            <Form.Group controlId="formTime" className="mr-2" style={{ flex: 1 }}>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTable" className="ml-2" style={{ flex: 1 }}>
              <Form.Label>Table</Form.Label>
              <Form.Control
                as="select"
                value={table} // Ensure the value is bound to state
                onChange={(e) => setTable(e.target.value)} // Ensure onChange updates the table state
              >
                <option value="">Select Table</option>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
                <option value="T5">T5</option>
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
  );
};

BookingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default BookingModal;
