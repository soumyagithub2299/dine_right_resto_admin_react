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



// import React from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { toast } from "react-toastify"; 
// import { deleteCourseAPI } from "./../../../utils/APIs/CourseApi/CourseApi"; 
// import "./DeleteCourseModal.css";

// const DeleteCourseModal = ({ show, handleClose }) => {
//   const handleDelete = async () => {
//     try {
   
//       const response = await deleteCourseAPI();

//       if (
//         response &&
//         response.data &&
//         response.data.response &&
//         response.data.response.response === true
//       ) {
//         toast.success("Course deleted successfully."); 
//         handleClose(); 
//       } else {
//         toast.error(response?.data?.response?.error_msg || "Unknown error"); 
//       }
//     } catch (error) {
//       console.error("Error deleting course:", error);
//       toast.error("Failed to delete course. Please try again."); 
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header>
//         <Modal.Title>Delete Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
//       <Modal.Footer>
//         <Button className="No-DeleteCourseModal" onClick={handleClose}>
//           No
//         </Button>
//         <Button className="Yes-DeleteCourseModal" onClick={handleDelete}>
//           Yes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DeleteCourseModal;
