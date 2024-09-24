import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './BookingModal.css';

const BookingModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group controlId="formGuests">
            <Form.Label>No of Guests</Form.Label>
            <Form.Control type="number" placeholder="Enter number of guests" />
          </Form.Group>

          <div className="d-flex">
            {/* Time input */}
            <Form.Group controlId="formTime" className="mr-2" style={{ flex: 1 }}>
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>

            {/* Table selection */}
            <Form.Group controlId="formTable" className="ml-2" style={{ flex: 1 }}>
              <Form.Label>Table</Form.Label>
              <Form.Control as="select">
                <option>T1</option>
                <option>T2</option>
                <option>T3</option>
                <option>T4</option>
                <option>T5</option>
              </Form.Control>
            </Form.Group>
          </div>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter your phone number" />
          </Form.Group>

          <Form.Group controlId="formComment">
            <Form.Label>Booking Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Any special requests or comments"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="Cancel-BookingModal" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="Save-BookingModal" onClick={handleClose}>
          Save Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
