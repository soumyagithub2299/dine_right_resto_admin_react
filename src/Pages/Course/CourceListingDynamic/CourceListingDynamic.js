import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const CourceListingDynamic = ({ AllData }) => {
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

  // Ensure AllData is an object with the expected structure
  if (!AllData || typeof AllData !== "object") {
    return <div>No course data available.</div>;
  }

  const { course_name, menus } = AllData;

  // Check if course_name and menus are defined and menus is an array
  if (!course_name || !Array.isArray(menus)) {
    return <div>Invalid course data structure.</div>;
  }

  return (
    <div className="container">
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => handleToggle("0")}
            className="AccordionHeader"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              border: "1px solid #dee2e6",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="Header-flex-Course">
              <div>{course_name}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon" style={{ marginRight: "10px" }}>
                  {activeKey === "0" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </span>


                {/* <MdDelete
                  style={{ color: "rgb(223, 22, 22)", cursor: "pointer" }}
                  onClick={handleDeleteClick}
                /> */}



              </div>
            </div>
          </Accordion.Header>
          <hr className="hr-menu-accordian" />
          <Accordion.Body>
            <div className="container">
              {/* Iterate over the menus */}
              {menus.map((menu) => (
                <div key={menu.menu_id} className="row Main-row-Course" style={{ marginBottom: "20px" }}>
                  <div className="section">
                    <h6 style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
                      {menu.menu_name}
                    </h6>














                    <div className="container-starter" style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: "10px", backgroundColor: "#ffffff" }}>
                      {menu.menu_items && menu.menu_items.length > 0 ? (
                        menu.menu_items.map((item, index) => (

                          <div key={item.master_item_id} className="row" style={{ alignItems: "center", marginBottom: "10px" }}>
                            <div className="col-1 col-md-1" style={{ textAlign: "center" }}>
                              <span style={{ fontWeight: "bold" }}>{index + 1}</span>
                            </div>
                            <div className="col-3 col-md-2">
                              <img
                                className="startter-img"
                                src={item.master_item_image}
                                alt={item.master_item_name}
                                style={{ width: "100%", borderRadius: "5px" }}
                              />
                            </div>
                            <div className="col-7 col-md-8">
                              <div className="row StarterDetails-Starter">
                                <div className="col-12 col-md-12 starter-name" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                                  {item.master_item_name}
                                </div>
                                <div className="col-12 col-md-12 starter-details" style={{ color: "#555" }}>
                                  {item.master_item_description}
                                </div>
                              </div>
                            </div>
                            <div className="col-2 col-md-2 starter-price" style={{ fontWeight: "bold", color: "#28a745" }}>
                              ₹{item.master_item_price}
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

export default CourceListingDynamic;
