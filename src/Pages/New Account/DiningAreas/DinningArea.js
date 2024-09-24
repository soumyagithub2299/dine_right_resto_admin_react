import React, { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa'; 
import { MdOutlineCancel } from "react-icons/md";
import './DinningArea.css'; 

const DinningArea = ({ handleNext, handleBack }) => { // Added handleBack prop
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([
    'Indoor',
    'Outdoor',
    'Terrace',
    'Private Dining',
    'Outdoor Courtyard',
    'Outdoor (Smoking)',
    'Indoor Bar Area',
    'Outdoor Under Canopy',
    'Bar Area',
    'Main Dining',
    'Pool Side'
  ]);
  const [hoveredArea, setHoveredArea] = useState("");

  const handleAreaClick = (area) => {
    if (!selectedAreas.includes(area)) {
      setSelectedAreas([...selectedAreas, area]); 
      setAvailableAreas(availableAreas.filter(availableArea => availableArea !== area));
    }
  };

  const handleAreaRemove = (area) => {
    setSelectedAreas(selectedAreas.filter(selectedArea => selectedArea !== area));
    setAvailableAreas([...availableAreas, area]); // Add the removed area back to the available areas
  };

  const handleAreaHover = (area) => {
    setHoveredArea(area);
  };

  const handleBackClick = () => {
    handleBack(); // Navigate back to the previous step
  };

  return (
    <div className='new-verify-form'>
      <div className='verify-form-container'>
        <h2 className='login-head'>
          <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} /> {/* Updated back icon */}
          Dining Areas
        </h2>
        <div className='selected-container'>
          <p className='selected-txt'>
            Add a minimum of 1 dining area. Once you finish creating 
            your account, you will be able to add, remove or rename dining areas in settings.
          </p>
          <ul className='selected-areas'>
            {selectedAreas.map((area) => (
              <li key={area} className='select-list-item'>
                {typeof area === 'string' ? area : 'Invalid Area'}
                <MdOutlineCancel  
                  onClick={() => handleAreaRemove(area)} 
                  className='remove-icon' 
                />
              </li>
            ))}
          </ul>
        </div>
        <div className='available-container'>
          <h3>Available Dining Areas</h3>
          <ul className='available-areas'>
            {availableAreas.map((area) => (
              <li
                key={area}
                onMouseEnter={() => handleAreaHover(area)}
                onMouseLeave={() => setHoveredArea(null)}
                className='list-item'
              >
                {area}
                <button
                  onClick={() => handleAreaClick(area)}
                  className='add-button'
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedAreas.length > 0 && (
          <div className="service-button">
            <button className='confirm-button' onClick={handleNext}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinningArea;
