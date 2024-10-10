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

  // Simplified checkbox data for container 1 (Restaurant Type)
  const restaurantTypeOptions = [{ label: "Pure-veg" }, { label: "Non-veg" }];

  // Simplified checkbox data for container 2 (Cuisines)
  const cuisinesOptions = [
    { label: "Mexican" },
    { label: "Chinese" },
    { label: "Italian" },
    { label: "French" },
    { label: "American" },
    { label: "Indian" },
    { label: "Japanese" },
    { label: "Thai" },
  ];

  // Divide the cuisines into two arrays: odd-indexed and even-indexed
  const evenCuisines = cuisinesOptions.filter((_, index) => index % 2 === 0);
  const oddCuisines = cuisinesOptions.filter((_, index) => index % 2 !== 0);

  return (
    <div className="container">
      <div className="new-verify-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-head">
            <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} />
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

            {/* Checkbox for Restaurant Type */}
            <div className=" ">
              <div className="row row-restrotype">
                <div className="col-12">
                  <div className="checkbox-container-1">
                    {/* <p className="checkbox-restaurantType">Restaurant Type</p> */}
                    <label htmlFor="address" className="login-label">
                      Restaurant Type
                    </label>
                    <div className="checkbox-container-restaurantType1">
                      {restaurantTypeOptions.map((option, index) => (
                        <label
                          key={index}
                          className="checkbox-label checkbox-label-restaurantcheckbox"
                        >
                          <input type="checkbox" />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Checkbox for Cuisines */}
                <div className="col-12 mt-4">
                  <div className="checkbox-container-2">
                    <label htmlFor="address" className="login-label">
                      Cuisines
                    </label>

                    <div className="row row-restaurantType2">
                      <div className="checkbox-container-restaurantType2">
                        {/* First column for every 1st, 5th, 9th... cuisines */}
                        <div className="col-2 col-md-3">
                          {cuisinesOptions
                            .filter((_, index) => index % 4 === 0) // For indices 0, 4, 8, ...
                            .map((option, index) => (
                              <label
                                key={index}
                                className="checkbox-label checkbox-label-restaurantcheckbox"
                              >
                                <input type="checkbox" />
                                {option.label}
                              </label>
                            ))}
                        </div>

                        {/* Second column for every 2nd, 6th, 10th... cuisines */}
                        <div className="col-2 col-md-3">
                          {cuisinesOptions
                            .filter((_, index) => index % 4 === 1) // For indices 1, 5, 9, ...
                            .map((option, index) => (
                              <label
                                key={index}
                                className="checkbox-label checkbox-label-restaurantcheckbox"
                              >
                                <input type="checkbox" />
                                {option.label}
                              </label>
                            ))}
                        </div>

                        {/* Third column for every 3rd, 7th, 11th... cuisines */}
                        <div className="col-2 col-md-3">
                          {cuisinesOptions
                            .filter((_, index) => index % 4 === 2) // For indices 2, 6, 10, ...
                            .map((option, index) => (
                              <label
                                key={index}
                                className="checkbox-label checkbox-label-restaurantcheckbox"
                              >
                                <input type="checkbox" />
                                {option.label}
                              </label>
                            ))}
                        </div>

                        {/* Fourth column for every 4th, 8th, 12th... cuisines */}
                        <div className="col-2 col-md-3">
                          {cuisinesOptions
                            .filter((_, index) => index % 4 === 3) // For indices 3, 7, 11, ...
                            .map((option, index) => (
                              <label
                                key={index}
                                className="checkbox-label checkbox-label-restaurantcheckbox"
                              >
                                <input type="checkbox" />
                                {option.label}
                              </label>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Next
          </button>

          <p
            className="Rendering-Login-newAccount"
            onClick={handleLoginClick}
            style={{ cursor: "pointer" }}
          >
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
