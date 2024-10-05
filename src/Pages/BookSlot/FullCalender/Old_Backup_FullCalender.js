import React, { useState } from "react";
import { Button } from "react-bootstrap";
import BookingModal from "../BookingModal/BookingModal";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal"; // Keep this import
import "./FullCalender.css";

const FullCalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false); // for table booking
  const [showSlotBookingModal, setShowSlotBookingModal] = useState(false); // for slot booking
  const [bookings, setBookings] = useState([]);

  const handlePrevDay = () =>
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  const handleNextDay = () =>
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));

  const handleSaveBooking = (bookingDetails) => {
    console.log("Saving booking details:", bookingDetails);
    setBookings((prevBookings) => [...prevBookings, bookingDetails]);
    setShowModal(false); // close modal after save
  };

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

  // Static bookings data
  const staticBookings = [
    {
      name: "Ribeca Stanly",
      guests: 2,
      time: 2,
      table: "T1",
      email: "ribecha@gmail.com",
      phone: "9875326789",
      comment: "Birthday",
      className: "booking-details-box1", // To keep different class names for each
    },
    {
      name: "Ribeca Stanly",
      guests: 2,
      time: 2,
      table: "T1",
      email: "ribecha@gmail.com",
      phone: "9875326789",
      comment: "Birthday",
      className: "booking-details-box1", // To keep different class names for each
    },
    {
      name: "Sam vicsa",
      guests: 5,
      time: 6,
      table: "T3",
      email: "samvicsa.com",
      phone: "9875326789",
      comment: "Birthday",
      className: "booking-details-box2",
    },
    {
      name: "Sam vicsa",
      guests: 5,
      time: 6,
      table: "T3",
      email: "samvicsa.com",
      phone: "9875326789",
      comment: "Birthday",
      className: "booking-details-box2",
    },
    {
      name: "Robert Stanly",
      guests: 3,
      time: 7,
      table: "T4",
      email: "robert@gmail.com",
      phone: "9875326789",
      comment: "Birthday",
      className: "booking-details-box3",
    },
    {
      name: "Robert Stanly",
      guests: 3,
      time: 7,
      table: "T4",
      email: "robert@gmail.com",
      phone: "9875326789",
      comment: "Birthday",
      className: "booking-details-box3",
    },
  ];

  return (
    <div className="Full-calendar">
      {/* calendar controls */}
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
          <Button className="book-calendar" onClick={() => setShowModal(true)}>
            Book A Table
          </Button>
        </div>
      </div>

      
     {/* Color Notations */}
     <div className="color-notations">
        <div className="color-item">
          <div className="color-box" style={{ backgroundColor: '#D1E9F6' }}></div> {/* Ongoing */}
          <span>Ongoing</span>
        </div>
        <div className="color-item">
          <div className="color-box" style={{ backgroundColor: '#D6EFD8' }}></div> {/* Coming Next */}
          <span>Coming Next</span>
        </div>
        <div className="color-item">
          <div className="color-box" style={{ backgroundColor: '#F5F5F5' }}></div> {/* Completed */}
          <span>Completed</span>
        </div>
      </div>


      {/* Booking Modal for table */}
      <BookingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSaveBooking} // Ensure this function is passed correctly
      />

      {/* Slot Booking Modal */}
      <SlotBookingModal
        show={showSlotBookingModal}
        handleClose={handleSlotModalClose}
      />

      <div className="booking-container mt-5">
        {/* Mapping over static bookings */}
        {staticBookings.map((booking, index) => (
          <div key={index} className={booking.className}>
            <p>
              <strong>Name:</strong> {booking.name}
            </p>
            <p>
              <strong>No of Guests:</strong> {booking.guests}
            </p>
            <p>
              <strong>Time:</strong> {booking.time}
            </p>
            <p>
              <strong>Table:</strong> {booking.table}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Phone:</strong> {booking.phone}
            </p>
            <p>
              <strong>Booking Comment:</strong> {booking.comment}
            </p>
          </div>
        ))}

        {/* Render the saved bookings */}
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="booking-details-box4">
              <p>
                <strong>Name:</strong> {booking.name}
              </p>
              <p>
                <strong>No. of Guests:</strong> {booking.guests}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Table:</strong> {booking.table}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong>Comment:</strong> {booking.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No bookings yet</p>
        )}
      </div>
    </div>
  );
};

export default FullCalender;
