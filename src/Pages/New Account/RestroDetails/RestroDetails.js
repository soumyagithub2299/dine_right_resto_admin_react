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


// import React, { useState } from "react";
// import { FaAngleLeft } from "react-icons/fa6";
// import "./RestroDetails.css";
// import { SignUpRestroDetailsStepTwo } from "../../../utils/APIs/credentialsApis";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const RestroDetails = ({ handleNext, handleBack }) => {
//   const [restroname, setRestroname] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false); // State for internal loading management

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Validate all fields
//     if (!restroname || !address) {
//       if (!restroname) {
//         toast.error("Please enter the restaurant name.");
//       }
//       if (!address) {
//         toast.error("Please enter the restaurant address.");
//       }
//       return; 
//     }

//     try {
//       setLoading(true); // Set loading state to true
// ;

//       const data = {
//         restaurantName: restroname,
//         restaurantAddress: address,
//       };

//       const response = await SignUpRestroDetailsStepTwo(data);

//       // Handle response accordingly
//       if (
//         response &&
//         response.status === 200 &&
//         response.data &&
//         response.data.response === true
//       ) {
//         // Clear form fields
//         setRestroname("");
//         setAddress("");
//         toast.success("Restaurant details submitted successfully.");
//         handleNext(); // Proceed to the next step
//       } else {
//         console.error(
//           "Error submitting restaurant details:",
//           response?.data?.error_msg || "Unknown error"
//         );
//         toast.error(
//           response?.data?.error_msg || "Failed to submit details. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting restaurant details:", error);
//       toast.error("An error occurred while submitting details.");
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div>
//       <ToastContainer /> {/* Place the ToastContainer here */}
//       <div className="new-verify-form">
//         <form className="login-form" onSubmit={handleFormSubmit}>
//           <h2 className="login-head">
//             <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} />
//             Add restaurant details
//           </h2>
//           <label htmlFor="restro-name" className="login-label">
//             Restaurant Name
//           </label>
//           <input
//             type="text"
//             id="restro-name"
//             className="login-input"
//             value={restroname}
//             onChange={(e) => setRestroname(e.target.value)}
//             required
//           />
//           <label htmlFor="address" className="login-label">
//             Restaurant Address
//           </label>
//           <div className="address-map-container">
//             <input
//               type="text"
//               id="address"
//               className="login-input"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="login-btn" disabled={loading}>
//             Next
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RestroDetails;
