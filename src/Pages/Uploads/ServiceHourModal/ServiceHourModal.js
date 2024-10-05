import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ServiceHourModal.css"; // Optional for custom styles
// import DayWiseTime from "../../Profile/DayWiseTime/DayWiseTime";
// import AddService from "../../New Account/AddServices/AddService";
import CustomizeServices from "../CustomizeServices/CustomizeServices";

const ServiceHourModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Service Hours</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your form or content for service hours here */}
        {/* <DayWiseTime/> */}
        {/* <AddService /> */}
        <CustomizeServices />
      </Modal.Body>
      <Modal.Footer>
        <Button className="Cancel-ServiceHourModal" onClick={handleClose}>
          Close
        </Button>
        <Button className="Save-ServiceHourModal" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceHourModal;
