import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course3 = () => {
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

  // Arrays with unique ids for different sections
  const appetizers = [
    {
      id: 1,
      imgSrc: "./assets/images/Starter/starter2.jpg",
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
    },
    // Add more items as needed
  ];

  const mainCourses = [
    {
      id: 2,
      imgSrc: "./assets/images/Starter/starter2.jpg",
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
    },
    // Add more items as needed
  ];

  const desserts = [
    {
      id: 3,
      imgSrc: "./assets/images/Starter/starter2.jpg",
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
    },
    // Add more items as needed
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

      {/* Delete Course Modal */}
      <DeleteCourseModal
        show={showDeleteModal}
        handleClose={handleCloseModal} // Close modal on cancel or delete button click
      />
    </div>
  );
};

export default Course3;
