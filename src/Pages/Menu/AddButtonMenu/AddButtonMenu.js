import React, { useState } from "react";
import "./AddButtonMenu.css";
import AddMenuModal from "../AddMenuModal/AddMenuModal";

const AddButtonMenu = ({ handleGetAllData,handleGetBavergaesAllData }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="mb-3">


<div
  className="add-menu-btn"
  style={{
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <button
    type="button"
    className="AddMenu-Restro-Admin"
    onClick={toggleModal}
    style={{
      width: '155px',
      height: '43px',
      backgroundColor: '#4F46E5', /* Original background color */
      borderRadius: '10px',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: '22px',
      color: '#FFFFFF', /* Original text color */
      position: 'relative',
      right: '10px',
      transition: 'background-color 0.1s ease, color 0.1s ease', /* Smooth transition for background and text color */
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = '#4338CA'; /* Darker shade for hover background */
      e.currentTarget.style.color = '#FFDD57'; /* Change text color on hover */
      e.currentTarget.style.cursor = 'pointer'; /* Change cursor to pointer on hover */
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = '#4F46E5'; /* Reset to original background color */
      e.currentTarget.style.color = '#FFFFFF'; /* Reset to original text color */
    }}
  >
  <div>
  <span style={{ fontSize: "1.2rem", marginRight: "5px" }}>+</span>
  Add Menu Item
</div>

  </button>
</div>




      {isModalOpen && (
        <AddMenuModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          handleGetAllData={handleGetAllData}
          handleGetBavergaesAllData={handleGetBavergaesAllData}
        />
      )}
    </div>
  );
};

export default AddButtonMenu;
