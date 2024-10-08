import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import Soup from "./Soup/Soup";
import Salad from "./Salad/Salad";
import MainCourse from "./MainCourse/MainCourse";
import Dessert from "./Dessert/Dessert";
import AddButtonMenu from "./AddButtonMenu/AddButtonMenu";
import Appetizer from "./Appetizer/Appetizer";
import Beverages from "./Beverages/Beverages";

const Menu = () => {

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
       <AddButtonMenu/>
       <Soup/>
       <Appetizer/>
       <Salad/>
       <MainCourse/>
       <Dessert/>
       <Beverages/>
    </div>
    </>
   
  );
};

export default Menu;
