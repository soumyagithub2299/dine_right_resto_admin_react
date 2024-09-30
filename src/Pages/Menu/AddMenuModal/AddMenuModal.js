import React, { useState } from 'react';
import './AddMenuModal.css';
import { LuImagePlus } from "react-icons/lu";
import { FaCaretDown } from 'react-icons/fa';

const AddMenuModal = ({ isOpen, onClose, onSubmit }) => {
  const [menuType, setMenuType] = useState(""); // State for menu type

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit({
      menuType,
      name: formData.get('name'),
      cost: formData.get('cost'),
      description: formData.get('description'),
    });
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header modal-header-Add-menu">
            <h5 className="modal-title modal-title-Add-menu">Add Menu</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body modal-body-Add-Menu">
            {/* Image Upload Area */}
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
                  fontSize: '24px' // Adjust icon size if necessary
                }}
              >
                <input type="file" accept="image/*" style={{ display: 'none' }} id="imageUpload" />
                <label htmlFor="imageUpload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                  <LuImagePlus />
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="menuType" className='SubHeading-Add-Menu'>Menu Type:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-control"
                    value={menuType}
                    readOnly // Make it read-only to show selected value
                    placeholder="Select Menu Type"
                  />
                  <FaCaretDown style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', pointerEvents: 'none' }} /> {/* Dropdown icon */}
                  <select
                    value={menuType}
                    onChange={(e) => setMenuType(e.target.value)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0, // Make the dropdown invisible but interactive
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    <option value="">Select...</option>
                    <option value="Appetizer">Soup</option>
                    <option value="Main Course">Salad</option>
                    <option value="Dessert">Appetizer</option>
                    <option value="Beverage">MainCourse</option>
                    <option value="Beverage">Dessert</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className='SubHeading-Add-Menu'>Name:</label>
                <input type="text" className="form-control" name="name" placeholder="Name" required /> {/* Added placeholder */}
              </div>
              <div className="form-group">
                <label htmlFor="cost" className='SubHeading-Add-Menu'>Cost:</label>
                <input type="text" className="form-control" name="cost" placeholder="000" required /> {/* Added placeholder */}
              </div>
              <div className="form-group">
                <label htmlFor="description" className='SubHeading-Add-Menu'>Description:</label>
                <textarea className="form-control" name="description" rows="3" required></textarea>
              </div>
              <div className='Main-btn-AddMenuModal'>
                <button type="submit" className="btn-AddMenuModal">Add Menu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;
