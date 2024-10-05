import React, { useState, useRef, useEffect } from "react";
import "./EventCalendar.css";
import CalendarControls from "../CalendarControls/CalendarControls";

const tables = [...Array.from({ length: 21 }, (_, i) => `T-${i + 1}`)];

const EventCalendar = ({ modalSelectedTable, modalSelectedTime }) => {
  const [linePosition, setLinePosition] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookTableBoxes, setBookTableBoxes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const calendarRef = useRef(null);
  const cellWidth = 100; // Set the width of each cell
  const cellHeight = 50; // Set the height of each cell

  const getTimes = () => {
    const times = [];
    for (let i = 10; i < 24; i++) {
      times.push(`${i}:00`);
    }
    for (let i = 0; i < 10; i++) {
      times.push(`${i}:00`);
    }
    return times;
  };

  const times = getTimes();

  // Effect to set the line position based on the current time
  useEffect(() => {
    const updateLinePosition = () => {
      const now = new Date();
      const hour = now.getHours();
      const currentHourIndex = hour >= 10 ? hour - 10 : hour + 14; // Adjust index for line position
      const newLinePosition = currentHourIndex * cellHeight; // Calculate position
      setLinePosition(newLinePosition);
    };

    updateLinePosition(); // Initial line position update
    const intervalId = setInterval(updateLinePosition, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const handlePrevDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  // Function to programmatically add a booking box when modal-selected table and time are provided
  useEffect(() => {
    if (modalSelectedTable && modalSelectedTime) {
      const colIndex = times.indexOf(modalSelectedTime);
      const rowIndex = tables.indexOf(modalSelectedTable);

      if (colIndex !== -1 && rowIndex !== -1) {
        const newBox = {
          left: colIndex * cellWidth,
          top: rowIndex * cellHeight,
          width: cellWidth,
          height: cellHeight,
          table: modalSelectedTable,
          time: modalSelectedTime,
        };

        setBookTableBoxes((prevBoxes) => [...prevBoxes, newBox]);
      }
    }
  }, [modalSelectedTable, modalSelectedTime]); // Run when modal values change

  const handleMouseDown = (event) => {
    const calendarEl = calendarRef.current.getBoundingClientRect();
    const clickX = event.clientX - calendarEl.left;
    const clickY = event.clientY - calendarEl.top;

    const colIndex = Math.floor(clickX / cellWidth);
    const rowIndex = Math.floor(clickY / cellHeight);

    const selectedTime = times[colIndex];
    const selectedTable = tables[rowIndex];

    const newBox = {
      left: colIndex * cellWidth,
      top: rowIndex * cellHeight,
      width: cellWidth,
      height: cellHeight,
      table: selectedTable,
      time: selectedTime,
    };

    setBookTableBoxes((prevBoxes) => [...prevBoxes, newBox]);
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const calendarEl = calendarRef.current.getBoundingClientRect();
      const currentX = event.clientX - calendarEl.left;
      const currentY = event.clientY - calendarEl.top;
      setBookTableBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        const lastBox = newBoxes[newBoxes.length - 1];
        const newWidth = currentX - lastBox.left;
        const newHeight = currentY - lastBox.top;

        lastBox.width = Math.max(newWidth, 0);
        lastBox.height = Math.max(newHeight, 0);
        return newBoxes;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="event-calendar">
      {/* Use the CalendarControls component */}
      {/* <CalendarControls
        currentDate={currentDate}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
      /> */}

      <div className="calendar-grid">
        {/* Time Labels and Table Heading */}
        <div className="time-header">
          {times.map((time, index) => (
            <div key={index} className="time-label">
              {time}
            </div>
          ))}
        </div>

        {/* Table Labels on the Left */}
        <div className="table-header">
          <div className="table-label-heading">Table</div>
          {tables.map((table, index) => (
            <div key={index} className="table-label">
              {table}
            </div>
          ))}
        </div>

        {/* Calendar Content */}
        <div
          ref={calendarRef}
          className="calendar-content"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Cells for Calendar */}
          {tables.map((_, rowIndex) =>
            times.map((_, colIndex) => {
              const isTargetCell = tables[rowIndex] === "T-2" && times[colIndex] === "14:00";
              const isCancelledCell = tables[rowIndex] === "T-3" && times[colIndex] === "10:00"; // T-1 at 10 PM
              const isWating = tables[rowIndex] === "T-4" && times[colIndex] === "12:00";
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`calendar-cell ${isTargetCell ? 'target-cell' : ''} ${isCancelledCell ? 'cancelled-cell' : ''} ${isWating ? 'wating-cell' : ''}`} // Apply the cancelled-cell class conditionally
                  style={{ width: cellWidth, height: cellHeight }}
                >
                  {isTargetCell && (
                    <div className="cell-content">
                      <p>Booked Table</p> {/* Heading */}
                      <span>{tables[rowIndex]}</span>
                      <span>{times[colIndex]}</span>
                    </div>
                  )}
                  {isCancelledCell && (
                    <div className="cell-content">
                      <p>Cancelled Table</p> {/* Heading for cancelled table */}
                      <span>{tables[rowIndex]}</span>
                      <span>{times[colIndex]}</span>
                    </div>
                  )}
                  {isWating && (
                    <div className="cell-content">
                      <p>Wating for Guest</p> {/* Heading for cancelled table */}
                      <span>{tables[rowIndex]}</span>
                      <span>{times[colIndex]}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Render Booking Table Boxes */}
          {/* {bookTableBoxes.map((box, index) => (
            <div
              key={index}
              className="book-table-box"
              style={{
                left: `${box.left}px`,
                top: `${box.top}px`,
                width: `${box.width}px`,
                height: `${box.height}px`,
              }}
            >
              <div>{box.table}</div>
              <div>{box.time}</div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
