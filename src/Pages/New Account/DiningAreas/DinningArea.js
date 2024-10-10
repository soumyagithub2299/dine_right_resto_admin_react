import React, { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa'; 
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom'; 
import './DinningArea.css'; 

const DinningArea = ({ handleNext, handleBack }) => {
  const navigate = useNavigate(); 
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([
    'Indoor',
    'Outdoor',
    'Terrace',
    'Private Dining',
    'Outdoor Courtyard',
    'Outdoor (Smoking)',
    'Indoor Bar Area',
    'Outdoor Under Canopy',
    'Bar Area',
    'Main Dining',
    'Pool Side'
  ]);
  const [hoveredArea, setHoveredArea] = useState("");

  const handleAreaClick = (area) => {
    if (!selectedAreas.includes(area)) {
      setSelectedAreas([...selectedAreas, area]); 
      setAvailableAreas(availableAreas.filter(availableArea => availableArea !== area));
    }
  };

  const handleAreaRemove = (area) => {
    setSelectedAreas(selectedAreas.filter(selectedArea => selectedArea !== area));
    setAvailableAreas([...availableAreas, area]);
  };

  const handleAreaHover = (area) => {
    setHoveredArea(area);
  };

  const handleBackClick = () => {
    handleBack();
  };

  return (
    <div className='new-verify-form'>
      <div className='verify-form-container'>
        <h2 className='login-head'>
          <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} />
          Dining Areas
        </h2>
        <div className='selected-container'>
          <p className='selected-txt'>
            Add a minimum of 1 dining area. Once you finish creating 
            your account, you will be able to add, remove or rename dining areas in settings.
          </p>
          <ul className='selected-areas'>
            {selectedAreas.map((area) => (
              <li key={area} className='select-list-item'>
                {typeof area === 'string' ? area : 'Invalid Area'}
                <MdOutlineCancel  
                  onClick={() => handleAreaRemove(area)} 
                  className='remove-icon' 
                />
              </li>
            ))}
          </ul>
        </div>
        <div className='available-container'>
          <h3>Available Dining Areas</h3>
          <ul className='available-areas'>
            {availableAreas.map((area) => (
              <li
                key={area}
                onMouseEnter={() => handleAreaHover(area)}
                onMouseLeave={() => setHoveredArea(null)}
                className='list-item'
              >
                {area}
                <button
                  onClick={() => handleAreaClick(area)}
                  className='add-button'
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedAreas.length > 0 && (
          <div className="service-button">
            <button className='confirm-button' onClick={handleNext}>
              Next
            </button>
          </div>
        )}
        <p 
          className="Rendering-Login-newAccount mt-2" 
          style={{ cursor: 'pointer', textAlign:'center'}} 
          onClick={() => navigate('/')} 
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default DinningArea;




// import React, { useState } from 'react';
// import { FaAngleLeft } from 'react-icons/fa'; 
// import { MdOutlineCancel } from "react-icons/md";
// import { useNavigate } from 'react-router-dom'; 
// import { toast } from 'react-toastify'; 
// import { DiningAreasAPI } from './../../../utils/APIs/credentialsApis'; 
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
//   const [loading, setLoading] = useState(false); 

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

//   const handleSubmit = async () => {
//     // Validate selected areas
//     if (selectedAreas.length === 0) {
//       toast.error("Please select at least one dining area.");
//       return;
//     }

//     try {
//       setLoading(true);

      
//       const data = {
//         dining_areas: selectedAreas
//       };

//       const response = await DiningAreasAPI(data);

//       setLoading(false);

//       if (
//         response &&
//         response.data &&
//         response.data.response &&
//         response.data.response.response === true
//       ) {
        
//         toast.success("Dining areas added successfully.");
//         handleNext(); 
//       } else {
//         setLoading(false);
//         toast.error(response.data.response.error_msg || "Failed to add dining areas.");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error adding dining areas:", error);
//       toast.error("An error occurred while adding dining areas.");
//     }
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
//             <button className='confirm-button' onClick={handleSubmit} disabled={loading}>
//               {loading ? 'Loading...' : 'Next'}
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
