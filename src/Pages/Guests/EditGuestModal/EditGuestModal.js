import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditGuestModal.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

const EditGuestModal = ({ show, handleClose, guest, setGuest, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Guest</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Guest Name</Form.Label>
            <Form.Control
              type="text"
              value={guest.name}
              onChange={(e) => setGuest({ ...guest, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              value={guest.mobile}
              onChange={(e) => setGuest({ ...guest, mobile: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="text"
              value={guest.time}
              onChange={(e) => setGuest({ ...guest, time: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              value={guest.date}
              onChange={(e) => setGuest({ ...guest, date: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={guest.status}
              onChange={(e) => setGuest({ ...guest, status: e.target.value })}
            >
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refund">Refunded</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>People</Form.Label>
            <Form.Control
              type="number"
              value={guest.people}
              onChange={(e) => setGuest({ ...guest, people: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Table</Form.Label>
            <Form.Control
              type="text"
              value={guest.table}
              onChange={(e) => setGuest({ ...guest, table: e.target.value })}
            />
          </Form.Group>

          <Button  type="submit" className='btn-saveChanges-guest mt-3'>
            Save Changes
          </Button>
          <Button  onClick={handleClose} className='btn-cancel-guest mt-3 ml-2'>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditGuestModal;
