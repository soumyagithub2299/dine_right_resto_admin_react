import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditMenuModal from "../EditMenuModal/EditMenuModal"; // Import EditMenuModal component
import "./../MainCourse/MainCourse.css";

const Beverages = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [appetizers, setAppetizers] = useState([
    {
      id: 1,
      name: "Whisky",
      details: "Young spinach with cashew and sesame sauce",
      price: "$70",
      menuType: "Appetizer",
      img: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 2,
      name: "Vodka",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 3,
      name: "Rum",
      details: "Young spinach with cashew and sesame sauce",
      price: "$70",
      menuType: "Appetizer",
      img: "./assets/images/Starter/starter1.jpg",
    },
    {
      id: 4,
      name: "Gin",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 5,
      name: "Tequila",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 6,
      name: "Brandy",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 7,
      name: "White Wine",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 8,
      name: "Red Wine",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 9,
      name: "Rose Wine",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 10,
      name: "Sparkling Wine",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 11,
      name: "Champagne",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 12,
      name: "Dessert Wine",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 13,
      name: "Beer",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 14,
      name: "Cider",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 15,
      name: "Cocktail",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 16,
      name: "Mocktails",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 17,
      name: "Liqueur",
      details: "Classic caesar with croutons and parmesan",
      price: "$65",
      menuType: "Salad",
      img: "./assets/images/Starter/starter2.jpg",
    },
    {
      id: 18,
      name: "Basics",
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
    <div className="container mb-5">
      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => handleToggle("0")}
            className="AccordionHeader"
          >
            Beverages
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
            <div className="container">
              <div className="row Main-row-Course">
                {appetizers.map((item, index) => (
                  <div key={item.id} className="section">
                    <h6>
                      {index + 1}. {item.name}
                    </h6>
                    <div className="container-starter">
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={item.img}
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
                      <div className="col-2">
                        <LiaEditSolid
                          onClick={() => handleEditIconClick(item)}
                        />
                        <MdDelete onClick={() => handleDeleteIconClick(item)} />
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

export default Beverages;
