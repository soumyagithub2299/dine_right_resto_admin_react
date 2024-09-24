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
