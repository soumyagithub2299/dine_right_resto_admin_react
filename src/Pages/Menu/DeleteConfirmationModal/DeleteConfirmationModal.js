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
  


// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { toast } from 'react-toastify'; 
// import './DeleteConfirmationModal.css';
// import { deleteMenuAPI } from '../../../utils/APIs/MenuApis/MenuApi';

// const DeleteConfirmationModal = ({ show, handleClose, handleDelete, menuItemId }) => {
//   const [loading, setLoading] = useState(false);

//   const handleDeleteItem = async () => {
//     try {
//       setLoading(true);

//       // Call the API to delete the menu item
//       const response = await deleteMenuAPI(menuItemId);

//       setLoading(false);

      
//       if (response && response.status === 200) {
//         toast.success('Menu item deleted successfully.');
//         handleDelete(); // Call the delete callback to handle further actions like refreshing data
//       } else {
//         toast.error(response?.data?.error || 'Failed to delete menu item.');
//       }

//     } catch (error) {
//       setLoading(false);
//       console.error('Error deleting menu item:', error);
//       toast.error('An error occurred while deleting the menu item.');
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Delete Menu Item</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {loading ? 'Deleting...' : 'Are you sure you want to delete this menu item?'}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           className='Cancel-DeleteConfirmationModal'
//           onClick={handleClose}
//           disabled={loading} // Disable button during loading
//         >
//           No
//         </Button>
//         <Button
//           className='Save-DeleteConfirmationModal'
//           onClick={handleDeleteItem}
//           disabled={loading} // Disable button during loading
//         >
//           Yes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DeleteConfirmationModal;
