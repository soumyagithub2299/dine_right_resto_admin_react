import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import FullCalender from "./FullCalender/FullCalender";
// import EventCalendar from "./EventCalendar/EventCalendar";
// import CalenderComponent from "./CalenderComponent/CalenderComponent";

const BookSlot = () => {

  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem('isSidebarOpen');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  // Effect to poll sessionStorage value repeatedly
  useEffect(() => {
    const checksessionStorage = () => {
      const storedValue = sessionStorage.getItem('isSidebarOpen');
      const parsedValue = storedValue !== null ? JSON.parse(storedValue) : true;
      
      if (parsedValue !== value) {
        setValue(parsedValue);
        console.log('sessionStorage value updated:', parsedValue); // Log the updated value
      }
    };

    // Polling interval in milliseconds (e.g., 10ms)
    const intervalId = setInterval(checksessionStorage, 10);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [value]);



  return (
    <>
       <div className={`content-container ${value ? 'sidebar-open' : 'sidebar-closed'}`}>
      
        {/* <CalenderComponent/> */}
     {/* <EventCalendar/> */}
     <FullCalender/>
    </div>
    </>
   
  );
};

export default BookSlot;
