import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course5 = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing the delete modal

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Show the delete modal when delete icon is clicked
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); // Close modal without deleting anything
  };

  // Sample data arrays
  const appetizers = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
    // Add more appetizers if needed
  ];

  const salads = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
    // Add more salads if needed
  ];

  const soups = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
    // Add more soups if needed
  ];

  const mainCourses = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
    // Add more main courses if needed
  ];

  const desserts = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
    // Add more desserts if needed
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
                Course5
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
                  onClick={handleDeleteClick} // Open modal on delete icon click
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
                  {appetizers.map((appetizer) => (
                    <div className="container-starter" key={appetizer.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={appetizer.image}
                          alt={appetizer.name}
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {appetizer.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {appetizer.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">{appetizer.price}</div>
                    </div>
                  ))}
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>2. Salads</h6>
                    {salads.map((salad) => (
                      <div className="container-salad" key={salad.id}>
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={salad.image}
                            alt={salad.name}
                          />
                        </div>
                        <div className="col-7 col-md-8">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {salad.name}
                            </div>
                            <div className="col-12 col-md-12 starter-details">
                              {salad.description}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">{salad.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row Main-row-Course">
                <div className="section">
                  <h6>3. Soup</h6>
                  {soups.map((soup) => (
                    <div className="container-soup" key={soup.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={soup.image}
                          alt={soup.name}
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {soup.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {soup.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">{soup.price}</div>
                    </div>
                  ))}
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>4. Main Course</h6>
                    {mainCourses.map((mainCourse) => (
                      <div className="container-mainCourse" key={mainCourse.id}>
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={mainCourse.image}
                            alt={mainCourse.name}
                          />
                        </div>
                        <div className="col-7 col-md-8">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {mainCourse.name}
                            </div>
                            <div className="col-12 col-md-12 starter-details">
                              {mainCourse.description}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">{mainCourse.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row Main-row-Course">
                <div className="section">
                  <h6>5. Desserts</h6>
                  {desserts.map((dessert) => (
                    <div className="container-Dessert" key={dessert.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={dessert.image}
                          alt={dessert.name}
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {dessert.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {dessert.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">{dessert.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Delete Course Modal */}
      <DeleteCourseModal
        show={showDeleteModal}
        handleClose={handleCloseModal} // Close modal on cancel or delete button click
      />
    </div>
  );
};

export default Course5;





// import React, { useState, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify"; 
// import 'react-toastify/dist/ReactToastify.css'; 
// import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
// import { displayCourseAPI } from "./../../../utils/APIs/CourseApi/CourseApi"; 
// import "./../../Menu/MainCourse/MainCourse.css";

// const Course5 = () => {
//   const [activeKey, setActiveKey] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [appetizers, setAppetizers] = useState([]);
//   const [salads, setSalads] = useState([]);
//   const [soups, setSoups] = useState([]);
//   const [mainCourses, setMainCourses] = useState([]);
//   const [desserts, setDesserts] = useState([]);
//   const [loading, setLoading] = useState(false); 

//   const handleToggle = (key) => {
//     setActiveKey(activeKey === key ? null : key);
//   };

//   const handleDeleteClick = () => {
//     setShowDeleteModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowDeleteModal(false);
//   };

 
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
//         const courseDetails = response.data.response.data;

        
//         setAppetizers(courseDetails.appetizers || []);
//         setSalads(courseDetails.salads || []);
//         setSoups(courseDetails.soups || []);
//         setMainCourses(courseDetails.mainCourses || []);
//         setDesserts(courseDetails.desserts || []);
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error(error);
//       toast.error("Failed to fetch course data");
//     }
//   };

 
//   useEffect(() => {
//     fetchCourseData();
//   }, []);

//   return (
//     <div className="container">
//       <ToastContainer /> 
//       <Accordion activeKey={activeKey}>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header
//             onClick={() => handleToggle("0")}
//             className="AccordionHeader"
//           >
//             <div className="Header-flex-Course">
//               <div>
//                 Course5
//                 <span className="icon">
//                   {activeKey === "0" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
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
//                 {/* Appetizers Section */}
//                 <div className="row Main-row-Course">
//                   <div className="section">
//                     <h6>1. Appetizer</h6>
//                     {appetizers.map((appetizer) => (
//                       <div className="container-starter" key={appetizer.id}>
//                         <div className="col-3 col-md-2">
//                           <img
//                             className="startter-img"
//                             src={appetizer.image}
//                             alt={appetizer.name}
//                           />
//                         </div>
//                         <div className="col-7 col-md-8">
//                           <div className="row StarterDetails-Starter">
//                             <div className="col-12 col-md-12 starter-name">{appetizer.name}</div>
//                             <div className="col-12 col-md-12 starter-details">{appetizer.description}</div>
//                           </div>
//                         </div>
//                         <div className="col-2 col-md-2 starter-price">{appetizer.price}</div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Salads Section */}
//                   <div className="col-12 col-md-6">
//                     <div className="section">
//                       <h6>2. Salads</h6>
//                       {salads.map((salad) => (
//                         <div className="container-salad" key={salad.id}>
//                           <div className="col-3 col-md-2">
//                             <img
//                               className="startter-img"
//                               src={salad.image}
//                               alt={salad.name}
//                             />
//                           </div>
//                           <div className="col-7 col-md-8">
//                             <div className="row StarterDetails-Starter">
//                               <div className="col-12 col-md-12 starter-name">{salad.name}</div>
//                               <div className="col-12 col-md-12 starter-details">{salad.description}</div>
//                             </div>
//                           </div>
//                           <div className="col-2 col-md-2 starter-price">{salad.price}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Soups Section */}
//                 <div className="row Main-row-Course">
//                   <div className="section">
//                     <h6>3. Soup</h6>
//                     {soups.map((soup) => (
//                       <div className="container-soup" key={soup.id}>
//                         <div className="col-3 col-md-2">
//                           <img
//                             className="startter-img"
//                             src={soup.image}
//                             alt={soup.name}
//                           />
//                         </div>
//                         <div className="col-7 col-md-8">
//                           <div className="row StarterDetails-Starter">
//                             <div className="col-12 col-md-12 starter-name">{soup.name}</div>
//                             <div className="col-12 col-md-12 starter-details">{soup.description}</div>
//                           </div>
//                         </div>
//                         <div className="col-2 col-md-2 starter-price">{soup.price}</div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Main Courses Section */}
//                   <div className="col-12 col-md-6">
//                     <div className="section">
//                       <h6>4. Main Course</h6>
//                       {mainCourses.map((mainCourse) => (
//                         <div className="container-mainCourse" key={mainCourse.id}>
//                           <div className="col-3 col-md-2">
//                             <img
//                               className="startter-img"
//                               src={mainCourse.image}
//                               alt={mainCourse.name}
//                             />
//                           </div>
//                           <div className="col-7 col-md-8">
//                             <div className="row StarterDetails-Starter">
//                               <div className="col-12 col-md-12 starter-name">{mainCourse.name}</div>
//                               <div className="col-12 col-md-12 starter-details">{mainCourse.description}</div>
//                             </div>
//                           </div>
//                           <div className="col-2 col-md-2 starter-price">{mainCourse.price}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Desserts Section */}
//                 <div className="row Main-row-Course">
//                   <div className="section">
//                     <h6>5. Desserts</h6>
//                     {desserts.map((dessert) => (
//                       <div className="container-Dessert" key={dessert.id}>
//                         <div className="col-3 col-md-2">
//                           <img
//                             className="startter-img"
//                             src={dessert.image}
//                             alt={dessert.name}
//                           />
//                         </div>
//                         <div className="col-7 col-md-8">
//                           <div className="row StarterDetails-Starter">
//                             <div className="col-12 col-md-12 starter-name">{dessert.name}</div>
//                             <div className="col-12 col-md-12 starter-details">{dessert.description}</div>
//                           </div>
//                         </div>
//                         <div className="col-2 col-md-2 starter-price">{dessert.price}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

      
//       <DeleteCourseModal
//         show={showDeleteModal}
//         onClose={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default Course5;
