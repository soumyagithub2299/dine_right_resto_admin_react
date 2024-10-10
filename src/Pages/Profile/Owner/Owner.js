import React, { useState } from "react";
import '../Profile.css';
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Owner = () => {
  // State to track if the account is approved
  const [isApproved, setIsApproved] = useState(false); // Change to true if the account is approved

  return (
    <>
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
    <div className='container container-savebtn'>
        <button className='SaveBtn'>Update Information</button>
    </div>
    </>
  );
};

export default Owner;
  


// import React, { useState } from "react";
// import '../Profile.css';
// import { IoMdCheckmark } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";
// import { ProfileEditAPI } from "../../../utils/APIs/ProfileApis/ProfileApi";
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';

// const Owner = () => {
//   // State to track if the account is approved
//   const [isApproved, setIsApproved] = useState(false); 
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     pan: "",
//     gstin: "",
//     fssai: "",
//     restaurantName: "",
//     address: "",
//     description: "",
//     bank: "",
//     account: "",
//     ifsc: "",
//     branch: ""
//   });

//   // Function to handle form field changes
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   // Function to validate input fields
//   const validateForm = () => {
//     const { name, mobile, email, pan, gstin, fssai, restaurantName, address, bank, account, ifsc, branch } = formData;
//     if (!name || !mobile || !email || !pan || !gstin || !fssai || !restaurantName || !address || !bank || !account || !ifsc || !branch) {
//       toast.error("All fields are required.");
//       return false;
//     }
//     if (!/^[0-9]{10}$/.test(mobile)) {
//       toast.error("Please enter a valid 10-digit mobile number.");
//       return false;
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) {
//       toast.error("Please enter a valid email address.");
//       return false;
//     }
//     if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan)) {
//       toast.error("Please enter a valid PAN number.");
//       return false;
//     }
//     if (!/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(gstin)) {
//       toast.error("Please enter a valid GSTIN number.");
//       return false;
//     }
//     return true;
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form before submitting
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await ProfileEditAPI(formData); // Sending formData as raw JSON
//       if (response.status === 200) {
//         toast.success("Information updated successfully!");
//       } else {
//         toast.error("Failed to update information.");
//       }
//     } catch (error) {
//       toast.error("Error updating information.");
//     }
//   };

//   return (
//     <>
//       <div className="container">
//         <ToastContainer />
//         <div className="MainInfo-Owner">
//           <div className="heading-Profile">PERSONAL INFORMATION</div>
//           <div className="CommisionField-Owner">Commission to DineRight-25%</div>

//           {/* Conditionally render based on approval status */}
//           {isApproved ? (
//             <div className="Approved-Owner">
//               <IoMdCheckmark /> Approved
//             </div>
//           ) : (
//             <div className="Unapproved-Owner">
//               <IoMdClose /> Unapproved
//             </div>
//           )}
//         </div>
//         <hr className="hr-menu-accordian" />

//         <div className="row">
//           <div className="col-12 col-md-6">
//             <div className="SubHeading-Profile mb-2">Personal Details :</div>
//             <form>
//               {/* Name Input */}
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   placeholder="Enter your name"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* Mobile Number Input */}
//               <div className="mb-3">
//                 <label htmlFor="mobile" className="form-label">Mobile No</label>
//                 <input
//                   type="tel"
//                   className="form-control"
//                   id="mobile"
//                   placeholder="Enter your mobile number"
//                   onChange={handleInputChange}
//                   pattern="[0-9]{10}"
//                   required
//                 />
//               </div>

//               {/* Email Input */}
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   placeholder="Enter your email address"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Documentation Section */}
//           <div className="col-12 col-md-6">
//             <div className="SubHeading-Profile mb-2">Documentation :</div>
//             <form>
//               {/* PAN Card No Input */}
//               <div className="mb-3">
//                 <label htmlFor="pan" className="form-label">PAN Card No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="pan"
//                   placeholder="Enter your PAN card number"
//                   onChange={handleInputChange}
//                   pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
//                   required
//                 />
//               </div>

//               {/* GSTIN License No Input */}
//               <div className="mb-3">
//                 <label htmlFor="gstin" className="form-label">GSTIN License No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="gstin"
//                   placeholder="Enter your GSTIN license number"
//                   onChange={handleInputChange}
//                   pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
//                   required
//                 />
//               </div>

//               {/* FSSAI License No Input */}
//               <div className="mb-3">
//                 <label htmlFor="fssai" className="form-label">FSSAI License No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="fssai"
//                   placeholder="Enter your FSSAI license number"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Restaurant and Bank Details */}
//       <div className="container">
//         <div className="row">
//           <div className="col-12 col-md-6">
//             <div className="SubHeading-Profile mb-2">Restaurant Details :</div>
//             <form>
//               {/* Restaurant Name Input */}
//               <div className="mb-3">
//                 <label htmlFor="restaurantName" className="form-label">Restaurant Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="restaurantName"
//                   placeholder="Enter restaurant name"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* Address Input */}
//               <div className="mb-3">
//                 <label htmlFor="address" className="form-label">Restaurant Address</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="address"
//                   placeholder="Enter restaurant address"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* Description Input */}
//               <div className="mb-3">
//                 <label htmlFor="description" className="form-label">Description</label>
//                 <textarea
//                   className="form-control"
//                   id="description"
//                   rows="5"
//                   placeholder="Enter restaurant description"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Bank Details */}
//           <div className="col-12 col-md-6">
//             <div className="SubHeading-Profile mb-2">Bank Details :</div>
//             <form>
//               {/* Bank Name Input */}
//               <div className="mb-3">
//                 <label htmlFor="bank" className="form-label">Bank Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="bank"
//                   placeholder="Enter your Bank Name"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* Account No Input */}
//               <div className="mb-3">
//                 <label htmlFor="account" className="form-label">Account No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="account"
//                   placeholder="Enter your Account number"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* IFSC Code Input */}
//               <div className="mb-3">
//                 <label htmlFor="ifsc" className="form-label">IFSC Code</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="ifsc"
//                   placeholder="Enter your IFSC code"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               {/* Branch Name Input */}
//               <div className="mb-3">
//                 <label htmlFor="branch" className="form-label">Branch Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="branch"
//                   placeholder="Enter your Bank Branch Name"
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Update Information Button */}
//       <div className="container container-savebtn">
//         <button className="SaveBtn" onClick={handleSubmit}>Update Information</button>
//       </div>
//     </>
//   );
// };

// export default Owner;
