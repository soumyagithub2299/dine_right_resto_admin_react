import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course2 = ({ AllData }) => {
  const [activeKey, setActiveKey] = useState("0");
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

  // Function to dynamically render menu items
  const renderMenuItems = (menu) => {
    return menu.menu_items.length > 0 ? (
      menu.menu_items.map((item) => (
        <div className="container-starter" key={item.master_item_id}>
          <div className="col-3 col-md-2">
            <img
              className="startter-img"
              src={item.master_item_image} // Assuming the URL is relative, adjust as needed
              alt={item.master_item_name}
            />
          </div>
          <div className="col-7 col-md-8">
            <div className="row StarterDetails-Starter">
              <div className="col-12 col-md-12 starter-name">
                {item.master_item_name}
              </div>
              <div className="col-12 col-md-12 starter-details">
                {item.master_item_description}
              </div>
            </div>
          </div>
          <div className="col-2 col-md-2 starter-price">
            ${item.master_item_price}
          </div>
        </div>
      ))
    ) : (
      <div>No items available for {menu.menu_name}</div>
    );
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
              {AllData.menus.map((menu) => (
                <div className="row Main-row-Course" key={menu.menu_id}>
                  <div className="section">
                    <h6>{menu.menu_name}</h6>
                    {/* Render items for each menu dynamically */}
                    {renderMenuItems(menu)}
                  </div>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Delete Course Modal */}
      <DeleteCourseModal show={showDeleteModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Course2;
