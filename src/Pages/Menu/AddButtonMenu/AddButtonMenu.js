import React, { useState } from 'react';
import './AddButtonMenu.css';
import AddMenuModal from '../AddMenuModal/AddMenuModal';

const AddButtonMenu = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSubmit = (menuItem) => {
    // Process the menu item data here
    console.log('New Menu Item:', menuItem);
  };

  return (
    <div className='mb-5'>
      <div className='add-menu-btn'>
        <button type='button' className='AddMenu-Restro-Admin' onClick={toggleModal}>
          +Add Menu
        </button>
      </div>

      <AddMenuModal isOpen={isModalOpen} onClose={toggleModal} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddButtonMenu;
