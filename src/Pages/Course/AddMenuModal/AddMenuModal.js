import React, { useState } from 'react';
import './AddMenuModal.css';
import { FaCaretDown } from 'react-icons/fa';

const AddMenuModal = ({ isOpen, onClose, onSubmit }) => {
  const [courseType, setCourseType] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ courseType });
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered"> {/* Added modal-dialog-centered */}
        <div className="modal-content">
          <div className="modal-header modal-header-Add-menu">
            <h5 className="modal-title modal-title-Add-menu">Add Course</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body modal-body-Add-Menu">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="courseType" className='SubHeading-Add-Menu'>Course Type Name:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    value={courseType}
                    readOnly
                    placeholder="Select Course Type"
                  />
                  <FaCaretDown style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <select
                    value={courseType}
                    onChange={(e) => setCourseType(e.target.value)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="Course2">Course2</option>
                    <option value="Course3">Course3</option>
                    <option value="Course4">Course4</option>
                    <option value="Course5">Course5</option>
                    <option value="Customize Menu">Customize Course</option>
                  </select>
                </div>
              </div>
              <div className='Main-btn-AddMenuModal'>
                <button type="submit" className="btn-AddMenuModal">Add Course</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;
