import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for routing
import "./Sidebar.css"; // Assuming sidebar styles are in Sidebar.css
import { HiOutlineHome } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { TbNotebook } from "react-icons/tb";
import { IoPeopleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiCookingPot } from "react-icons/pi";
import { MdAttachMoney, MdOutlineFolder } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { TbGraph } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";

const Sidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(""); // State to track the active item
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // console.log("Component updated, current value:", isOpen);
  }, [isOpen]);

  // Set active item based on the current path
  useEffect(() => {
    setActiveItem(location.pathname); // Set the active item based on current path
  }, [location]);

  // Function to set the active item when clicked
  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div style={{
    // overflow: "hidden",
    // position: "fixed", 
  }} className="sidebar-menu-container">
        {/* Sidebar Menu */}
        <ul className="sidebar-menu">
          <Link to="/dashboard">
            <li
              className={`menu-item ${
                activeItem === "/dashboard" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/dashboard")}
            >
              {/* <img className="imgHover" src="./assets/images/Sidebar/dashboard.png" alt="Dashboard" /> */}
              <HiOutlineHome />
              <span className="hover_clr">Dashboard</span>
            </li>
          </Link>

          <Link to="/book-slot">
            <li
              className={`menu-item ${
                activeItem === "/book-slot" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/book-slot")}
            >
              {/* <img src="./assets/images/Sidebar/Book_a_slot.png" alt="Book Slot" /> */}
              <SlCalender />
              <span>Book Slot</span>
            </li>
          </Link>

          <Link to="/booking">
            <li
              className={`menu-item ${
                activeItem === "/booking" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/booking")}
            >
             
              <TbNotebook />
              <span>Bookings</span>
            </li>
          </Link>




          <Link to="/commission">
            <li
              className={`menu-item ${
                activeItem === "/commission" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/commission")}
            >
        
        <AiOutlineTransaction />
              <span>Commission</span>
            </li>
          </Link>




      
{/* 
          <Link to="/orders" className="link">
            <li
              className={`menu-item ${
                activeItem === "/orders" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/orders")}
            >
              <IoNotificationsOutline />
              <span>Orders</span>
            </li>
          </Link> */}

          <Link to="/course">
            <li
              className={`menu-item ${
                activeItem === "/course" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/course")}
            >
              <MdOutlineFolder />
              <span>Course</span>
            </li>
          </Link>

          <Link to="/menu">
            <li
              className={`menu-item ${activeItem === "/menu" ? "active" : ""}`}
              onClick={() => handleItemClick("/menu")}
            >
              <PiCookingPot />
              <span>Menu</span>
            </li>
          </Link>


          <Link to="/guests">
            <li
              className={`menu-item ${
                activeItem === "/guests" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/guests")}
            >
              {/* <img src="./assets/images/Sidebar/Guests.png" alt="Guests" /> */}
              <IoPeopleOutline />
              <span>Guests</span>
            </li>
          </Link>


          <Link to="/profile">
            <li
              className={`menu-item ${
                activeItem === "/profile" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/profile")}
            >
              {/* <img src="./assets/images/Sidebar/Profile.png" alt="Profile" /> */}
              <FaRegUser />
              <span>Profile</span>
            </li>
          </Link>

          <Link to="/uploads">
            <li
              className={`menu-item ${
                activeItem === "/uploads" ? "active" : ""
              }`}
              onClick={() => handleItemClick("/uploads")}
            >
              <TbGraph />
              <span>Uploads</span>
            </li>
          </Link>

          {/* <Link to="/tickets">
          <li className={`menu-item ${activeItem === "/tickets" ? "active" : ""}`} onClick={() => handleItemClick("/tickets")}>
              <BiSupport />
              <span>Tickets</span>
          </li>
          </Link> */}

          {/* <Link to="/points">
          <li className={`menu-item ${activeItem === "/points" ? "active" : ""}`} onClick={() => handleItemClick("/points")}>
              <GoTrophy />
              <span>Points</span>
          </li>
          </Link> */}
        </ul>

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          <ul className="sidebar-menu">
            {/* <Link to="/settings">
              <li
                className={`menu-item ${
                  activeItem === "/settings" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/settings")}
              >
               
                <IoSettingsOutline />
                <span>Settings</span>
              </li>
            </Link> */}

            <Link to="/login">
              {/* <li
                className={`menu-item ${
                  activeItem === "/logout" ? "active" : ""
                }`}
                onClick={() => handleItemClick("/logout")}
              >
                <TbLogout />
                <span>Logout</span>
              </li> */}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
