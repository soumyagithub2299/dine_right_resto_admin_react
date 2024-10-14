// import React, { useState } from 'react';
// import { FaAngleLeft } from 'react-icons/fa';
// import { MdOutlineCancel } from "react-icons/md";
// import { useNavigate } from 'react-router-dom';
// import './DinningArea.css';

// const DinningArea = ({ handleNext, handleBack }) => {
//   const navigate = useNavigate();
//   const [selectedAreas, setSelectedAreas] = useState([]);
//   const [availableAreas, setAvailableAreas] = useState([
//     'Indoor',
//     'Outdoor',
//     'Terrace',
//     'Private Dining',
//     'Outdoor Courtyard',
//     'Outdoor (Smoking)',
//     'Indoor Bar Area',
//     'Outdoor Under Canopy',
//     'Bar Area',
//     'Main Dining',
//     'Pool Side'
//   ]);
//   const [hoveredArea, setHoveredArea] = useState("");

//   const handleAreaClick = (area) => {
//     if (!selectedAreas.includes(area)) {
//       setSelectedAreas([...selectedAreas, area]);
//       setAvailableAreas(availableAreas.filter(availableArea => availableArea !== area));
//     }
//   };

//   const handleAreaRemove = (area) => {
//     setSelectedAreas(selectedAreas.filter(selectedArea => selectedArea !== area));
//     setAvailableAreas([...availableAreas, area]);
//   };

//   const handleAreaHover = (area) => {
//     setHoveredArea(area);
//   };

//   const handleBackClick = () => {
//     handleBack();
//   };

//   return (
//     <div className='new-verify-form'>
//       <div className='verify-form-container'>
//         <h2 className='login-head'>
//           <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} />
//           Dining Areas
//         </h2>
//         <div className='selected-container'>
//           <p className='selected-txt'>
//             Add a minimum of 1 dining area. Once you finish creating
//             your account, you will be able to add, remove or rename dining areas in settings.
//           </p>
//           <ul className='selected-areas'>
//             {selectedAreas.map((area) => (
//               <li key={area} className='select-list-item'>
//                 {typeof area === 'string' ? area : 'Invalid Area'}
//                 <MdOutlineCancel
//                   onClick={() => handleAreaRemove(area)}
//                   className='remove-icon'
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className='available-container'>
//           <h3>Available Dining Areas</h3>
//           <ul className='available-areas'>
//             {availableAreas.map((area) => (
//               <li
//                 key={area}
//                 onMouseEnter={() => handleAreaHover(area)}
//                 onMouseLeave={() => setHoveredArea(null)}
//                 className='list-item'
//               >
//                 {area}
//                 <button
//                   onClick={() => handleAreaClick(area)}
//                   className='add-button'
//                 >
//                   Add
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {selectedAreas.length > 0 && (
//           <div className="service-button">
//             <button className='confirm-button' onClick={handleNext}>
//               Next
//             </button>
//           </div>
//         )}
//         <p
//           className="Rendering-Login-newAccount mt-2"
//           style={{ cursor: 'pointer', textAlign:'center'}}
//           onClick={() => navigate('/')}
//         >
//           Already have an account? Login
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DinningArea;



import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DinningArea.css";
import Loader from "./../../../Loader/Loader/Loader";

const DinningArea = ({ handleNext, handleBack, userId }) => {
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [diningAreas, setDiningAreas] = useState([]); // State to store all dining areas
  const [hoveredArea, setHoveredArea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiningAreas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dineright.techfluxsolutions.com/api/auth/getAllDiningAreas"
        );
        setLoading(false);
        if (response.data.response === true) {
          setDiningAreas(response.data.diningAreas); // Store all dining areas
          setAvailableAreas(
            response.data.diningAreas.map((area) => area.dining_area_type) || []
          );
        } else {
          setError(response.data.error_msg || "Failed to fetch dining areas.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching dining areas:", error);
        setError("An error occurred. Please try again later.");
      }
    };

    fetchDiningAreas();
  }, []);

  const handleAreaClick = (area) => {
    if (!selectedAreas.includes(area)) {
      setSelectedAreas([...selectedAreas, area]);
      setAvailableAreas(
        availableAreas.filter((availableArea) => availableArea !== area)
      );
    }
  };

  const handleAreaRemove = (area) => {
    setSelectedAreas(
      selectedAreas.filter((selectedArea) => selectedArea !== area)
    );
    setAvailableAreas([...availableAreas, area]);
  };

  const handleAreaHover = (area) => {
    setHoveredArea(area);
  };

  const handleBackClick = () => {
    handleBack();
  };

  const handleSubmitDiningAreas = async () => {
    try {
      setLoading(true);
      // Create a mapping of dining area types to their corresponding IDs
      const areaIdMap = diningAreas.reduce((acc, area) => {
        acc[area.dining_area_type] = area.id; // Map area type to its ID
        return acc;
      }, {});

      // Map the selected areas to their corresponding IDs
      const diningAreaIds = selectedAreas
        .map((area) => areaIdMap[area]) // Get the ID from the map
        .filter((id) => id !== undefined); // Filter out undefined values

      const response = await axios.post(
        "https://dineright.techfluxsolutions.com/api/auth/insertDiningArea",
        {
          userId: userId,
          dining_area_ids: diningAreaIds,
        }
      );

      console.log("Radha response", response?.status);

      setLoading(false);
      if (response.data.response === true) {
        handleNext();
      } else {
        setError(response.data.error_msg || "Failed to submit dining areas.");
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
          <h2 className="login-head">
            <FaAngleLeft
              onClick={handleBackClick}
              style={{ cursor: "pointer" }}
            />
            Dining Areas
          </h2>
          <div className="selected-container">
            <p className="selected-txt">
              Add a minimum of 1 dining area. Once you finish creating your
              account, you will be able to add, remove or rename dining areas in
              settings.
            </p>
            <ul className="selected-areas">
              {selectedAreas.map((area) => (
                <li key={area} className="select-list-item">
                  {typeof area === "string" ? area : "Invalid Area"}
                  <MdOutlineCancel
                    onClick={() => handleAreaRemove(area)}
                    className="remove-icon"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="available-container">
            <h3>Available Dining Areas</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
              <ul className="available-areas">
                {availableAreas.map((area) => (
                  <li
                    key={area}
                    onMouseEnter={() => handleAreaHover(area)}
                    onMouseLeave={() => setHoveredArea(null)}
                    className="list-item"
                  >
                    {area}
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
          <p
            className="Rendering-Login-newAccount mt-2"
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </>
  );
};

export default DinningArea;
