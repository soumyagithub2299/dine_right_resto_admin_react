import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import "./RestroDetails.css";

const RestroDetails = ({ handleNext, handleBack }) => {  // Receive handleBack as a prop
  const [restroname, setRestroname] = useState("");
  const [address, setAddress] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <div>
      <div className="new-verify-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-head">
            <FaAngleLeft
              onClick={handleBack}  // Use handleBack for going back to previous step
              style={{ cursor: 'pointer' }}
            />
            Add restaurant details
          </h2>
          <label htmlFor="restro-name" className="login-label">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restro-name"
            className="login-input"
            value={restroname}
            onChange={(e) => setRestroname(e.target.value)}
            required
          />
          <label htmlFor="address" className="login-label">
            Restaurant Address
          </label>
          <div className="address-map-container">
            <input
              type="text"
              id="address"
              className="login-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {/* <div className="map-container">
              <iframe
                title="Restaurant Location"
                src="https://maps.google.com/maps?q=Melbourne&t=&z=13&ie=UTF8&iwloc=&output=embed"
                allowFullScreen=""
                loading="lazy"
                width="100%"
                height="150"
                style={{ border: 0 }}
              ></iframe>
            </div> */}
          </div>
          <button type="submit" className="login-btn">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestroDetails;
