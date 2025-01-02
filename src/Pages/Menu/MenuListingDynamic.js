import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdDelete,
} from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import EditMenuModal from "./EditMenuModal/EditMenuModal";

import "./MainCourse/MainCourse.css";

const MenuListingDynamic = ({ AllData, handleGetAllData ,handleGetBavergaesAllData}) => {
  const [activeKey, setActiveKey] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleDeleteIconClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };


  const handleEditIconClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  if (!AllData || typeof AllData !== "object") {
    return <div>No course data available.</div>;
  }

  const { menu_name, menu_items } = AllData;

  if (!menu_name || !Array.isArray(menu_items)) {
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
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
            }}
          >







<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
  <div style={{ width: "1000px", textAlign: "left" }}> {/* Left-align the menu_name */}
    {menu_name}
  </div>

  <div className="icon" style={{ width: "30px" }}>
    {activeKey === "0" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
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
                      padding: "5px", // Optional for spacing
                      width: "100%", // Use the full width available
                    }}
                  >
                    {menu_items && menu_items.length > 0 ? (
                      menu_items.map((item, index) => (
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
                              flex: "0 0 5%", // Adjust column width for numbering
                              textAlign: "center", // Center align the numbering
                              paddingLeft: "0px", // No padding to start from the left
                            }}
                          >
                            <span style={{ fontWeight: "bold" }}>
                              {index + 1}.
                            </span>
                          </div>
                          <div
                            style={{
                              flex: "0 0 15%", // Adjust column width for image
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
                              flex: "0 0 50%", // Adjust column width for details
                            }}
                          >
                            <div
                              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                            >
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
                              flex: "0 0 15%", // Adjust column width for price
                              fontWeight: "bold",
                              color: "#28a745",
                              fontSize: "1.1rem", // Adjusted font size for better visibility
                              marginLeft:"15px"

                            }}
                          >
                            Price: ₹{item.master_item_price}
                          </div>
                          <div
                            style={{
                              marginLeft: "10px",
                              display: "flex",
                              gap: "15px", // Increased gap for better spacing
                            }}
                          >
                            <LiaEditSolid
                              style={{
                                cursor: "pointer",
                                width: "24px", // Increased size for icons
                                height: "24px", // Increased size for icons
                                transition: "transform 0.1s", // Smooth transition for hover effect
                                marginRight: "20px",
                              }}
                              onClick={() => handleEditIconClick(item)}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.transform = "scale(1.2)")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                            <MdDelete
                              style={{
                                cursor: "pointer",
                                width: "24px", // Increased size for icons
                                height: "24px", // Increased size for icons
                                transition: "transform 0.1s", // Smooth transition for hover effect
                                color: "rgb(223, 22, 22)",
                              }}
                              onClick={() => handleDeleteIconClick(item)}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.transform = "scale(1.2)")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                          </div>
                        </div>
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
                      No items available for {menu_name}.
                  </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {selectedItem && showDeleteModal && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          selectedItem={selectedItem}
          handleClose={handleCloseDeleteModal}
          handleGetAllData={handleGetAllData}
          handleGetBavergaesAllData={handleGetBavergaesAllData}
          menu_id={AllData?.menu_id}
        />
      )}

      {selectedItem && showEditModal && (
        <EditMenuModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          selectedItem={selectedItem}
          handleGetAllData={handleGetAllData}
          handleGetBavergaesAllData={handleGetBavergaesAllData}
          menu_id={AllData?.menu_id}
        />
      )}
    </div>
  );
};

export default MenuListingDynamic;
