import React, { useState } from "react";
import "./GuestTimeSlot.css";
import { HiPlus } from "react-icons/hi";
import { IoMdBackspace } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { HiPlusSmall } from "react-icons/hi2";
import { BiMinus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const GuestTimeSlot = ({ handleNext, handleBack }) => {
  const [mainDiningRows, setMainDiningRows] = useState([
    { number: 1, duration: "" },
  ]);

  const navigate = useNavigate();

  const handleIncrement = (index) => {
    const newRows = [...mainDiningRows];
    newRows[index].number += 1;
    setMainDiningRows(newRows);
  };

  const handleDecrement = (index) => {
    const newRows = [...mainDiningRows];
    if (newRows[index].number > 1) {
      newRows[index].number -= 1;
      setMainDiningRows(newRows);
    }
  };

  const addRow = () => {
    setMainDiningRows([...mainDiningRows, { number: 1, duration: "" }]);
  };

  const removeRow = () => {
    if (mainDiningRows.length > 1) {
      setMainDiningRows(mainDiningRows.slice(0, -1));
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    handleNext();
  };

  const handleBackClick = () => {
    handleBack();
  };

  const handleDurationChange = (index, value) => {
    const newRows = [...mainDiningRows];
    newRows[index].duration = value;
    setMainDiningRows(newRows);
  };

  
  const durationOptions = [15,30, 45, 60,75, 90, 105,102,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390];

  return (
    <div className="container Main_AddTable my-5">
      <p className="Heading_AddTable mb-4">
        <IoIosArrowBack onClick={handleBackClick} style={{ cursor: "pointer" }} />
        ADD GUEST TIME SLOT
      </p>
      <p className="Paragraph_AddTable mb-3">
        &nbsp; Add at least 1 time slot as per guest. Once you finish creating
        your account, you will be able to add or remove time slots in your
        settings.
      </p>

      <div className="MainDining_AddTable mb-5 mt-5">
        <p className="Subheading1_AddTable">Guest Times slot as per guest count</p>
        <div className="row">
          {mainDiningRows.map((row, index) => (
            <div key={index} className="row w-100 mb-3" style={{ backgroundColor: "#F6F8F9" }}>
              <div className="col-12 col-md-6 p-4">
                <div>
                  <div className="Subheading2_AddTable">COUNT OF GUESTS</div>
                  <div className="component-guest2">
                    {row.number}
                    <div className="innerSvg_AddTable">
                      <BiMinus className="SubinnerSvg" onClick={() => handleDecrement(index)} />
                      <HiPlusSmall className="SubinnerSvg" onClick={() => handleIncrement(index)} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 p-4">
                <div className="Subheading2_AddTable">DURATION (in minutes)</div>
                <div className="seating_AddTable">
                <div className="component-guest1">
                    <select
                      value={row.duration}
                      onChange={(e) => handleDurationChange(index, e.target.value)}
                      className="table-name-input"
                    >
                      <option value="" disabled>
                        Select duration
                      </option>
                      {durationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} minutes
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <HiPlus className="svg_AddTable" onClick={addRow} />
                    <IoMdBackspace className="svg_AddTable" onClick={removeRow} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="service-button">
        <button type="submit" className="addTable-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
      <p
        className="Rendering-Login-newAccount mt-2"
        style={{ cursor: "pointer", textAlign: "center" }}
        onClick={() => navigate("/")}
      >
        Already have an account? Login
      </p>
    </div>
  );
};

export default GuestTimeSlot;

 


// import React, { useState } from "react";
// import "./GuestTimeSlot.css";
// import { HiPlus } from "react-icons/hi";
// import { IoMdBackspace } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import { HiPlusSmall } from "react-icons/hi2";
// import { BiMinus } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; 
// import { GuestTimeSlotAPI } from "./../../../utils/APIs/credentialsApis"; 

// const GuestTimeSlot = ({ handleNext, handleBack }) => {
//   const [mainDiningRows, setMainDiningRows] = useState([{ number: 1, duration: "" }]);
//   const [loading, setLoading] = useState(false); 
//   const navigate = useNavigate();

 
//   const handleIncrement = (index) => {
//     const newRows = [...mainDiningRows];
//     newRows[index].number += 1;
//     setMainDiningRows(newRows);
//   };

 
//   const handleDecrement = (index) => {
//     const newRows = [...mainDiningRows];
//     if (newRows[index].number > 1) {
//       newRows[index].number -= 1;
//       setMainDiningRows(newRows);
//     }
//   };

 
//   const addRow = () => {
//     setMainDiningRows([...mainDiningRows, { number: 1, duration: "" }]);
//   };


//   const removeRow = () => {
//     if (mainDiningRows.length > 1) {
//       setMainDiningRows(mainDiningRows.slice(0, -1));
//     }
//   };

 
//   const handleDurationChange = (index, value) => {
//     const newRows = [...mainDiningRows];
//     newRows[index].duration = value;
//     setMainDiningRows(newRows);
//   };

  
//   const validateForm = () => {
//     return mainDiningRows.every(row => row.duration !== "");
//   };

 
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       toast.error("Please select a duration for all guest time slots.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Prepare the data for the API call
//       const formData = mainDiningRows.map(row => ({
//         guest_count: row.number,
//         duration: row.duration,
//       }));

//       // Call the API
//       const response = await GuestTimeSlotAPI({ time_slots: formData });

//       setLoading(false);

//       if (
//         response &&
//         response.data &&
//         response.data.success
//       ) {
       
//         toast.success(response.data.message || "Guest Time Slot added successfully.");
//         handleNext(); 
//       } else {
       
//         toast.error(response.data.message || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error submitting guest time slots:", error);
//       toast.error("An error occurred. Please try again.");
//     }
//   };

//   const handleBackClick = () => {
//     handleBack();
//   };

//   const durationOptions = [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];

//   return (
//     <div className="container Main_AddTable my-5">
//       <p className="Heading_AddTable mb-4">
//         <IoIosArrowBack onClick={handleBackClick} style={{ cursor: "pointer" }} />
//         ADD GUEST TIME SLOT
//       </p>
//       <p className="Paragraph_AddTable mb-3">
//         &nbsp; Add at least 1 time slot as per guest. Once you finish creating
//         your account, you will be able to add or remove time slots in your
//         settings.
//       </p>

//       <div className="MainDining_AddTable mb-5 mt-5">
//         <p className="Subheading1_AddTable">Guest Times slot as per guest count</p>
//         <div className="row">
//           {mainDiningRows.map((row, index) => (
//             <div key={index} className="row w-100 mb-3" style={{ backgroundColor: "#F6F8F9" }}>
//               <div className="col-12 col-md-6 p-4">
//                 <div>
//                   <div className="Subheading2_AddTable">COUNT OF GUESTS</div>
//                   <div className="component-guest2">
//                     {row.number}
//                     <div className="innerSvg_AddTable">
//                       <BiMinus className="SubinnerSvg" onClick={() => handleDecrement(index)} />
//                       <HiPlusSmall className="SubinnerSvg" onClick={() => handleIncrement(index)} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-12 col-md-6 p-4">
//                 <div className="Subheading2_AddTable">DURATION (in minutes)</div>
//                 <div className="seating_AddTable">
//                   <div className="component-guest1">
//                     <select
//                       value={row.duration}
//                       onChange={(e) => handleDurationChange(index, e.target.value)}
//                       className="table-name-input"
//                     >
//                       <option value="" disabled>
//                         Select duration
//                       </option>
//                       {durationOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option} minutes
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <HiPlus className="svg_AddTable" onClick={addRow} />
//                     <IoMdBackspace className="svg_AddTable" onClick={removeRow} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="service-button">
//         <button type="submit" className="addTable-btn" onClick={handleSubmit} disabled={loading}>
//           {loading ? "Submitting..." : "Confirm"}
//         </button>
//       </div>
//       <p
//         className="Rendering-Login-newAccount mt-2"
//         style={{ cursor: "pointer", textAlign: "center" }}
//         onClick={() => navigate("/")}
//       >
//         Already have an account? Login
//       </p>
//     </div>
//   );
// };

// export default GuestTimeSlot;
