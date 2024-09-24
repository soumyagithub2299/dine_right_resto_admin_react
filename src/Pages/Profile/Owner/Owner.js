import React, { useState } from "react";
import '../Profile.css';
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Owner = () => {
  // State to track if the account is approved
  const [isApproved, setIsApproved] = useState(false); // Change to true if the account is approved

  return (
    <div className="container">
      <div className="MainInfo-Owner">
        <div className="heading-Profile">PERSONAL INFORMATION</div>
        <div className="CommisionField-Owner">Commission to DineRight-25%</div>
        
        {/* Conditionally render based on approval status */}
        {isApproved ? (
          <div className="Approved-Owner">
            <IoMdCheckmark /> Approved
          </div>
        ) : (
          <div className="Unapproved-Owner">
            <IoMdClose /> Unapproved
          </div>
        )}
      </div>
      <hr className='hr-menu-accordian' />

      <div className="row">
        <div className="col-12 col-md-6">
          <div className='SubHeading-Profile mb-2'>Personal Details :</div>
          <form>
            {/* Name Input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Mobile Number Input */}
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile No
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </form>
        </div>

        {/* section2 */}
        <div className="col-12 col-md-6">
          <div className='SubHeading-Profile mb-2'>Documentation :</div>
          <form>
            {/* PAN Card No Input */}
            <div className="mb-3">
              <label htmlFor="pan" className="form-label">
                PAN Card No
              </label>
              <input
                type="text"
                className="form-control"
                id="pan"
                placeholder="Enter your PAN card number"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                required
              />
            </div>

            {/* GSTIN License No Input */}
            <div className="mb-3">
              <label htmlFor="gstin" className="form-label">
                GSTIN License No
              </label>
              <input
                type="text"
                className="form-control"
                id="gstin"
                placeholder="Enter your GSTIN license number"
                pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
                required
              />
            </div>

            {/* FSSAI License No Input */}
            <div className="mb-3">
              <label htmlFor="fssai" className="form-label">
                FSSAI License No
              </label>
              <input
                type="text"
                className="form-control"
                id="fssai"
                placeholder="Enter your FSSAI license number"
                required
              />
            </div>
          </form>
        </div>
      </div>
      {/* <hr className='hr-menu-accordian'/> */}
    </div>
  );
};

export default Owner;
