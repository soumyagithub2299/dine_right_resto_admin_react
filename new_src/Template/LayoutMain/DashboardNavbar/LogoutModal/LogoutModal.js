import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import './LogoutModal.css';

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <Button className="Nobtn-logout-modal" onClick={onClose}>
          No
        </Button>
        <Button className="Yesbtn-logout-modal" onClick={handleYesClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
