import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditMenuModal from "../EditMenuModal/EditMenuModal"; 
import "./../MainCourse/MainCourse.css";

const Soup = () => {
  const [activeKey, setActiveKey] = useState("0"); 
  const [appetizers, setAppetizers] = useState([
    {
      id: 1,
      name: "Spinach Salad",
      details: "Young spinach with cashew and sesame sauce",
      price: "$70",
      menuType: "Appetizer",
      img: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 2,
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 3,
      name: "Spinach Salad",
      details: "Young spinach with cashew and sesame sauce",
      price: "$70",
      menuType: "Appetizer",
      img: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 4,
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleDeleteIconClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    setAppetizers(
      appetizers.filter((appetizer) => appetizer.id !== selectedItem.id)
    );
    setShowModal(false);
  };

  const handleEditIconClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true); 
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleEditSubmit = (updatedItem) => {
    setAppetizers(
      appetizers.map((appetizer) =>
        appetizer.id === updatedItem.id ? updatedItem : appetizer
      )
    );
    setShowEditModal(false); 
  };

  return (
    <div className="container">
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => handleToggle("0")}
            className="AccordionHeader"
          >
            Soup
            <span className="icon">
              {activeKey === "0" ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </Accordion.Header>
          <hr className="hr-menu-accordian" />
          <Accordion.Body>
            <div className="container container-main">
              <div className="row">
                {appetizers.map((appetizer, index) => (
                  <div
                    className={`col-10 col-md-6 section-${
                      index % 2 === 0 ? 1 : 2
                    }`}
                    key={appetizer.id}
                  >
                    <div className="container container-starter">
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={appetizer.img}
                          alt={appetizer.name}
                        />
                      </div>
                      <div className="col-7 col-md-6">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {appetizer.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {appetizer.details}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">
                        {appetizer.price}
                      </div>
                      <div className="col-2 col-md-2 starter-price">
                        <div className="svg-Menu">
                          <LiaEditSolid
                            style={{ color: "blue" }}
                            onClick={() => handleEditIconClick(appetizer)}
                          />{" "}
                         
                          <MdDelete
                            style={{ color: "rgb(223, 22, 22)" }}
                            onClick={() => handleDeleteIconClick(appetizer)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    
      <DeleteConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
      />

      
      {selectedItem && (
        <EditMenuModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          item={selectedItem}
          handleSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default Soup;



// import React, { useState, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { LiaEditSolid } from "react-icons/lia";
// import { MdDelete } from "react-icons/md";
// import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
// import EditMenuModal from "../EditMenuModal/EditMenuModal";
// import { displayMenuAPI } from "./../../../utils/APIs/MenuApis/MenuApi"; 
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./../MainCourse/MainCourse.css";

// const Soup = () => {
//   const [activeKey, setActiveKey] = useState("0");
//   const [appetizers, setAppetizers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleToggle = (key) => {
//     setActiveKey(activeKey === key ? null : key);
//   };

//   const handleDeleteIconClick = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedItem(null);
//   };

//   const handleDelete = () => {
//     setAppetizers(appetizers.filter((appetizer) => appetizer.id !== selectedItem.id));
//     setShowModal(false);
//     toast.success("Item deleted successfully!");
//   };

//   const handleEditIconClick = (item) => {
//     setSelectedItem(item);
//     setShowEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setSelectedItem(null);
//   };

//   const handleEditSubmit = (updatedItem) => {
//     setAppetizers(
//       appetizers.map((appetizer) =>
//         appetizer.id === updatedItem.id ? updatedItem : appetizer
//       )
//     );
//     setShowEditModal(false);
//     toast.success("Item edited successfully!");
//   };

//   const getMenuItems = async () => {
//     try {
//       setLoading(true);
//       const response = await displayMenuAPI(); 
//       setLoading(false);

//       if (response?.data?.response === true && response?.data?.data) {
//         const menuItems = response.data.data;
//         setAppetizers(menuItems);
//       } else {
//         toast.error("Failed to fetch menu items!");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("An error occurred while fetching menu items.");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getMenuItems();
//   }, []);

//   return (
//     <div className="container">
//       <ToastContainer /> 
//       <Accordion activeKey={activeKey}>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header onClick={() => handleToggle("0")} className="AccordionHeader">
//             Soup
//             <span className="icon">
//               {activeKey === "0" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
//             </span>
//           </Accordion.Header>
//           <hr className="hr-menu-accordian" />
//           <Accordion.Body>
//             <div className="container container-main">
//               <div className="row">
//                 {appetizers.map((appetizer, index) => (
//                   <div
//                     className={`col-10 col-md-6 section-${index % 2 === 0 ? 1 : 2}`}
//                     key={appetizer.id}
//                   >
//                     <div className="container container-starter">
//                       <div className="col-3 col-md-2">
//                         <img className="starter-img" src={appetizer.img} alt={appetizer.name} />
//                       </div>
//                       <div className="col-7 col-md-6">
//                         <div className="row StarterDetails-Starter">
//                           <div className="col-12 col-md-12 starter-name">{appetizer.name}</div>
//                           <div className="col-12 col-md-12 starter-details">{appetizer.details}</div>
//                         </div>
//                       </div>
//                       <div className="col-2 col-md-2 starter-price">{appetizer.price}</div>
//                       <div className="col-2 col-md-2 starter-price">
//                         <div className="svg-Menu">
//                           <LiaEditSolid
//                             style={{ color: "blue" }}
//                             onClick={() => handleEditIconClick(appetizer)}
//                           />
//                           <MdDelete
//                             style={{ color: "rgb(223, 22, 22)" }}
//                             onClick={() => handleDeleteIconClick(appetizer)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>

//       <DeleteConfirmationModal
//         show={showModal}
//         handleClose={handleCloseModal}
//         handleDelete={handleDelete}
//       />

//       {selectedItem && (
//         <EditMenuModal
//           show={showEditModal}
//           handleClose={handleCloseEditModal}
//           item={selectedItem}
//           handleSubmit={handleEditSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default Soup;
