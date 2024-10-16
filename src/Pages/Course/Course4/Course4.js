import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course4 = ({ AllData }) => {
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
                {AllData.course_name}
                <span className="icon">
                  {activeKey === "0" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
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
              {AllData.menus.map((menu, index) => (
                <div key={menu.menu_id} className="row Main-row-Course">
                  <div className="section">
                    <h6>{index + 1}. {menu.menu_name}</h6>
                    {menu.menu_items.length > 0 ? (
                      menu.menu_items.map((item) => (
                        <div className="container-item" key={item.master_item_id}>
                          <div className="col-3 col-md-2">
                            <img
                              className="item-img"
                              src={item.master_item_image} // Assuming full image path is provided
                              alt={item.master_item_name}
                            />
                          </div>
                          <div className="col-7 col-md-8">
                            <div className="row ItemDetails">
                              <div className="col-12 col-md-12 item-name">
                                {item.master_item_name}
                              </div>
                              <div className="col-12 col-md-12 item-details">
                                {item.master_item_description}
                              </div>
                            </div>
                          </div>
                          <div className="col-2 col-md-2 item-price">
                            ${item.master_item_price}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No items available for this category.</p>
                    )}
                  </div>
                </div>
              ))}
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

export default Course4;
