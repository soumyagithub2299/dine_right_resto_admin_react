import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course3 = ({ AllData }) => {
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
                  onClick={handleDeleteClick}
                />
              </div>
            </div>
          </Accordion.Header>
          <hr className="hr-menu-accordian" />
          <Accordion.Body>
            <div className="container">
              {/* Iterate over the menus */}
              {AllData.menus.map((menu) => (
                <div key={menu.menu_id} className="row Main-row-Course">
                  <div className="section">
                    <h6>{menu.menu_name}</h6>
                    <div className="container-starter">
                      {menu.menu_items.length > 0 ? (
                        menu.menu_items.map((item) => (
                          <div key={item.master_item_id} className="row">
                            <div className="col-3 col-md-2">
                              <img
                                className="startter-img"
                                src={`./assets/images/${item.master_item_image}`}
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
                        <p>No items available for {menu.menu_name}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <DeleteCourseModal show={showDeleteModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Course3;
