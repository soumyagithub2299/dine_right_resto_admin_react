import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import AddButtonMenu from "./AddButtonMenu/AddButtonMenu";
import Course2 from "./Course2/Course2";
import Course3 from "./Course3/Course3";
import Course4 from "./Course4/Course4";
import Course5 from "./Course5/Course5";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader/Loader";
import axios from "axios";
import CourceListingDynamic from "./CourceListingDynamic/CourceListingDynamic.js";
// import Customize from "./Customize/Customize";

const Course = () => {
  const [loading, setLoading] = useState(false);

  const [AllDataOfAPI, setAllDataOfAPI] = useState([]);

  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem("isSidebarOpen");
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  // Effect to poll sessionStorage value repeatedly
  useEffect(() => {
    const checksessionStorage = () => {
      const storedValue = sessionStorage.getItem("isSidebarOpen");
      const parsedValue = storedValue !== null ? JSON.parse(storedValue) : true;

      if (parsedValue !== value) {
        setValue(parsedValue);
        console.log("sessionStorage value updated:", parsedValue); // Log the updated value
      }
    };

    // Polling interval in milliseconds (e.g., 10ms)
    const intervalId = setInterval(checksessionStorage, 10);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [value]);




  const handleGetAllData = async () => {
    const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
  
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getCourseMenuGroupByCourseId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setLoading(false);
  
  
      if (response?.data?.response === true) {
        setAllDataOfAPI(response?.data?.data);
      } else {
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


  
const getCourseByName = (courseName) => {
  if (Array.isArray(AllDataOfAPI) && AllDataOfAPI.length > 0) {
    const course = AllDataOfAPI.find(course => course?.course_name === courseName);
    return course || {}; // Return an empty object if not found
  } else {
    console.warn("AllDataOfAPI is empty or not an array");
    return {}; // Return an empty object if the array is empty or not an array
  }
};


  const course2Data = getCourseByName("Course 2");
  const course3Data = getCourseByName("Course 3");
  const course4Data = getCourseByName("Course 4");
  const course5Data = getCourseByName("Course 5");
  const customizeCourseData = getCourseByName("Customize Course");

  return (
    <>
      {loading && <Loader />}

      <div
        className={`content-container ${
          value ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="mt-2">
          {/* <AddButtonMenu/> */}

          {/* <Course2  AllData={course2Data} />
       <Course3  AllData={course3Data} />
       <Course4  AllData={course4Data} />
       <Course5  AllData={course5Data} /> */}

          <CourceListingDynamic AllData={course2Data} />
          <CourceListingDynamic AllData={course3Data} />
          <CourceListingDynamic AllData={course4Data} />
          <CourceListingDynamic AllData={course5Data} />

          {/* <Customize customizeCourseData={customizeCourseData} /> */}
        </div>
      </div>
    </>
  );
};

export default Course;
