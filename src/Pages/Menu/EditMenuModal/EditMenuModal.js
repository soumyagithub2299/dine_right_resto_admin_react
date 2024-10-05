import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { LuImagePlus } from 'react-icons/lu'; // Assuming you're using this icon
import './EditMenuModal.css';

const EditMenuModal = ({ show, handleClose, item, handleSubmit }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [cost, setCost] = useState(item ? item.price : '');
  const [description, setDescription] = useState(item ? item.details : '');
  const [imagePreview, setImagePreview] = useState(item ? item.img : ''); // Initial image if exists

  // Handler for image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form values and image when the modal is closed
  useEffect(() => {
    if (!show) {
      // Reset fields when modal closes
      setName('');
      setCost('');
      setDescription('');
      setImagePreview(''); // Reset image to empty
    } else {
      // Populate with existing item data when the modal opens
      setName(item ? item.name : '');
      setCost(item ? item.price : '');
      setDescription(item ? item.details : '');
      setImagePreview(item ? item.img : ''); // Reset image to original or empty
    }
  }, [show, item]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({
      ...item,
      name,
      price: cost,
      details: description,
      img: imagePreview // Add updated image to the item
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Edit Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Image Upload Section */}
        <div className="d-flex justify-content-center" style={{ marginBottom: '20px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '10px',
              backgroundColor: '#D9D9D9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="imageUpload"
              name="image"
              onChange={handleImageChange}
            />
            <label htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
              {imagePreview ? (
                <img src={imagePreview} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <LuImagePlus />
              )}
            </label>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className='SubHeading-Add-Menu'>Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cost" className='SubHeading-Add-Menu'>Cost:</label>
            <input
              type="text"
              className="form-control"
              name="cost"
              placeholder="000"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className='SubHeading-Add-Menu'>Description:</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="Close-EditMenuModal" onClick={handleClose}>Close</button>
        <button type="submit" className="Update-EditMenuModal" onClick={onSubmit}>Update Menu</button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMenuModal;


// import React, { useState, useEffect } from 'react';
// import { Modal } from 'react-bootstrap';
// import { LuImagePlus } from 'react-icons/lu'; 
// import { toast } from 'react-toastify'; 
// import './EditMenuModal.css';
// import { updateMenuAPI } from '../../../utils/APIs/MenuApis/MenuApi';

// const EditMenuModal = ({ show, handleClose, item, handleSubmit }) => {
//   const [name, setName] = useState(item ? item.name : '');
//   const [cost, setCost] = useState(item ? item.price : '');
//   const [description, setDescription] = useState(item ? item.details : '');
//   const [imagePreview, setImagePreview] = useState(item ? item.img : ''); 

//   // Handler for image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Set image preview
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Reset form values and image when the modal is closed
//   useEffect(() => {
//     if (!show) {
//       // Reset fields when modal closes
//       setName('');
//       setCost('');
//       setDescription('');
//       setImagePreview(''); // Reset image to empty
//     } else {
//       setName(item ? item.name : '');
//       setCost(item ? item.price : '');
//       setDescription(item ? item.details : '');
//       setImagePreview(item ? item.img : ''); // Reset image to original or empty
//     }
//   }, [show, item]);

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     // Validate inputs and show toast errors
//     if (!name.trim()) {
//       toast.error("Please enter a name.");
//       return;
//     }
//     if (!cost.trim() || isNaN(cost)) {
//       toast.error("Please enter a valid cost.");
//       return;
//     }
//     if (!description.trim()) {
//       toast.error("Please enter a description.");
//       return;
//     }

//     const updatedData = {
//       id: item.id, // Assuming you're using `id` to identify the item to update
//       name,
//       price: cost,
//       details: description,
//       img: imagePreview
//     };

//     try {
//       const response = await updateMenuAPI(updatedData); //api call

//       if (
//         response &&
//         response?.data &&
//         response?.data?.response &&
//         response?.data?.response?.response === true &&
//         response?.data?.response?.data
//       ) {
//         toast.success(
//           response?.data?.response?.success_msg || "Menu updated successfully."
//         );
//         handleClose();
//         handleSubmit(updatedData); // Call handleSubmit with updated data
//       } else {
//         console.error("Error updating menu:", response?.data?.error_msg || "Unknown error");
//         toast.error(response?.data?.response?.error_msg || "Unknown Error.");
//       }
//     } catch (error) {
//       console.error("Error updating menu:", error);
//       toast.error("Error updating menu.");
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header>
//         <Modal.Title>Edit Menu</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {/* Image Upload Section */}
//         <div className="d-flex justify-content-center" style={{ marginBottom: '20px' }}>
//           <div
//             style={{
//               width: '100px',
//               height: '100px',
//               borderRadius: '10px',
//               backgroundColor: '#D9D9D9',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               fontSize: '24px',
//               position: 'relative',
//               overflow: 'hidden'
//             }}
//           >
//             <input
//               type="file"
//               accept="image/*"
//               style={{ display: 'none' }}
//               id="imageUpload"
//               name="image"
//               onChange={handleImageChange}
//             />
//             <label htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
//               {imagePreview ? (
//                 <img src={imagePreview} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               ) : (
//                 <LuImagePlus />
//               )}
//             </label>
//           </div>
//         </div>

//         {/* Form Section */}
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <label htmlFor="name" className='SubHeading-Add-Menu'>Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="cost" className='SubHeading-Add-Menu'>Cost:</label>
//             <input
//               type="text"
//               className="form-control"
//               name="cost"
//               placeholder="000"
//               value={cost}
//               onChange={(e) => setCost(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description" className='SubHeading-Add-Menu'>Description:</label>
//             <textarea
//               className="form-control"
//               name="description"
//               rows="3"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//         </form>
//       </Modal.Body>
//       <Modal.Footer>
//         <button className="Close-EditMenuModal" onClick={handleClose}>Close</button>
//         <button type="submit" className="Update-EditMenuModal" onClick={onSubmit}>Update Menu</button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EditMenuModal;
