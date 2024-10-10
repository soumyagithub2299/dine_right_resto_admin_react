import React, { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal"; // Import your new modal component
import "../FullCalender/FullCalender.css";

const CalendarControls = ({ currentDate, handlePrevDay, handleNextDay }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSlotBookingModal, setShowSlotBookingModal] = useState(false);

  const handleModalOpen = () => setShowBookingModal(true);
  const handleModalClose = () => setShowBookingModal(false);
  const handleSlotModalOpen = () => setShowSlotBookingModal(true);
  const handleSlotModalClose = () => setShowSlotBookingModal(false);

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
          <button className="book-calendar" onClick={handleSlotModalOpen}>
            Booking Slots
          </button>
          <button className="book-calendar" onClick={handleModalOpen}>
            Book A Table
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal show={showBookingModal} handleClose={handleModalClose} />

      {/* Slot Booking Modal */}
      <SlotBookingModal show={showSlotBookingModal} handleClose={handleSlotModalClose} />
    </>
  );
};

export default CalendarControls;
