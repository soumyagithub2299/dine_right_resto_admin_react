import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import AddButtonMenu from "./AddButtonMenu/AddButtonMenu";
import Course2 from "./Course2/Course2";
import Course3 from "./Course3/Course3";
import Course4 from "./Course4/Course4";
import Course5 from "./Course5/Course5";
// import Customize from "./Customize/Customize";

const Course = () => {

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem('isSidebarOpen');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  // Effect to poll localStorage value repeatedly
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedValue = localStorage.getItem('isSidebarOpen');
      const parsedValue = storedValue !== null ? JSON.parse(storedValue) : true;
      
      if (parsedValue !== value) {
        setValue(parsedValue);
        console.log('LocalStorage value updated:', parsedValue); // Log the updated value
      }
    };

    // Polling interval in milliseconds (e.g., 10ms)
    const intervalId = setInterval(checkLocalStorage, 10);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [value]);

  useEffect(() => {
    console.log('Component updated, current value:', value);
  }, [value]);



  return (
    <>
      {console.log('After',value)}
       <div className={`content-container ${value ? 'sidebar-open' : 'sidebar-closed'}`} >
        <div className="mt-5">
       {/* <AddButtonMenu/> */}
       <Course2/>
       <Course3/>
       <Course4/>
       <Course5/>
       {/* <Customize/> */}
       </div>
    </div>
    </>
   
  );
};

export default Course;
