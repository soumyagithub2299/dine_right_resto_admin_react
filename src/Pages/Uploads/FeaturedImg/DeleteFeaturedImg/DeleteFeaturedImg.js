// DeleteFeaturedImg.js
import React from 'react';
import './DeleteFeaturedImg.css'; // Create a separate CSS file for styles

const DeleteFeaturedImg = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete the last image?</h3>
        <div className="modal-buttons">
          <button onClick={onDelete}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFeaturedImg;
