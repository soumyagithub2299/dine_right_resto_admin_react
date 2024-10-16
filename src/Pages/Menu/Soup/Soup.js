import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdDelete } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditMenuModal from "../EditMenuModal/EditMenuModal";

import "./../MainCourse/MainCourse.css";

const Soup = ({ AllData }) => {
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

  const handleDelete = () => {
    // Add delete logic here
    setShowDeleteModal(false);
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
    // Add edit logic here
    setShowEditModal(false);
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="Header-flex-Course">
              <div>{menu_name}</div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="icon" style={{ marginRight: "10px" }}>
                  {activeKey === "0" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </span>
              </div>
            </div>
          </Accordion.Header>
          <hr className="hr-menu-accordian" />
          <Accordion.Body>
            <div className="container">
              {menu_items.map((menu) => (
                <div key={menu.menu_id} className="row Main-row-Course" style={{ marginBottom: "20px" }}>
                  <div className="section">
                    <h6 style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
                      {menu.menu_name}
                    </h6>
                    <div
                      className="container-starter"
                      style={{ border: "1px solid #dee2e6", borderRadius: "5px", padding: "10px", backgroundColor: "#ffffff" }}
                    >
                      {menu.menu_items && menu.menu_items.length > 0 ? (
                        menu.menu_items.map((item, index) => (
                          <div key={item.master_item_id} className="row" style={{ alignItems: "center", marginBottom: "10px" }}>
                            <div className="col-1 col-md-1" style={{ textAlign: "center" }}>
                              <span style={{ fontWeight: "bold" }}>{index + 1}</span>
                            </div>
                            <div className="col-3 col-md-2">
                              <img
                                className="starter-img"
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
                            <div style={{ marginLeft: "10px", display: "flex", gap: "10px" }}>
                              <LiaEditSolid
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => handleEditIconClick(item)}
                              />
                              <MdDelete
                                style={{ color: "rgb(223, 22, 22)", cursor: "pointer" }}
                                onClick={() => handleDeleteIconClick(item)}
                              />
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

      {selectedItem && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          item={selectedItem}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
        />
      )}

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
