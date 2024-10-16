import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DinningArea.css";
import Loader from "./../../../Loader/Loader/Loader";
import { toast } from "react-toastify";

const DinningArea = ({ handleNext, handleBack }) => {
  const userId = sessionStorage.getItem("newSignUpRestoUserId");
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState([]); // Track selected areas
  const [diningAreas, setDiningAreas] = useState([]); // Store all dining areas from the API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch dining areas on component mount
  useEffect(() => {
    const fetchDiningAreas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllDiningAreas`
        );
        setLoading(false);
        if (response.data.response === true) {
          setDiningAreas(response.data.diningAreas);
        } else {
          console.log(
            response.data.error_msg || "Failed to fetch dining areas."
          );
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching dining areas:", error);
        setError("An error occurred. Please try again later.");
      }
    };

    fetchDiningAreas();
  }, []);

  // Handle selection of an area
  const handleAreaClick = (area) => {
    if (!selectedAreas.includes(area.dining_area_id)) {
      setSelectedAreas([...selectedAreas, area.dining_area_id]);
    }
  };

  // Handle removing a selected area
  const handleAreaRemove = (areaId) => {
    setSelectedAreas(selectedAreas.filter((id) => id !== areaId));
  };

  // Handle form submission for dining areas
  const handleSubmitDiningAreas = async () => {
    if (selectedAreas.length === 0) {
      toast.error("Please select at least one dining area.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/insertDiningArea`,
        {
          userId: userId,
          dining_area_ids: selectedAreas, // Use selected area IDs directly
        }
      );
      setLoading(false);

      if (response?.data?.response === true) {
        toast.success(
          response?.data?.success_msg || "Dining areas submitted successfully."
        );
        handleNext();
      } else {
        toast.error(
          response.data.error_msg || "Failed to submit dining areas."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting dining areas:", error);
      setError("An error occurred while submitting. Please try again later.");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="new-verify-form">
        <div className="verify-form-container">
          <h2 className="login-head">Dining Areas</h2>
          <div className="selected-container">
            <p className="selected-txt">
              Add a minimum of 1 dining area. Once you finish creating your
              account, you will be able to add, remove or rename dining areas in
              settings.
            </p>
            <ul className="selected-areas">
              {selectedAreas.map((areaId) => {
                const area = diningAreas.find(
                  (area) => area.dining_area_id === areaId
                );
                return (
                  <li
                    key={areaId}
                    className="select-list-item"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {area?.dining_area_type || "Unknown Area"}
                    <MdOutlineCancel
                      onClick={() => handleAreaRemove(areaId)}
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "#ff4d4f",
                        fontSize: "1.5rem",
                      }} // Inline CSS
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="available-container">
            <h3>Available Dining Areas</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <ul className="available-areas">
                {diningAreas
                  .filter(
                    (area) => !selectedAreas.includes(area.dining_area_id)
                  )
                  .map((area) => (
                    <li key={area.dining_area_id} className="list-item">
                      {area.dining_area_type}
                      <button
                        onClick={() => handleAreaClick(area)}
                        className="add-button"
                      >
                        Add
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {selectedAreas.length > 0 && (
            <div className="service-button">
              <button
                className="confirm-button"
                onClick={handleSubmitDiningAreas}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DinningArea;
