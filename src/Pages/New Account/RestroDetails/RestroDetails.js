import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";  
import "./RestroDetails.css";

const RestroDetails = ({ handleNext, handleBack }) => {
  const [restroname, setRestroname] = useState("");
  const [address, setAddress] = useState("");
  
  const navigate = useNavigate(); 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleLoginClick = () => {
    navigate("/");  
  };

  return (
    <div>
      <div className="new-verify-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-head">
            <FaAngleLeft
              onClick={handleBack}  
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

          <p className="Rendering-Login-newAccount" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default RestroDetails;


          

// import React, { useState } from "react";
// import { FaAngleLeft } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom"; 
// import { toast } from "react-toastify";  
// import 'react-toastify/dist/ReactToastify.css';  
// import { SignUpRestroDetailsStepTwo } from '../../../utils/APIs/credentialsApis';  
// import "./RestroDetails.css";
// import axios from "axios";

// const RestroDetails = ({ handleNext, handleBack }) => {
//   const [restroname, setRestroname] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);  
  
//   const navigate = useNavigate();

//   // Function to handle form submission and API call
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
    
//     const Data = {
//       restroname,
//       address,
//     };

//     console.log('Submitting data:', Data); 

//     // Validate input fields
//     if (!restroname) {
//       toast.error("Please enter a restaurant name.");
//       return;
//     }
//     if (!address) {
//       toast.error("Please enter a restaurant address.");
//       return;
//     }

//     try {
//       setLoading(true);  
//       // const response = await SignUpRestroDetailsStepTwo(Data);  
//       // console.log('API response:', response); 
//       const response = await axios.post(
//         "https://dineright.techfluxsolutions.com/api/auth/step-two",
//          Data
//        );

//       setLoading(false);  

//       if (
//         response &&
//         response.data &&
//         response.data.response &&
//         response.data.response.response === true
//       ) {
//         toast.success("Restaurant details added successfully!");
//         handleNext();  
//       } else {
//         toast.error("Failed to add restaurant details. Please try again.");
//       }
//     } catch (error) {
//       setLoading(false);  
//       console.error('Error during API call:', error); // Enhanced logging
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const handleLoginClick = () => {
//     navigate("/"); 
//   };

//   return (
//     <div>
//       <div className="new-verify-form">
//         <form className="login-form" onSubmit={handleFormSubmit}>
//           <h2 className="login-head">
//             <FaAngleLeft
//               onClick={handleBack}
//               style={{ cursor: "pointer" }}
//             />
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

//             {/* Uncomment this section to display a Google Maps iframe
//             <div className="map-container">
//               <iframe
//                 title="Restaurant Location"
//                 src="https://maps.google.com/maps?q=Melbourne&t=&z=13&ie=UTF8&iwloc=&output=embed"
//                 allowFullScreen=""
//                 loading="lazy"
//                 width="100%"
//                 height="150"
//                 style={{ border: 0 }}
//               ></iframe>
//             </div>
//             */}
//           </div>

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Loading..." : "Next"}
//           </button>

//           <p
//             className="Rendering-Login-newAccount"
//             onClick={handleLoginClick}
//             style={{ cursor: "pointer" }}
//           >
//             Already have an account? Login
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RestroDetails;
