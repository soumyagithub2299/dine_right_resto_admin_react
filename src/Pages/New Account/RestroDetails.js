import React, {useState} from 'react';
import { FaAngleLeft } from "react-icons/fa6";

const RestroDetails = ({ handleNext }) => {
    const [restroname, setRestroname] = useState('');
    const [address, setAddress] = useState('');

    const handleFormSubmit = (e) => {
      e.preventDefault();
      handleNext(); 
    };
    
  return (
    <div>
      <div className="new-verify-form">
                <form className="login-form" onSubmit={handleFormSubmit}>
                    <h2 className='login-head'>
                    <FaAngleLeft /> 
                    Add restaurant details
                    </h2>
                    <label htmlFor="restro-name" className='login-label'>Restaurant Name</label>
                    <input
                        type="text"
                        id="restro-name"
                        className='login-input'
                        value={restroname}
                        onChange={(e) => setRestroname(e.target.value)}
                        required
                    />
                    <label htmlFor="address" className='login-label'>Restaurant Address</label>
                    <input
                        type="text"
                        id="address"
                        className='login-input'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <button type="submit" className='login-btn'>Next</button>

                </form>
            </div>
    </div>
  )
}

export default RestroDetails
