import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Customize = () => {
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


  const appetizers = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
  ];

  const salads = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
  ];

  const soups = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
  ];

  const mainCourses = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
  ];

  const desserts = [
    { id: 1, name: "Caesar Salad", description: "Classic caesar with croutons and parmesan", price: "$65", image: "./assets/images/Starter/starter2.jpg" },
  ];

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
                Customize
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
              <div className="row Main-row-Course">
                <div className="section">
                  <h6>1. Appetizer</h6>
                  {appetizers.map((appetizer) => (
                    <div className="container-starter" key={appetizer.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={appetizer.image}
                          alt={appetizer.name}
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {appetizer.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {appetizer.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">{appetizer.price}</div>
                    </div>
                  ))}
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>2. Salads</h6>
                    {salads.map((salad) => (
                      <div className="container-salad" key={salad.id}>
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={salad.image}
                            alt={salad.name}
                          />
                        </div>
                        <div className="col-7 col-md-8">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {salad.name}
                            </div>
                            <div className="col-12 col-md-12 starter-details">
                              {salad.description}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">{salad.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row Main-row-Course">
                <div className="section">
                  <h6>3. Soup</h6>
                  {soups.map((soup) => (
                    <div className="container-soup" key={soup.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={soup.image}
                          alt={soup.name}
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {soup.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {soup.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">{soup.price}</div>
                    </div>
                  ))}
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>4. Main Course</h6>
                    {mainCourses.map((mainCourse) => (
                      <div className="container-mainCourse" key={mainCourse.id}>
                        <div className="col-3 col-md-2">
                          <img
                            className="startter-img"
                            src={mainCourse.image}
                            alt={mainCourse.name}
                          />
                        </div>
                        <div className="col-7 col-md-8">
                          <div className="row StarterDetails-Starter">
                            <div className="col-12 col-md-12 starter-name">
                              {mainCourse.name}
                            </div>
                            <div className="col-12 col-md-12 starter-details">
                              {mainCourse.description}
                            </div>
                          </div>
                        </div>
                        <div className="col-2 col-md-2 starter-price">{mainCourse.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row Main-row-Course">
                <div className="section">
                  <h6>5. Desserts</h6>
                  {desserts.map((dessert) => (
                    <div className="container-Dessert" key={dessert.id}>
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src={dessert.image}
                          alt={dessert.name}
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            {dessert.name}
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            {dessert.description}
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">{dessert.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Delete Course Modal */}
      <DeleteCourseModal
        show={showDeleteModal}
        handleClose={handleCloseModal} // Close modal on cancel or delete button click
      />
    </div>
  );
};

export default Customize;
