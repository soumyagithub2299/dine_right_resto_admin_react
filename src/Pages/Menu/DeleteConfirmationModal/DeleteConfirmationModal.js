import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./DeleteConfirmationModal.css";
import Loader from "../../../Loader/Loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const DeleteConfirmationModal = ({
  show,
  handleClose,
  selectedItem,
  handleGetAllData,
  menu_id
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const body = {
        master_item_id: selectedItem?.master_item_id,
        menu_id:menu_id,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/deleteMasterMenuItem`,
        body
      );

      setLoading(false);

      if (response.data.response === true) {
        toast.success(response.data.success_msg || "Deleted successful!");

        handleGetAllData();
        handleClose();
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      toast.error("An error occurred during deleting. Please try again later.");
    }
  };

  return (
    <>
      {loading && <Loader />}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this menu item?</Modal.Body>
        <Modal.Footer>
          <Button
            className="Cancel-DeleteConfirmationModal"
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            className="Save-DeleteConfirmationModal"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
