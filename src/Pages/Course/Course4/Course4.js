import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCourseModal from "../DeleteCourseModal/DeleteCourseModal";
import "./../../Menu/MainCourse/MainCourse.css";

const Course4 = () => {
  const [activeKey, setActiveKey] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing the delete modal

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true); // Show the delete modal when delete icon is clicked
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); // Close modal without deleting anything
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
                Course4
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
                  <div className="container-starter">
                    <div className="col-3 col-md-2">
                      <img
                        className="startter-img"
                        src="./assets/images/Starter/starter2.jpg"
                        alt="Caesar Salad"
                      />
                    </div>
                    <div className="col-7 col-md-8">
                      <div className="row StarterDetails-Starter">
                        <div className="col-12 col-md-12 starter-name">
                          Caesar Salad
                        </div>
                        <div className="col-12 col-md-12 starter-details">
                          Classic caesar with croutons and parmesan
                        </div>
                      </div>
                    </div>
                    <div className="col-2 col-md-2 starter-price">$65</div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>2. Salads</h6>
                    <div className="container-starter">
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src="./assets/images/Starter/starter2.jpg"
                          alt="Caesar Salad"
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            Caesar Salad
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            Classic caesar with croutons and parmesan
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">$65</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row Main-row-Course">
                <div className="section">
                  <h6>3. Main Course</h6>
                  <div className="container-starter">
                    <div className="col-3 col-md-2">
                      <img
                        className="startter-img"
                        src="./assets/images/Starter/starter2.jpg"
                        alt="Caesar Salad"
                      />
                    </div>
                    <div className="col-7 col-md-8">
                      <div className="row StarterDetails-Starter">
                        <div className="col-12 col-md-12 starter-name">
                          Caesar Salad
                        </div>
                        <div className="col-12 col-md-12 starter-details">
                          Classic caesar with croutons and parmesan
                        </div>
                      </div>
                    </div>
                    <div className="col-2 col-md-2 starter-price">$65</div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="section">
                    <h6>4. Desserts</h6>
                    <div className="container-starter">
                      <div className="col-3 col-md-2">
                        <img
                          className="startter-img"
                          src="./assets/images/Starter/starter2.jpg"
                          alt="Caesar Salad"
                        />
                      </div>
                      <div className="col-7 col-md-8">
                        <div className="row StarterDetails-Starter">
                          <div className="col-12 col-md-12 starter-name">
                            Caesar Salad
                          </div>
                          <div className="col-12 col-md-12 starter-details">
                            Classic caesar with croutons and parmesan
                          </div>
                        </div>
                      </div>
                      <div className="col-2 col-md-2 starter-price">$65</div>
                    </div>
                  </div>
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

export default Course4;
