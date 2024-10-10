import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course3 = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); 
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); 
  };

 
  const appetizers = [
    {
      id: 1,
      imgSrc: "./assets/images/Starter/starter2.jpg",
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
    },
   
  ];

  const mainCourses = [
    {
      id: 2,
      imgSrc: "./assets/images/Starter/starter2.jpg",
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
    },
   
  ];

  const desserts = [
    {
      id: 3,
      imgSrc: "./assets/images/Starter/starter2.jpg",
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
    },
   
  ];

  return (
    <div className="container">
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => handleToggle("0")}
            className="AccordionHeader"
          >
            <div className="Header-flex-Course">
              <div>
                Course3
                <span className="icon">
                  {activeKey === "0" ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </span>
              </div>
              <div>
                <MdDelete
                  style={{ color: "rgb(223, 22, 22)" }}
                  onClick={handleDeleteClick} 
                />
              </div>
            </div>
          </Accordion.Header>
          <hr className="hr-menu-accordian" />
          <Accordion.Body>
            <div className="container">
              <div className="row Main-row-Course">
                <div className="section">
                  <h6>1. Appetizer</h6>
                  <div className="container-starter">
                    {appetizers.map((item) => (
                      <div key={item.id} className="row">
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={item.imgSrc}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-7 col-md-8">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {item.name}
                            </div>
                            <div className="col-12 col-md-12 starter-details">
                              {item.details}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>2. Main Course</h6>
                    <div className="container-mainCourse">
                      {mainCourses.map((item) => (
                        <div key={item.id} className="row">
                          <div className="col-3 col-md-2">
                            <img
                              className="startter-img"
                              src={item.imgSrc}
                              alt={item.name}
                            />
                          </div>
                          <div className="col-7 col-md-8">
                            <div className="row StarterDetails-Starter">
                              <div className="col-12 col-md-12 starter-name">
                                {item.name}
                              </div>
                              <div className="col-12 col-md-12 starter-details">
                                {item.details}
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 starter-price">
                            {item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row Main-row-Course">
                <div className="section">
                  <h6>3. Desserts</h6>
                  <div className="container-Dessert">
                    {desserts.map((item) => (
                      <div key={item.id} className="row">
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={item.imgSrc}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-7 col-md-8">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {item.name}
                            </div>
                            <div className="col-12 col-md-12 starter-details">
                              {item.details}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      
      <DeleteCourseModal
        show={showDeleteModal}
        handleClose={handleCloseModal} 
      />
    </div>
  );
};

export default Course3;



// import React, { useState, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
// import { displayCourseAPI } from "./../../../utils/APIs/CourseApi/CourseApi"; // Adjust import path
// import { toast } from "react-toastify"; // Import for showing error messages
// import "./../../Menu/MainCourse/MainCourse.css";

// const Course3 = () => {
//   const [activeKey, setActiveKey] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [appetizers, setAppetizers] = useState([]);
//   const [mainCourses, setMainCourses] = useState([]);
//   const [desserts, setDesserts] = useState([]);

//   // Function to fetch course data
//   const fetchCourseData = async () => {
//     try {
//       setLoading(true);
//       const response = await displayCourseAPI();
//       setLoading(false);

//       if (
//         response &&
//         response.data &&
//         response.data.response &&
//         response.data.response.response === true &&
//         response.data.response.data
//       ) {
//         const details = response.data.response.data;

//         // Assuming the API returns separate sections for appetizers, main courses, and desserts
//         setAppetizers(details.appetizers || []);
//         setMainCourses(details.mainCourses || []);
//         setDesserts(details.desserts || []);
//       } else {
//         toast.error("Failed to fetch course data");
//       }
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       toast.error("An error occurred while fetching course data");
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchCourseData();
//   }, []);

//   const handleToggle = (key) => {
//     setActiveKey(activeKey === key ? null : key);
//   };

//   const handleDeleteClick = () => {
//     setShowDeleteModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowDeleteModal(false);
//   };

//   return (
//     <div className="container">
//       <Accordion activeKey={activeKey}>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header
//             onClick={() => handleToggle("0")}
//             className="AccordionHeader"
//           >
//             <div className="Header-flex-Course">
//               <div>
//                 Course3
//                 <span className="icon">
//                   {activeKey === "0" ? (
//                     <MdKeyboardArrowUp />
//                   ) : (
//                     <MdKeyboardArrowDown />
//                   )}
//                 </span>
//               </div>
//               <div>
//                 <MdDelete
//                   style={{ color: "rgb(223, 22, 22)" }}
//                   onClick={handleDeleteClick}
//                 />
//               </div>
//             </div>
//           </Accordion.Header>
//           <hr className="hr-menu-accordian" />
//           <Accordion.Body>
//             {loading ? (
//               <div>Loading...</div>
//             ) : (
//               <div className="container">
//                 {/* Appetizers */}
//                 <div className="row Main-row-Course">
//                   <div className="section">
//                     <h6>1. Appetizer</h6>
//                     <div className="container-starter">
//                       {appetizers.map((item) => (
//                         <div key={item.id} className="row">
//                           <div className="col-3 col-md-2">
//                             <img
//                               className="startter-img"
//                               src={item.imgSrc}
//                               alt={item.name}
//                             />
//                           </div>
//                           <div className="col-7 col-md-8">
//                             <div className="row StarterDetails-Starter">
//                               <div className="col-12 col-md-12 starter-name">
//                                 {item.name}
//                               </div>
//                               <div className="col-12 col-md-12 starter-details">
//                                 {item.details}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-2 col-md-2 starter-price">
//                             {item.price}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Main Courses */}
//                 <div className="row Main-row-Course">
//                   <div className="col-12 col-md-6">
//                     <div className="section">
//                       <h6>2. Main Course</h6>
//                       <div className="container-mainCourse">
//                         {mainCourses.map((item) => (
//                           <div key={item.id} className="row">
//                             <div className="col-3 col-md-2">
//                               <img
//                                 className="startter-img"
//                                 src={item.imgSrc}
//                                 alt={item.name}
//                               />
//                             </div>
//                             <div className="col-7 col-md-8">
//                               <div className="row StarterDetails-Starter">
//                                 <div className="col-12 col-md-12 starter-name">
//                                   {item.name}
//                                 </div>
//                                 <div className="col-12 col-md-12 starter-details">
//                                   {item.details}
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="col-2 col-md-2 starter-price">
//                               {item.price}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Desserts */}
//                 <div className="row Main-row-Course">
//                   <div className="section">
//                     <h6>3. Desserts</h6>
//                     <div className="container-Dessert">
//                       {desserts.map((item) => (
//                         <div key={item.id} className="row">
//                           <div className="col-3 col-md-2">
//                             <img
//                               className="startter-img"
//                               src={item.imgSrc}
//                               alt={item.name}
//                             />
//                           </div>
//                           <div className="col-7 col-md-8">
//                             <div className="row StarterDetails-Starter">
//                               <div className="col-12 col-md-12 starter-name">
//                                 {item.name}
//                               </div>
//                               <div className="col-12 col-md-12 starter-details">
//                                 {item.details}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-2 col-md-2 starter-price">
//                             {item.price}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

//       <DeleteCourseModal show={showDeleteModal} handleClose={handleCloseModal} />
//     </div>
//   );
// };

// export default Course3;
