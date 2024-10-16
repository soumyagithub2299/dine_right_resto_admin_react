import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import Soup from "./Soup/Soup";
import Salad from "./Salad/Salad";
import MainCourse from "./MainCourse/MainCourse";
import Dessert from "./Dessert/Dessert";
import AddButtonMenu from "./AddButtonMenu/AddButtonMenu";
import Appetizer from "./Appetizer/Appetizer";
import Beverages from "./Beverages/Beverages";
import { toast } from "react-toastify";
import axios from "axios";
import MenuListingDynamic from "./MenuListingDynamic";
import Loader from "../../Loader/Loader/Loader";

const Menu = () => {

  const [loading, setLoading] = useState(false);

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













  const [AllDataOfAPI, setAllDataOfAPI] = useState([]);
  


  const handleGetAllData = async () => {
    const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
  
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getMasterMenuItems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // setLoading(false);
   
  
      if (response?.data) {
        setLoading(false);

        setAllDataOfAPI(response?.data);

      } else {
      setLoading(false);

        const errorMsg = response.data?.error_msg || "Data fetching failed.";
        toast.error(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Verification failed:", error);
      toast.error("An error occurred, please try again.");
    }
  };
  

  useEffect(() => {
    handleGetAllData();
  }, []);








  
  const getMenuByName = (menuName) => {
    
    if (Array.isArray(AllDataOfAPI) && AllDataOfAPI.length > 0) {
      const menuuuuu = AllDataOfAPI.find(mn => mn?.menu_name === menuName);
      return menuuuuu || {}; 
    } else {
      return {}; 
    }
  };
  
  
    const soupData = getMenuByName("Soup");
    const appetizerData = getMenuByName("Appetizer");
    const saladData = getMenuByName("Salad");
    const mainCourceData = getMenuByName("Main Course");
    const dessertData = getMenuByName("Dessert");
    const beveragesData = getMenuByName("Beverages");





  return (
    <>
      {loading && <Loader />}

       <div className={`content-container ${value ? 'sidebar-open' : 'sidebar-closed'}`} >

       <AddButtonMenu handleGetAllData={handleGetAllData} />


  
       {/* <Soup AllData={soupData} />
       <Appetizer/>
       <Salad/>
       <MainCourse/>
       <Dessert/>
       <Beverages/> */}

       <MenuListingDynamic AllData={soupData}  handleGetAllData={handleGetAllData} />
       <MenuListingDynamic AllData={appetizerData} handleGetAllData={handleGetAllData} />
       <MenuListingDynamic AllData={saladData} handleGetAllData={handleGetAllData} />
       <MenuListingDynamic AllData={mainCourceData} handleGetAllData={handleGetAllData} />
       <MenuListingDynamic AllData={dessertData} handleGetAllData={handleGetAllData} />
       <MenuListingDynamic AllData={beveragesData} handleGetAllData={handleGetAllData} />


    </div>
    </>
   
  );
};

export default Menu;
