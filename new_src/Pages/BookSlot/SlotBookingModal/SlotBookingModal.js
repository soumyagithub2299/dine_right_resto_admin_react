import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./SlotBookingModal.css";
import EventCalendar from "../EventCalendar/EventCalendar";

const SlotBookingModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className="Modal-SlotBookingModal" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Booking Slots</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalBody-SlotBookingModal">
        <EventCalendar />
      </Modal.Body>
      <Modal.Footer>
        <Button className="Cancel-BookingModal" onClick={handleClose}>
          Close
        </Button>
        <Button className="Save-BookingModal" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SlotBookingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SlotBookingModal;
