

import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./RestroDetails.css";
import Loader from "../../../../src/Loader/Loader/Loader";
import RestroBackgroundImg_Register from "../../Uploads/RestroBackgroundImg/RestroBackgroundImg_Register";

const RestroDetails = ({ handleNext, handleBack }) => {

  const userId = sessionStorage.getItem("newSignUpRestoUserId");


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
  console.log("RestroDetails", userId);
  const navigate = useNavigate();





  useEffect(() => {
    const fetchRestaurantTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getRestaurantType`,
        );
    


        setRestaurantTypeOptions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching restaurant types:", error);
        setRestaurantTypeOptions([]);
      }
    };

    const fetchCuisines = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getCuisines`,
        );
    
        setCuisinesOptions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setCuisinesOptions([]);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllCities`,
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


    // handleNext({ userId: 2 });



    e.preventDefault();


    const bannerImageId = sessionStorage.getItem("banner_image_id");

    if (!bannerImageId) {
      toast.error("Please upload banner image.");
      return;
    }
    



    const postData = {
      restaurantName: restroname,
      restaurantAddress: address,
      city_id:restaurantLocation, 
      restaurant_type_id: selectedRestaurantTypes,
      cuisine_id: selectedCuisines,
      userId: userId,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/stepTwoAndSendOtp`,
        postData
      );
      setLoading(false);

      if (response.data.response === true) {

        toast.success(
          response.data.success_msg ||
            "Restaurant details submitted successfully!"
        );
      
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
              {/* <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} /> */}
              Add restaurant details
            </h2>








            <RestroBackgroundImg_Register userId={userId}/>
            <hr style={{ height: "3px", border: "none", backgroundColor: "gray" }} />




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
              Restaurant Name <span className="text-danger">*</span>
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
              Restaurant Address <span className="text-danger">*</span>
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
              Restaurant Location (City) <span className="text-danger">*</span>
            </label>
            <select
              id="restaurant-location"
              className="login-input"
              value={restaurantLocation}
              onChange={(e) => setRestaurantLocation(e.target.value)}
              required
              style={{cursor:'pointer'}}
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
                      Restaurant Type <span className="text-danger">*</span>
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
                      Cuisines  <span className="text-danger">*</span>
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
                                      style={{cursor:"pointer"}}
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
                                      style={{cursor:"pointer"}}
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





{/*     
            <div
              style={{
                marginTop: "10px",
                alignContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  marginTop: "10px",
                }}
              >
                <p
                  className="SignUp-LoginPage"
                  style={{
                    margin: "0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                Already have an account? Login
                </p>
              </Link>
            </div> */}




          </form>
        </div>
      </div>
    </>
  );
};

export default RestroDetails;
