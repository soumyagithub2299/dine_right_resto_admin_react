import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookingModal from "../BookingModal/BookingModal";

const EventTable = ({ initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedTimeZone, setSelectedTimeZone] = useState("Morning");
  const [openDialog, setOpenDialog] = useState(false);
  const [openClearDialog, setOpenClearDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [newBookingModal, setNewBookingModal] = useState(false);
  const [newSelectedBookingTable, setNewSelectedBookingTable] = useState(null);



  // Generate time slots for the x-axis
  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    const hours = i < 10 ? `0${i}` : i;
    timeSlots.push(`${hours}:00`); // Add the hour
    timeSlots.push(`${hours}:15`); // Add 15 minutes
    timeSlots.push(`${hours}:30`); // Add 30 minutes
    timeSlots.push(`${hours}:45`); // Add 45 minutes
  }

  const timeZones = {
    Morning: timeSlots.slice(6 * 4, 12 * 4), // 06:00 - 12:00
    Afternoon: timeSlots.slice(12 * 4, 17 * 4), // 12:00 - 17:00
    Evening: timeSlots.slice(17 * 4, 21 * 4), // 17:00 - 21:00
    Night: timeSlots.slice(21 * 4).concat(timeSlots.slice(0, 6 * 4)), // 21:00 - 06:00 (Wraps around)
    All: timeSlots, // Display all time slots
  };

  const isTableBooked = (tableName, timeSlot) => {
    return bookings.find(
      (booking) => booking.table === tableName && booking.time === timeSlot
    );
  };

  // const handleCellClick = (table, timeSlot) => {
  //   const booking = isTableBooked(table.name, timeSlot);
  //   if (booking) {
  //     setSelectedBooking(booking);
  //     setOpenDialog(true);
  //   }
  // };

  const handleCellClick = (table, timeSlot) => {
    const booking = isTableBooked(table.name, timeSlot); 
    if (booking) {
      setSelectedBooking(booking);
      setOpenDialog(true);
    } else {
      setNewSelectedBookingTable({ table, timeSlot });
      setNewBookingModal(true); 
    }
  };

  const handleCloseNewBookingModal = () => {
    setNewBookingModal(false);
    // Optionally reset selectedBooking or perform other actions
  };

  const handleSaveBooking = (newBooking) => {
    // Logic to save the new booking
    console.log("Saving booking:", newBooking);
    // Close modal after saving
    setNewBookingModal(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleClearTable = () => {
    if (selectedBooking) {
      setBookings(
        (prevBookings) =>
          prevBookings.filter((booking) => booking.id !== selectedBooking.id) // Ensure there's a unique identifier
      );
      handleCloseDialog();
      setOpenClearDialog(false);
    }
  };

  const tableGroups = [
    {
      heading: "BAR",
      totalCapacity: "24",
      tables: [
        { id: 1, name: "T-1", capacity: 4 },
        { id: 2, name: "T-2", capacity: 2 },
        { id: 3, name: "T-3", capacity: 6 },
        { id: 4, name: "T-4", capacity: 4 },
        { id: 5, name: "T-5", capacity: 8 },
      ],
    },
    {
      heading: "Roof",
      totalCapacity: "22",
      tables: [
        { id: 6, name: "T-6", capacity: 2 },
        { id: 7, name: "T-7", capacity: 4 },
        { id: 8, name: "T-8", capacity: 2 },
        { id: 9, name: "T-9", capacity: 6 },
        { id: 10, name: "T-10", capacity: 8 },
      ],
    },
    {
      heading: "Terrace",
      totalCapacity: "24",

      tables: [
        { id: 11, name: "T-11", capacity: 4 },
        { id: 12, name: "T-12", capacity: 6 },
        { id: 13, name: "T-13", capacity: 8 },
        { id: 14, name: "T-14", capacity: 4 },
        { id: 15, name: "T-15", capacity: 2 },
      ],
    },
    {
      heading: "Garden",
      totalCapacity: "26",

      tables: [
        { id: 16, name: "T-16", capacity: 4 },
        { id: 17, name: "T-17", capacity: 2 },
        { id: 18, name: "T-18", capacity: 8 },
        { id: 19, name: "T-19", capacity: 6 },
        { id: 20, name: "T-20", capacity: 4 },
        { id: 21, name: "T-21", capacity: 2 },
      ],
    },
  ];

  return (
    <>
      {/* Button group for selecting time zones */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            marginTop: "10px",
            width: "500px",
            display: "flex",
          }}
        >
          {Object.keys(timeZones).map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedTimeZone(zone)}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#f0e68c"; // Light yellow on hover
                e.currentTarget.style.color = "black"; // Text color on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  selectedTimeZone === zone ? "#ADD8E6" : "#ffffff"; // Reset background based on selection
                e.currentTarget.style.color =
                  selectedTimeZone === zone ? "#1976d2" : "black"; // Reset text color based on selection
              }}
              style={{
                backgroundColor:
                  selectedTimeZone === zone ? "#ADD8E6" : "#ffffff", // Active button light blue
                color: selectedTimeZone === zone ? "#1976d2" : "black", // Active text blue, default black
                border: "1px solid #ddd",
                width: "100%",
                padding: "10px 20px",
                margin: "0 5px",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s", // Smooth transition on hover
              }}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* Color Notations */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          cursor: "default",
          maxWidth: "990px", // Set a maximum width for the container
          margin: "20px auto", // Center the container
          padding: "0 20px", // Add padding to the left and right
          boxSizing: "border-box", // Ensure padding is included in the width
        }}
      >
        <div style={{ textAlign: "center", flex: "1" }}>
          <div
            style={{
              backgroundColor: "#90ee90",
              border: "1px solid #A0C4E8", // Adding border color
              width: "20px",
              height: "20px",
              display: "inline-block",
            }}
          ></div>
          <span style={{ marginLeft: "5px" }}>Ongoing</span>
        </div>
        <div style={{ textAlign: "center", flex: "1" }}>
          <div
            style={{
              backgroundColor: "#ffeb3b",
              border: "1px solid #A0D99D", // Adding border color
              width: "20px",
              height: "20px",
              display: "inline-block",
            }}
          ></div>
          <span style={{ marginLeft: "5px" }}>Upcoming</span>
        </div>
        <div style={{ textAlign: "center", flex: "1" }}>
          <div
            style={{
              backgroundColor: "#2196f3",
              border: "1px solid #D0D0D0", // Adding border color
              width: "20px",
              height: "20px",
              display: "inline-block",
            }}
          ></div>
          <span style={{ marginLeft: "5px" }}>Completed</span>
        </div>
        <div style={{ textAlign: "center", flex: "1" }}>
          <div
            style={{
              backgroundColor: "#ff6347",
              border: "1px solid #FF9999", // Adding border color
              width: "20px",
              height: "20px",
              display: "inline-block",
            }}
          ></div>
          <span style={{ marginLeft: "5px" }}>Cancelled</span>
        </div>
      </div>

      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table stickyHeader style={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              {/* <TableCell style={{ width: "100px" }}></TableCell> */}

              <TableCell
                style={{
                  width: "100px",
                  // height: "100px",
                  position: "relative",
                  textAlign: "center",
                  padding: 0,
                }}
              >
                {/* Diagonal background from top-left (A) to bottom-right (C) */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to bottom left, lightsalmon 50%, lavender 50%)", // Diagonal from A to C
                    zIndex: -1,
                  }}
                />

                {/* Top-left partition text - Time */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Time
                  </span>
                </div>

                {/* Bottom-right partition text - Tables */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Tables
                  </span>
                </div>
              </TableCell>

              <TableCell
                style={{
                  width: "80px",
                  textAlign: "center",
                  backgroundColor: "#d0d0d0",
                  fontWeight: "bold",
                }}
              >
                Capacity
              </TableCell>
              {timeZones[selectedTimeZone].map((time, index) => {
                const isHour = time.endsWith(":00");
                const displayTime = isHour ? time : time.split(":")[1];

                return (
                  <TableCell
                    key={index}
                    style={{
                      width: isHour ? "58px" : "15px",
                      // backgroundColor: "#e0e0e0",
                      background: "lightsalmon",

                      textAlign: "center",
                      fontSize: isHour ? "16px" : "10px",
                      fontWeight: isHour ? "bold" : "normal",
                      borderBottom: "1px solid #cccccc",
                    }}
                  >
                    {isHour ? displayTime : displayTime}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableGroups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                {/* Row for group heading */}

                <TableRow>
                  <TableCell
                    style={{
                      width: "180px",
                      backgroundColor: "#d0d0d0",
                      fontWeight: "bold",
                    }}
                  >
                    {group.heading}
                  </TableCell>
                  <TableCell
                    style={{
                      width: "80px",
                      textAlign: "center",
                      // backgroundColor: "#ffffff",
                      background: "Azure",
                      fontWeight: "bold",
                    }}
                  >
                    ( {group.totalCapacity} )
                  </TableCell>
                  {/* Empty cells for the time slots */}
                  {Array.from({
                    length: timeZones[selectedTimeZone].length,
                  }).map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      style={{ width: "80px", backgroundColor: "#ffffff" }}
                    ></TableCell>
                  ))}
                </TableRow>

                {/* Rows for each table with details below the heading */}
                {group.tables.map((table, tableIndex) => (
                  <TableRow key={tableIndex}>
                    <TableCell
                      style={{ width: "180px", background: "lavender" }}
                    >
                      {table.name} {/* Display table name */}
                    </TableCell>
                    <TableCell
                      style={{
                        width: "80px",
                        textAlign: "center",
                        // backgroundColor: "#ffffff",
                        background: "Azure",
                      }}
                    >
                      {table.capacity} {/* Display table capacity */}
                    </TableCell>
                    {/* Cells for the time slots */}










                    
                    {timeZones[selectedTimeZone].map((timeSlot, cellIndex) => {
                      const booking = isTableBooked(table.name, timeSlot);
                      let backgroundColor = "#ffffff"; // Default color

                      if (booking) {
                        const { status, guests } = booking; // Destructure guests from booking
                        if (status === "ongoing") {
                          backgroundColor = "#90ee90"; // Green for ongoing
                        } else if (status === "upcoming") {
                          backgroundColor = "#ffeb3b"; // Light yellow/orange for upcoming
                        } else if (status === "completed") {
                          backgroundColor = "#2196f3"; // Blue for completed
                        } else if (status === "canceled") {
                          backgroundColor = "#ff6347"; // Red for canceled
                        }
                      }

                      return (
                        <TableCell
                          key={cellIndex}
                          style={{
                            width: "80px",
                            backgroundColor: booking ? backgroundColor : "transparent",
                            textAlign: "center",
                            // cursor: booking ? "pointer" : "default",
                            cursor: booking ? "pointer" : "pointer",

                            // border: "0.5px solid black",
                            border: "0.5px solid rgba(0, 0, 0, 0.2)",
                          }}
                          onClick={() => handleCellClick(table, timeSlot)}
                          onMouseEnter={(e) => {
                            if (!booking) {
                              e.currentTarget.style.backgroundColor = "lightyellow"; 
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!booking) {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }
                          }}
                        >
                          {booking
                            ? // ? `${booking.table} (${booking.guests} guests)`
                              `${booking.guests}`
                            : // : table.name
                              ""}
                        </TableCell>
                      );
                    })}















                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for booking details */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          Booking Details
          <IconButton
            onClick={handleCloseDialog}
            aria-label="close"
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedBooking ? (
            <div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Table:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.table}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Time:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.time}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Booking For:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.booked_for_limit} minutes
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Menu:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.details.menu}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Name:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.details.name}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Guests:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.guests}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "30%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      Status:
                    </td>
                    <td
                      style={{
                        width: "70%",
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {selectedBooking.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No booking selected.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setOpenClearDialog(true)} // Open confirmation dialog
            style={{
              marginTop: "0px",
              marginBottom: "10px",
              marginLeft: "10px",
              marginRight: "10px",
              backgroundColor: "#FFCCCB",
              color: "black",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "red"; // Darker red on hover
              e.currentTarget.style.color = "white"; // White text color on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FFCCCB";
              e.currentTarget.style.color = "black"; // Reset text color
            }}
          >
            Clear Table
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for clear confirmation */}

      {selectedBooking && (
        <Dialog
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
          }}
          open={openClearDialog}
          onClose={() => setOpenClearDialog(false)}
        >
          <DialogTitle>Clear Booking Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to clear the booking for{" "}
            {selectedBooking.details.name} of{" "}
            {selectedBooking ? selectedBooking.table : ""} at{" "}
            {selectedBooking ? selectedBooking.time : ""}?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenClearDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClearTable} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {newBookingModal && (
        <BookingModal
          show={newBookingModal}
          handleClose={handleCloseNewBookingModal}
          onSave={handleSaveBooking}
          newSelectedBookingTable={newSelectedBookingTable}
          bookings={bookings}  
          setBookings={setBookings} 
        />
      )}


    </>
  );
};

export default EventTable;
