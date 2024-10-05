// DeleteCourseModal.js
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./DeleteCourseModal.css";

const DeleteCourseModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
      <Modal.Footer>
        <Button className="No-DeleteCourseModal" onClick={handleClose}>
          No
        </Button>
        <Button className="Yes-DeleteCourseModal" onClick={handleClose}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCourseModal;
