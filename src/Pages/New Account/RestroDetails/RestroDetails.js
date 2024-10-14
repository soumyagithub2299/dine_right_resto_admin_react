// import React, { useState } from "react";
// import { FaAngleLeft } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import "./RestroDetails.css";

// const RestroDetails = ({ handleNext, handleBack }) => {
//   const [restroname, setRestroname] = useState("");
//   const [address, setAddress] = useState("");

//   const navigate = useNavigate();

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     handleNext();
//   };

//   const handleLoginClick = () => {
//     navigate("/");
//   };

//   // Simplified checkbox data for container 1 (Restaurant Type)
//   const restaurantTypeOptions = [{ label: "Pure-veg" }, { label: "Non-veg" }];

//   // Simplified checkbox data for container 2 (Cuisines)
//   const cuisinesOptions = [
//     { label: "Mexican" },
//     { label: "Chinese" },
//     { label: "Italian" },
//     { label: "French" },
//     { label: "American" },
//     { label: "Indian" },
//     { label: "Japanese" },
//     { label: "Thai" },
//   ];

//   // Divide the cuisines into two arrays: odd-indexed and even-indexed
//   const evenCuisines = cuisinesOptions.filter((_, index) => index % 2 === 0);
//   const oddCuisines = cuisinesOptions.filter((_, index) => index % 2 !== 0);

//   return (
//     <div className="container">
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

//             {/* Checkbox for Restaurant Type */}
//             <div className=" ">
//               <div className="row row-restrotype">
//                 <div className="col-12">
//                   <div className="checkbox-container-1">
//                     {/* <p className="checkbox-restaurantType">Restaurant Type</p> */}
//                     <label htmlFor="address" className="login-label">
//                       Restaurant Type
//                     </label>
//                     <div className="checkbox-container-restaurantType1">
//                       {restaurantTypeOptions.map((option, index) => (
//                         <label
//                           key={index}
//                           className="checkbox-label checkbox-label-restaurantcheckbox"
//                         >
//                           <input type="checkbox" />
//                           {option.label}
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Checkbox for Cuisines */}
//                 <div className="col-12 mt-4">
//                   <div className="checkbox-container-2">
//                     <label htmlFor="address" className="login-label">
//                       Cuisines
//                     </label>

//                     <div className="row row-restaurantType2">
//                       <div className="checkbox-container-restaurantType2">
//                         {/* First column for every 1st, 5th, 9th... cuisines */}
//                         <div className="col-2 col-md-3">
//                           {cuisinesOptions
//                             .filter((_, index) => index % 4 === 0) // For indices 0, 4, 8, ...
//                             .map((option, index) => (
//                               <label
//                                 key={index}
//                                 className="checkbox-label checkbox-label-restaurantcheckbox"
//                               >
//                                 <input type="checkbox" />
//                                 {option.label}
//                               </label>
//                             ))}
//                         </div>

//                         {/* Second column for every 2nd, 6th, 10th... cuisines */}
//                         <div className="col-2 col-md-3">
//                           {cuisinesOptions
//                             .filter((_, index) => index % 4 === 1) // For indices 1, 5, 9, ...
//                             .map((option, index) => (
//                               <label
//                                 key={index}
//                                 className="checkbox-label checkbox-label-restaurantcheckbox"
//                               >
//                                 <input type="checkbox" />
//                                 {option.label}
//                               </label>
//                             ))}
//                         </div>

//                         {/* Third column for every 3rd, 7th, 11th... cuisines */}
//                         <div className="col-2 col-md-3">
//                           {cuisinesOptions
//                             .filter((_, index) => index % 4 === 2) // For indices 2, 6, 10, ...
//                             .map((option, index) => (
//                               <label
//                                 key={index}
//                                 className="checkbox-label checkbox-label-restaurantcheckbox"
//                               >
//                                 <input type="checkbox" />
//                                 {option.label}
//                               </label>
//                             ))}
//                         </div>

//                         {/* Fourth column for every 4th, 8th, 12th... cuisines */}
//                         <div className="col-2 col-md-3">
//                           {cuisinesOptions
//                             .filter((_, index) => index % 4 === 3) // For indices 3, 7, 11, ...
//                             .map((option, index) => (
//                               <label
//                                 key={index}
//                                 className="checkbox-label checkbox-label-restaurantcheckbox"
//                               >
//                                 <input type="checkbox" />
//                                 {option.label}
//                               </label>
//                             ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button type="submit" className="login-btn">
//             Next
//           </button>

//           <p
//             className="Rendering-Login-newAccount"
//             onClick={handleLoginClick}
//             style={{ cursor: "pointer",textAlign: "center" }}
//           >
//             Already have an account? Login
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RestroDetails;

import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./RestroDetails.css";
import Loader from "../../../../src/Loader/Loader/Loader";

const RestroDetails = ({ handleNext, handleBack, userId }) => {
  const [restroname, setRestroname] = useState("");
  const [address, setAddress] = useState(""); // For the restaurant address
  const [restaurantLocation, setRestaurantLocation] = useState(""); // New state for location
  const [restaurantLocations, setRestaurantLocations] = useState([]); // State for dynamic restaurant locations
  const [restaurantTypeOptions, setRestaurantTypeOptions] = useState([]);
  const [cuisinesOptions, setCuisinesOptions] = useState([]);
  const [selectedRestaurantTypes, setSelectedRestaurantTypes] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRestroId, setUserRestroId] = useState();
  const [logo, setLogo] = useState(null); // For storing selected logo image
  console.log("RestroDetails", userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantTypes = async () => {
      try {
        const response = await axios.get(
          "https://dineright.techfluxsolutions.com/api/auth/getRestaurantType"
        );
        console.log("restro details", response.data.data);
        setRestaurantTypeOptions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching restaurant types:", error);
        setRestaurantTypeOptions([]);
      }
    };

    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          "https://dineright.techfluxsolutions.com/api/auth/getCuisines"
        );
        console.log("cuisine details", response.data.data);
        setCuisinesOptions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setCuisinesOptions([]);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://dineright.techfluxsolutions.com/api/auth/getAllCities"
        );
        console.log("location details", response.data.diningAreas);
        setRestaurantLocations(response.data.diningAreas || []);
      } catch (error) {
        console.error("Error fetching restaurant locations:", error);
        setRestaurantLocations([]);
      }
    };

    fetchRestaurantTypes();
    fetchCuisines();
    fetchLocations();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      restaurantName: restroname,
      restaurantAddress: address,
      restaurant_type_id:restaurantLocation, 
      restaurant_type_id: selectedRestaurantTypes,
      cuisine_id: selectedCuisines,
      userId: userId,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "https://dineright.techfluxsolutions.com/api/auth/stepTwoAndSendOtp",
        postData
      );
      setLoading(false);

      if (response.data.response === true) {
        toast.success(
          response.data.success_msg ||
            "Restaurant details submitted successfully!"
        );
        console.log("get user Id", response?.data?.id);
        const newUserId = response.data.id;
        setUserRestroId(newUserId);

        handleNext({ userId: newUserId });
      } else {
        toast.error(
          response.data.error_msg ||
            "Restaurant details submission failed. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred during restaurant details submission. Please try again later."
      );
    }
  };

  const handleRestaurantTypeChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedRestaurantTypes([...selectedRestaurantTypes, value]);
    } else {
      setSelectedRestaurantTypes(
        selectedRestaurantTypes.filter((type) => type !== value)
      );
    }
  };

  const handleCuisineChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedCuisines([...selectedCuisines, value]);
    } else {
      setSelectedCuisines(
        selectedCuisines.filter((cuisine) => cuisine !== value)
      );
    }
  };

  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setLogo(URL.createObjectURL(file));
  //   }
  // };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container">
        <div className="new-verify-form">
          <form className="login-form" onSubmit={handleFormSubmit}>
            <h2 className="login-head">
              <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} />
              Add restaurant details
            </h2>

            {/* Circular Image Input for Logo */}
            {/* <div className="image-upload-container">
              <label htmlFor="logo-upload" className="image-upload-label">
                <div className="circular-input">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Restaurant Logo"
                      className="uploaded-logo"
                    />
                  ) : (
                    <FaPlus className="plus-icon" />
                  )}
                </div>
              </label>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleLogoChange}
              />
              <label className="login-label">Restaurant logo</label>
            </div> */}

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
            <input
              type="text"
              id="address"
              className="login-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label htmlFor="restaurant-location" className="login-label">
              Restaurant Location
            </label>
            <select
              id="restaurant-location"
              className="login-input"
              value={restaurantLocation}
              onChange={(e) => setRestaurantLocation(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              {restaurantLocations.map((location) => (
                <option key={location.city_id} value={location.city_id}>
                  {location.city_name} {/* Display the city name */}
                </option>
              ))}
            </select>

            <div className="">
              <div className="row row-restrotype">
                <div className="col-12">
                  <div className="checkbox-container-1">
                    <label htmlFor="restaurant-type" className="login-label">
                      Restaurant Type
                    </label>
                    <div className="checkbox-container-restaurantType1">
                      {restaurantTypeOptions.length > 0 ? (
                        restaurantTypeOptions.map((option, index) => (
                          <label
                            key={index}
                            className="checkbox-label checkbox-label-restaurantcheckbox"
                          >
                            <input
                              type="checkbox"
                              value={option.restaurant_type_id}
                              onChange={handleRestaurantTypeChange}
                            />
                            {option.restaurant_type_name}
                          </label>
                        ))
                      ) : (
                        <p>No restaurant types available.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <div className="checkbox-container-2">
                    <label htmlFor="cuisines" className="login-label">
                      Cuisines
                    </label>

                    <div className="row row-restaurantType2">
                      <div className="checkbox-container-restaurantType2">
                        {cuisinesOptions.length > 0 ? (
                          <>
                            <div className="col-2 col-md-3">
                              {cuisinesOptions
                                .filter((_, index) => index % 4 === 0)
                                .map((option, index) => (
                                  <label
                                    key={index}
                                    className="checkbox-label checkbox-label-restaurantcheckbox"
                                  >
                                    <input
                                      type="checkbox"
                                      value={option.cuisine_id}
                                      onChange={handleCuisineChange}
                                    />
                                    {option.cuisine_name}
                                  </label>
                                ))}
                            </div>
                            <div className="col-2 col-md-3">
                              {cuisinesOptions
                                .filter((_, index) => index % 4 === 1)
                                .map((option, index) => (
                                  <label
                                    key={index}
                                    className="checkbox-label checkbox-label-restaurantcheckbox"
                                  >
                                    <input
                                      type="checkbox"
                                      value={option.cuisine_id}
                                      onChange={handleCuisineChange}
                                    />
                                    {option.cuisine_name}
                                  </label>
                                ))}
                            </div>
                            <div className="col-2 col-md-3">
                              {cuisinesOptions
                                .filter((_, index) => index % 4 === 2)
                                .map((option, index) => (
                                  <label
                                    key={index}
                                    className="checkbox-label checkbox-label-restaurantcheckbox"
                                  >
                                    <input
                                      type="checkbox"
                                      value={option.cuisine_id}
                                      onChange={handleCuisineChange}
                                    />
                                    {option.cuisine_name}
                                  </label>
                                ))}
                            </div>
                            <div className="col-2 col-md-3">
                              {cuisinesOptions
                                .filter((_, index) => index % 4 === 3)
                                .map((option, index) => (
                                  <label
                                    key={index}
                                    className="checkbox-label checkbox-label-restaurantcheckbox"
                                  >
                                    <input
                                      type="checkbox"
                                      value={option.cuisine_id}
                                      onChange={handleCuisineChange}
                                    />
                                    {option.cuisine_name}
                                  </label>
                                ))}
                            </div>
                          </>
                        ) : (
                          <p>No cuisines available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="submit-btn-container">
              <button type="submit" className="login-btn">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestroDetails;
