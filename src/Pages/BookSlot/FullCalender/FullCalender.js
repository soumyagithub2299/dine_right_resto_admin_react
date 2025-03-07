import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import BookingModal from "../BookingModal/BookingModal";
import SlotBookingModal from "../SlotBookingModal/SlotBookingModal"; // Keep this import
import "./FullCalender.css";
import EventCalendar from "../EventCalendar/EventCalendar";
import EventTable from "./EventTable";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";
import CommonModal from "../../CommonModal";

const FullCalender = () => {

  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
  const [ChoosenDate, setChoosenDate] = useState();

  const [currentDate, setCurrentDate] = useState(new Date());

  // const handlePrevDay = () => {
  //   setCurrentDate((prevDate) => {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0); // Reset the time to 00:00:00 for accurate comparison

  //     const newDate = new Date(prevDate);
  //     newDate.setDate(newDate.getDate() - 1); // Decrement day by 1

  //     // Check if newDate is before today, prevent update if so
  //     if (newDate < today) {
  //       return prevDate; // Return the previous date without changing it
  //     }
  //     handleGetAllData(newDate);

  //     return newDate; // Otherwise, update to the new date
  //   });
  // };

  const handlePrevDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1); // Decrement day by 1
      handleGetAllData(newDate); // Fetch data for the previous day
     setChoosenDate(newDate);

      return newDate;
    });
  };



  // Function to go to the next day
  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1); // Increment day by 1
      handleGetAllData(newDate);
     setChoosenDate(newDate);

      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };




  const [showModal, setShowModal] = useState(false); // for table booking
  const [showSlotBookingModal, setShowSlotBookingModal] = useState(false); // for slot booking
  const [bookings, setBookings] = useState([]);


  const [loading, setLoading] = useState(false);




  const handleSaveBooking = (bookingDetails) => {
    console.log("Saving booking details:", bookingDetails);
    setBookings((prevBookings) => [...prevBookings, bookingDetails]);
    setShowModal(false); // close modal after save
  };

  const handleSlotModalOpen = () => setShowSlotBookingModal(true);
  const handleSlotModalClose = () => setShowSlotBookingModal(false);



  const [isCommonMassageModalOpen, setIsCommonMassageModalOpen] = useState(false);


  const [AllDataOfAPI, setAllDataOfAPI] = useState([]);
  
  const handleGetAllData = async (date) => {

    setChoosenDate(date);



  // Manually format the date to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const bookingDate = `${year}-${month}-${day}`;

    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getAllocatedTables?booking_date=${bookingDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (Array.isArray(response?.data) && response?.data) {
        setAllDataOfAPI(response?.data);

        if(response.data.length === 0){

 
          setIsCommonMassageModalOpen(true);


          } else{      setIsCommonMassageModalOpen(false);}




      } else {
        
        const errorMsg = response?.data?.error_msg || "An error occurred.";
        toast.info(errorMsg);

      }

      
    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {

    handleGetAllData(currentDate);
    setChoosenDate(currentDate);

  }, []); // This should ensure it runs only once





    
const bookingsssssssssssss = [
  {
      id: 1,
      table: "T-1",
      time: "12:00",
      guests: 3,
      status: "upcoming",
      details: {
          name: "John Doe",
          menu: "Pasta, Salad",
          payment: "Paid",
      },
      booked_for_limit: "90", // 3 guests -> 90 minutes
  },
  {
      id: 2,
      table: "T-3",
      time: "14:15",
      guests: 2,
      status: "ongoing",
      details: {
          name: "Jane Smith",
          menu: "Steak, Wine",
          payment: "Pending",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
  {
      id: 3,
      table: "T-6",
      time: "16:30",
      guests: 4,
      status: "canceled",
      details: {
          name: "Alice Johnson",
          menu: "Sushi, Tea",
          payment: "Refunded",
      },
      booked_for_limit: "120", // 4 guests -> 120 minutes
  },
  {
      id: 4,
      table: "T-2",
      time: "11:00",
      guests: 2,
      status: "upcoming",
      details: {
          name: "Michael Brown",
          menu: "Burger, Fries",
          payment: "Paid",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
  {
      id: 5,
      table: "T-4",
      time: "18:00",
      guests: 6,
      status: "ongoing",
      details: {
          name: "Sarah Lee",
          menu: "Seafood Platter, Juice",
          payment: "Pending",
      },
      booked_for_limit: "180", // 6 guests -> 180 minutes
  },
  {
      id: 6,
      table: "T-5",
      time: "20:30",
      guests: 8,
      status: "upcoming",
      details: {
          name: "Tom Hanks",
          menu: "Pizza, Beer",
          payment: "Paid",
      },
      booked_for_limit: "240", // 8 guests -> 240 minutes
  },
  {
      id: 7,
      table: "T-7",
      time: "09:30",
      guests: 3,
      status: "canceled",
      details: {
          name: "Emma Watson",
          menu: "Coffee, Bagel",
          payment: "Refunded",
      },
      booked_for_limit: "90", // 3 guests -> 90 minutes
  },
  {
      id: 8,
      table: "T-8",
      time: "19:00",
      guests: 2,
      status: "upcoming",
      details: {
          name: "Chris Evans",
          menu: "Salad, Water",
          payment: "Paid",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
  {
      id: 9,
      table: "T-10",
      time: "13:00",
      guests: 5,
      status: "ongoing",
      details: {
          name: "Robert Downey",
          menu: "Sushi, Wine",
          payment: "Pending",
      },
      booked_for_limit: "150", // 5 guests -> 150 minutes
  },
  {
      id: 10,
      table: "T-12",
      time: "15:30",
      guests: 6,
      status: "upcoming",
      details: {
          name: "Scarlett Johansson",
          menu: "Pasta, Wine",
          payment: "Paid",
      },
      booked_for_limit: "180", // 6 guests -> 180 minutes
  },
  {
      id: 11,
      table: "T-13",
      time: "17:45",
      guests: 4,
      status: "canceled",
      details: {
          name: "Chris Hemsworth",
          menu: "Steak, Beer",
          payment: "Refunded",
      },
      booked_for_limit: "120", // 4 guests -> 120 minutes
  },
  {
      id: 12,
      table: "T-15",
      time: "12:30",
      guests: 2,
      status: "ongoing",
      details: {
          name: "Natalie Portman",
          menu: "Salad, Juice",
          payment: "Pending",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
  {
      id: 13,
      table: "T-16",
      time: "14:00",
      guests: 3,
      status: "upcoming",
      details: {
          name: "Mark Ruffalo",
          menu: "Pizza, Soda",
          payment: "Paid",
      },
      booked_for_limit: "90", // 3 guests -> 90 minutes
  },
  {
      id: 14,
      table: "T-17",
      time: "18:30",
      guests: 2,
      status: "canceled",
      details: {
          name: "Paul Rudd",
          menu: "Burger, Beer",
          payment: "Refunded",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
  {
      id: 15,
      table: "T-19",
      time: "20:00",
      guests: 6,
      status: "ongoing",
      details: {
          name: "Chris Pratt",
          menu: "Seafood, Wine",
          payment: "Pending",
      },
      booked_for_limit: "180", // 6 guests -> 180 minutes
  },
  {
      id: 16,
      table: "T-20",
      time: "13:30",
      guests: 4,
      status: "upcoming",
      details: {
          name: "Zoe Saldana",
          menu: "Salad, Smoothie",
          payment: "Paid",
      },
      booked_for_limit: "120", // 4 guests -> 120 minutes
  },
  {
      id: 17,
      table: "T-21",
      time: "17:00",
      guests: 2,
      status: "completed",
      details: {
          name: "Vin Diesel",
          menu: "Pizza, Beer",
          payment: "Paid",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
  {
      id: 18,
      table: "T-22",
      time: "10:00",
      guests: 4,
      status: "completed",
      details: {
          name: "Leonardo DiCaprio",
          menu: "Tacos, Margaritas",
          payment: "Paid",
      },
      booked_for_limit: "120", // 4 guests -> 120 minutes
  },
  {
      id: 19,
      table: "T-23",
      time: "16:00",
      guests: 5,
      status: "ongoing",
      details: {
          name: "Jennifer Aniston",
          menu: "Pasta, Red Wine",
          payment: "Pending",
      },
      booked_for_limit: "150", // 5 guests -> 150 minutes
  },
  {
      id: 20,
      table: "T-24",
      time: "20:00",
      guests: 7,
      status: "upcoming",
      details: {
          name: "Dwayne Johnson",
          menu: "Steak, Whiskey",
          payment: "Paid",
      },
      booked_for_limit: "210", // 7 guests -> 210 minutes
  },
  {
      id: 21,
      table: "T-25",
      time: "15:15",
      guests: 3,
      status: "canceled",
      details: {
          name: "Scarlett Johansson",
          menu: "Pizza, Salad",
          payment: "Refunded",
      },
      booked_for_limit: "90", // 3 guests -> 90 minutes
  },
  {
      id: 22,
      table: "T-26",
      time: "11:30",
      guests: 2,
      status: "completed",
      details: {
          name: "Chris Evans",
          menu: "Sushi, Tea",
          payment: "Paid",
      },
      booked_for_limit: "60", // 2 guests -> 60 minutes
  },
];


  return (
    <>
    
    {loading && <Loader />}
    
    
    <div className="Full-calendar">
      {/* calendar controls */}
      <div className="calendar-controlsssssss">


      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    color: "black", // Set all text to black
    fontWeight: "bold",
    fontSize: "20px", // Adjust font size for date text if needed
  }}
>
  <button
    style={{
      background: "none",
      border: "none",
      fontSize: "36px", // Larger font size for bigger arrows
      color: "black", // Set arrows color to black
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={handlePrevDay}
  >
    &#8592;
  </button>
  
  <span>{formatDate(currentDate)}</span>
  
  <button
    style={{
      background: "none",
      border: "none",
      fontSize: "36px", // Larger font size for bigger arrows
      color: "black", // Set arrows color to black
      cursor: "pointer",
      fontWeight: "bold",
    }}
    onClick={handleNextDay}
  >
    &#8594;
  </button>
</div>





        <div className="Secondchild-calendar-controls">


          {/* <button className="book-calendar" onClick={handleSlotModalOpen}>
            Booking Slots
          </button> */}

          {/* <Button className="book-calendar" onClick={() => setShowModal(true)}>
            Book A Table
          </Button> */}



        </div>
      </div>




<div>
      {/* <EventTable initialBookings={bookingsssssssssssss} /> */}

      <EventTable 
      initialBookings={AllDataOfAPI} 
      ChoosenDate={ChoosenDate}
      handleGetAllBookingMainData={() => handleGetAllData(ChoosenDate)}
      />

    </div>


















































      
    

      {/* Booking Modal for table */}
      <BookingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSaveBooking}
      />

      {/* Slot Booking Modal */}
      <SlotBookingModal
        show={showSlotBookingModal}
        handleClose={handleSlotModalClose}
      />













{/* 
      <div className="booking-container mt-5">

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



      </div> */}











{isCommonMassageModalOpen && (
<CommonModal
        isOpen={isCommonMassageModalOpen}
        message="No new bookings made!"
        onClose={() => setIsCommonMassageModalOpen(false)}
      />
)}

      
    </div>
    </>

  );
};

export default FullCalender;
