import React from "react";
import { Modal } from "react-bootstrap";
import "./ServiceHourModal.css"; // Optional for custom styles
import CustomizeServices from "../CustomizeServices/CustomizeServices";

const ServiceHourModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Service Hours</Modal.Title>
        {/* Manually adding close button */}
        <button
          type="button"
          className="custom-close-btn"
          aria-label="Close"
          onClick={handleClose}
        >
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <CustomizeServices />
      </Modal.Body>
    </Modal>
  );
};

export default ServiceHourModal;
