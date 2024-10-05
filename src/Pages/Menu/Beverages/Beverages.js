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
      name: "Whiskey",
      subTypes: [
        {
          id: 1.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
        {
          id: 1.2,
          details: "Vodka Martini",
          price: "$55",
          menuType: "Salad",
          img: "./assets/images/Starter/starter2.jpg",
        },
      ],
    },
    {
      id: 2,
      name: "Vodka",
      subTypes: [
        {
          id: 2.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
        {
          id: 2.2,
          details: "Vodka Martini",
          price: "$55",
          menuType: "Salad",
          img: "./assets/images/Starter/starter2.jpg",
        },
      ],
    },
    {
      id: 3,
      name: "Rum",
      subTypes: [
        {
          id: 3.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 4,
      name: "Gin",
      subTypes: [
        {
          id: 4.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 5,
      name: "Tequila",
      subTypes: [
        {
          id: 5.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 6,
      name: "Brandy",
      subTypes: [
        {
          id: 6.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 7,
      name: "White Wine",
      subTypes: [
        {
          id: 7.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 8,
      name: "Red Wine",
      subTypes: [
        {
          id: 8.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 9,
      name: "Rose Wine",
      subTypes: [
        {
          id: 9.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 10,
      name: "Sparkling Wine",
      subTypes: [
        {
          id: 10.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 11,
      name: "Champagne",
      subTypes: [
        {
          id: 11.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 12,
      name: "Dessert Wine",
      subTypes: [
        {
          id: 12.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 13,
      name: "Beer",
      subTypes: [
        {
          id: 13.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 14,
      name: "Cider",
      subTypes: [
        {
          id: 14.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 15,
      name: "Cocktail",
      subTypes: [
        {
          id: 15.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 16,
      name: "Mocktail",
      subTypes: [
        {
          id: 16.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 17,
      name: "Liqueur",
      subTypes: [
        {
          id: 17.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
    },
    {
      id: 18,
      name: "Basics",
      subTypes: [
        {
          id: 18.1,
          details: "Vodka with tonic and lime",
          price: "$50",
          menuType: "Appetizer",
          img: "./assets/images/Starter/starter1.jpg",
        },
      ],
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
    // Assuming you want to delete subtypes as well
    const updatedAppetizers = appetizers
      .map((appetizer) => {
        if (appetizer.id === selectedItem.parentId) {
          return {
            ...appetizer,
            subTypes: appetizer.subTypes.filter(
              (subType) => subType.id !== selectedItem.id
            ),
          };
        }
        return appetizer;
      })
      .filter((appetizer) => appetizer.subTypes.length > 0); // Filter out empty main types

    setAppetizers(updatedAppetizers);
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
    const updatedAppetizers = appetizers.map((appetizer) => {
      if (appetizer.id === updatedItem.parentId) {
        return {
          ...appetizer,
          subTypes: appetizer.subTypes.map((subType) =>
            subType.id === updatedItem.id ? updatedItem : subType
          ),
        };
      }
      return appetizer;
    });
    setAppetizers(updatedAppetizers);
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
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteIconClick({ ...item, parentId: null })
                        } // Update here
                      >
                        <MdDelete style={{ color: "rgb(223, 22, 22)" }} />
                      </span>
                    </h6>

                    {item.subTypes.map((subType) => (
                      <div className="container-starter" key={subType.id}>
                        <div className="col-2 col-md-2">
                          <img
                            className="startter-img"
                            src={subType.img}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-6 col-md-6">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {item.name}
                            </div>
                            <div className="col-12 col-md-8 starter-details">
                              {subType.details}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">
                          {subType.price}
                        </div>
                        <div className="col-2 col-md-2">
                          <div className="svg-Menu">
                            <LiaEditSolid
                              style={{ color: "blue" }}
                              onClick={() =>
                                handleEditIconClick({
                                  ...subType,
                                  parentId: item.id,
                                })
                              }
                            />
                            <MdDelete
                              style={{ color: "rgb(223, 22, 22)" }}
                              onClick={() =>
                                handleDeleteIconClick({
                                  ...subType,
                                  parentId: item.id,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
      <EditMenuModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleSubmit={handleEditSubmit}
        item={selectedItem}
      />
    </div>
  );
};

export default Beverages;
