import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMenuDashboard.css';

const AddMenuDashboard = () => {
  const navigate = useNavigate();

  const handleAddMenuClick = () => {
    navigate('/menu');
  };

  return (
    <div className='container container_AddMenu_Dashboard'>
      <div className='box_AddMenu_Dashboard'>
        <div className='cookimg_AddMenu_Dashboard'>
          <img className='cookpic_AddMenu_Dashboard' src='./assets/images/Dashboard/Cook.png' alt='' />
        </div>
        <div className='text_AddMenu_Dashboard'>
          Organize your menus through button below
        </div>
        <div className='buttonContainer_AddMenu_Dashboard'>
          <button className='btn_AddMenu_Dashboard' onClick={handleAddMenuClick}>
            + Add Menus
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuDashboard;
