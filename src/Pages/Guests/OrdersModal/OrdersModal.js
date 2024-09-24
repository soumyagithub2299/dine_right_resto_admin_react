// OrdersModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./OrdersModal.css";

const OrdersModal = ({ show, handleClose, orderDetails }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title className="order-title">Orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
          <div className="col-12 col-md-6">
          <h5>Order Items :</h5>
          </div>
          <div className="col-12 col-md-6">
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
          </div>
        <div>
          <hr/>
          <div className="row">
          <div className="col-12 col-md-6">
          <h5>Booking Comment :</h5>
          </div>
          <div className="col-12 col-md-6 Sub-Booking-comment">
          <p>{orderDetails.comment}</p>
        </div>
        </div>
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-cancel-guest" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrdersModal;
