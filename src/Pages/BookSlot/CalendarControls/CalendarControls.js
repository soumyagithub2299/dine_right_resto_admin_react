import React, { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";

const CalendarControls = ({ currentDate, handlePrevDay, handleNextDay }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="calendar-controls">
        <div className="Firstchild-calendar-controls">
          <button className="prev-arrow" onClick={handlePrevDay}>
            &#8592; {/* Previous arrow */}
          </button>
          <span className="current-date">
            {formatDate(currentDate)} {/* Display the current date */}
          </span>
          <button className="next-arrow" onClick={handleNextDay}>
            &#8594; {/* Next arrow */}
          </button>
        </div>
        <div className="Secondchild-calendar-controls">
          <button className="book-calendar" onClick={handleModalOpen}>
            Book A Table
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal show={showModal} handleClose={handleModalClose} />
    </>
  );
};

export default CalendarControls;
