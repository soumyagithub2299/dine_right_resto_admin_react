import React from 'react';
import './BookingPeriod.css';

const BookingPeriod = () => {
  return (
    <div className='container mb-3'>
      <div className='row row-bookingPeriod'>
        <div col-12 col-md-6>
        <div className='container'>
        <div className='SubHeading-Profile mb-2'>Booking Period :</div>
        
        <div className='flex-bookingPeriod-btn'>
          <button className='btn-bookingPeriod'>On Time</button>
          <button className='btn-bookingPeriod'>15 Min</button>
          <button className='btn-bookingPeriod'>1 Hour</button>
          <button className='btn-bookingPeriod'>2 Hours</button>
          <button className='btn-bookingPeriod'>5 Hours</button>
          <button className='btn-bookingPeriod'>1 Day</button>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPeriod;
