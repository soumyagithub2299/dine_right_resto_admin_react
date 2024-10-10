import React from "react";
import "../Profile.css";
// import { RiRestaurantFill } from "react-icons/ri";

const RestroDetailsAdmin = () => {
  return (
    <div className="container">
      {/* <div className="heading-Profile mb-4 mt-4">RESTAURANT INFORMATION </div>
      <hr className='hr-menu-accordian'/> */}
      <div className="row">
        {/* section1 */}
        <div className="col-12 col-md-6">
          <div className="SubHeading-Profile mb-2">Restaurant Details :</div>
          <form>
            {/* Restaurant Name Input */}
            <div className="mb-3">
              <label htmlFor="restaurantName" className="form-label">
                Restaurant Name
              </label>
              <input
                type="text"
                className="form-control"
                id="restaurantName"
                placeholder="Enter restaurant name"
                required
              />
            </div>

            {/* Address Input */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Restaurant Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter restaurant address"
                required
              />
            </div>

            {/* Description Input */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                placeholder="Enter restaurant description"
                required
              />
            </div>
          </form>
        </div>

        {/* section2 */}
        <div className="col-12 col-md-6">
          <div className="SubHeading-Profile mb-2">Bank Details :</div>
          <form>
            <div className="mb-3">
              <label htmlFor="fssai" className="form-label">
                Bank Name
              </label>
              <input
                type="text"
                className="form-control"
                id="bank"
                placeholder="Enter your Bank Name"
                required
              />
            </div>

            {/* Account Name Input */}
            <div className="mb-3">
              <label htmlFor="pan" className="form-label">
                Account No
              </label>
              <input
                type="text"
                className="form-control"
                id="account"
                placeholder="Enter your Account number"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                required
              />
            </div>

            {/* IFSC No Input */}
            <div className="mb-3">
              <label htmlFor="gstin" className="form-label">
                IFSC Code
              </label>
              <input
                type="text"
                className="form-control"
                id="ifsc"
                placeholder="Enter your IFSC code"
                pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
                required
              />
            </div>

            {/* Branch Name Input */}
            <div className="mb-3">
              <label htmlFor="fssai" className="form-label">
                Branch Name
              </label>
              <input
                type="text"
                className="form-control"
                id="branch"
                placeholder="Enter your Bank Branch Name"
                required
              />
            </div>
          </form>
        </div>
      </div>
      {/* <hr className="hr-menu-accordian" /> */}
    </div>
  );
};

export default RestroDetailsAdmin;
