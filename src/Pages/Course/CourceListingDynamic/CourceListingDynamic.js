import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import "./../../Menu/MainCourse/MainCourse.css";


const CourceListingDynamic = ({ AllData }) => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  if (!AllData || typeof AllData !== "object") {
    return <div>No course data available.</div>;
  }

  const { course_name, menus } = AllData;

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
              </div>
            </div>
          </Accordion.Header>

          {/* <hr className="hr-menu-accordian" /> */}

          <Accordion.Body>
            <div className="container">
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
                      padding: "5px",
                      width: "100%",
                    }}
                  >
                    {menus && menus.length > 0 ? (
                      menus.map((menu, menuIndex) => (
                        <>
                        <div key={menu.menu_id}>

{/* <hr className="hr-menu-accordian" /> */}

<h6
    style={{
        fontWeight: "bold",
        fontSize: "1.2rem", // Slightly larger font size
        color: "#007BFF", // Blue color (Bootstrap primary blue)
        margin: "10px 0",
        textTransform: "uppercase", // Makes the text uppercase
        letterSpacing: "0.5px", // Adds slight spacing between letters
        lineHeight: "1.5", // Increases line height for better readability
        fontFamily: "'Helvetica Neue', Arial, sans-serif", // A clean, modern font
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow for depth
    }}
>
    {menu.menu_name}
</h6>



                          {menu.menu_items && menu.menu_items.length > 0 ? (
                            menu.menu_items.map((item, index) => (
                              <>
                              <div
                                key={item.master_item_id}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  marginBottom: "15px",
                                  borderBottom: "1px solid #ddd",
                                  paddingBottom: "10px",
                                  width: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    flex: "0 0 5%",
                                    textAlign: "center",
                                    paddingLeft: "0px",
                                  }}
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    {menuIndex + 1}.{index + 1}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    flex: "0 0 15%",
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
                                    flex: "0 0 50%",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    {item.master_item_name}
                                  </div>
                                  <div
                                    style={{
                                      color: "#555",
                                      fontSize: "0.9rem",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    {item.master_item_description}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    flex: "0 0 15%",
                                    fontWeight: "bold",
                                    color: "#28a745",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  Price: ₹{item.master_item_price}
                                </div>
                              </div>

                          
                              </>
                            ))
                          ) : (
                            <span
                            style={{
                                color: "red", // Bootstrap danger red color
                                // fontWeight: "bold", 
                                fontSize: "1rem", // Optional: sets the font size
                                margin: "10px 0", // Optional: adds margin
                            }}
                        >
                            No items available for {menu.menu_name}.
                        </span>
                          )}
                        </div>
<hr className="hr-menu-accordian" />
                         </>
                      ))
                    ) : (
                      <span
                      style={{
                          color: "red", // Bootstrap danger red color
                          fontWeight: "bold", 
                          fontSize: "1rem", // Optional: sets the font size
                          margin: "10px 0", // Optional: adds margin
                      }}
                  >
                      No items available for {course_name}.
                  </span>
                  
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default CourceListingDynamic;
