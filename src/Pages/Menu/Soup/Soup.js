import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditMenuModal from "../EditMenuModal/EditMenuModal"; // Import EditMenuModal component
import "./../MainCourse/MainCourse.css";

const Soup = () => {
  const [activeKey, setActiveKey] = useState("0"); // Set "0" as the default to keep the accordion open
  const [appetizers, setAppetizers] = useState([
    {
      id: 1,
      name: "Spinach Salad",
      details: "Young spinach with cashew and sesame sauce",
      price: "$70",
      menuType: "Appetizer",
      img: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 2,
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 3,
      name: "Spinach Salad",
      details: "Young spinach with cashew and sesame sauce",
      price: "$70",
      menuType: "Appetizer",
      img: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 4,
      name: "Caesar Salad",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleDeleteIconClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleDelete = () => {
    setAppetizers(
      appetizers.filter((appetizer) => appetizer.id !== selectedItem.id)
    );
    setShowModal(false);
  };

  const handleEditIconClick = (item) => {
    setSelectedItem(item);
    setShowEditModal(true); // Open the edit modal
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleEditSubmit = (updatedItem) => {
    setAppetizers(
      appetizers.map((appetizer) =>
        appetizer.id === updatedItem.id ? updatedItem : appetizer
      )
    );
    setShowEditModal(false); // Close the modal after submission
  };

  return (
    <div className="container">
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => handleToggle("0")}
            className="AccordionHeader"
          >
            Soup
            <span className="icon">
              {activeKey === "0" ? (
                <MdKeyboardArrowUp />
              ) : (
                <MdKeyboardArrowDown />
              )}
            </span>
          </Accordion.Header>
          <hr className="hr-menu-accordian" />
          <Accordion.Body>
            <div className="container container-main">
              <div className="row">
                {appetizers.map((appetizer, index) => (
                  <div
                    className={`col-10 col-md-6 section-${
                      index % 2 === 0 ? 1 : 2
                    }`}
                    key={appetizer.id}
                  >
                    <div className="container container-starter">
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={appetizer.img}
                          alt={appetizer.name}
                        />
                      </div>
                      <div className="col-7 col-md-6">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {appetizer.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {appetizer.details}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">
                        {appetizer.price}
                      </div>
                      <div className="col-2 col-md-2 starter-price">
                        <div className="svg-Menu">
                          <LiaEditSolid
                            style={{ color: "blue" }}
                            onClick={() => handleEditIconClick(appetizer)}
                          />{" "}
                          {/* Open edit modal */}
                          <MdDelete
                            style={{ color: "rgb(223, 22, 22)" }}
                            onClick={() => handleDeleteIconClick(appetizer)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDelete}
      />

      {/* Edit Menu Modal */}
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
