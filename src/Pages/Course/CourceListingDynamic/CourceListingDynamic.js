import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdDelete,
} from "react-icons/md";
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
            <div
              className="Header-flex-Course"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>{course_name}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <span className="icon" style={{ marginRight: "10px" }}>
                  {activeKey === "0" ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
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










          <div className="container-fluid">
  {menus.map((menu) => (
    <div
      key={menu.menu_id}
      className="row Main-row-Course"
      style={{ marginBottom: "20px", width: "100%" }}
    >
      <div className="section">
        <h6
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#333",
          }}
        >
          {menu.menu_name}
        </h6>

        <div className="row">
          <div
            className="col-12"
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "#ffffff",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                margin: "0px auto",
                padding: "5px", // Optional for spacing
                width: "100%", // Use the full width available
              }}
            >
              {menu.menu_items && menu.menu_items.length > 0 ? (
                menu.menu_items.map((item, index) => (
                  <div
                    key={item.master_item_id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start", // Align items to the top
                      marginBottom: "15px", // Increased space between items
                      borderBottom: "1px solid #ddd", // Optional for item separation
                      paddingBottom: "10px", // Optional for spacing
                      width: "100%", // Ensure each item takes full width
                    }}
                  >
                    <div
                      style={{
                        flex: "0 0 5%", // Numbering column
                        textAlign: "center", // Center align the numbering
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{index + 1}.</span>
                    </div>
                    <div
                      style={{
                        flex: "0 0 15%", // Image column
                        marginLeft: "20px",
                      }}
                    >
                      <img
                        src={item.master_item_image}
                        alt={item.master_item_name}
                        style={{
                          width: "125px",
                          height: "80px",
                          borderRadius: "5px",
                          objectFit: "contain",
                          border: "1px solid rgba(255, 0, 0, 0.5)",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        flex: "0 0 55%", // Details column
                      }}
                    >
                      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        {item.master_item_name}
                      </div>
                      <div
                        style={{
                          color: "#555",
                          fontSize: "0.9rem",
                          marginBottom: "5px", // Decreased space below description
                        }}
                      >
                        {item.master_item_description}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: "0 0 15%", // Price column
                        fontWeight: "bold",
                        color: "#28a745",
                        fontSize: "1.1rem", // Adjusted font size for better visibility
                      }}
                    >
                      Price: ₹{item.master_item_price}
                    </div>
                  </div>
                ))
              ) : (
                <p>No items available for {menu.menu_name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
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

export default CourceListingDynamic;
