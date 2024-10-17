import React, { useState } from 'react';
import './ServiceHours.css';
import ServiceHourModal from '../ServiceHourModal/ServiceHourModal';

const ServiceHours = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleNext = () => {
    // Logic for what happens on next
    console.log('Next step');
  };

  const handleBack = () => {
    // Logic for what happens on back
    console.log('Back step');
  };

  return (
   <div className='container'>
       <p className="Heading-RestroBackgroundImg">Update Service Hours : </p>
       <div className='container container-ServiceHours-Uplod mb-5'>
      <button className='btn-ServiceHours-Uplod' onClick={handleShow}>
       Open
      </button>

      {/* Render the modal */}
      <ServiceHourModal 
        show={showModal} 
        handleClose={handleClose} 
        handleNext={handleNext} 
        handleBack={handleBack} 
      />
    </div>
    </div>
  );
};

export default ServiceHours;
