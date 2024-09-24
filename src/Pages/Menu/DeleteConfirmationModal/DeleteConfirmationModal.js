import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Menu Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this menu item?</Modal.Body>
      <Modal.Footer>
        <Button className='Cancel-DeleteConfirmationModal' onClick={handleClose}>
          No
        </Button>
        <Button className='Save-DeleteConfirmationModal' onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
