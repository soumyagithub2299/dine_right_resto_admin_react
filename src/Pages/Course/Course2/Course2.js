import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course2 = () => {
  const [activeKey, setActiveKey] = useState("0"); // Set default state to "0" to open the first accordion by default
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

  // Array for starters
  const starterItems = [
    {
      id: 1,
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      imageUrl: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 2,
      name: "Bruschetta",
      details: "Grilled bread, garlic, tomatoes, olive oil",
      price: "$55",
      imageUrl: "./assets/images/Starter/starter1.jpg",
    },
  ];

  // Array for main courses
  const mainCourseItems = [
    {
      id: 1,
      name: "Grilled Salmon",
      details: "Served with seasonal vegetables",
      price: "$120",
      imageUrl: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 2,
      name: "Beef Steak",
      details: "With garlic mashed potatoes",
      price: "$150",
      imageUrl: "./assets/images/Starter/starter2.jpg",
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
                Course2
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
                  {/* Map through starterItems array */}
                  {starterItems.map((item) => (
                    <div className="container-starter" key={item.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={item.imageUrl}
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
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>2. Main Course</h6>
                    {/* Map through mainCourseItems array */}
                    {mainCourseItems.map((item) => (
                      <div className="container-mainCourse" key={item.id}>
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={item.imageUrl}
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

      {/* Delete Course Modal */}
      <DeleteCourseModal
        show={showDeleteModal}
        handleClose={handleCloseModal} // Close modal on cancel or delete button click
      />
    </div>
  );
};

export default Course2;
