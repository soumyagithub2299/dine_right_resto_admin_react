import React from "react";
import "./DashboardNavbar.css";

const DashboardNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="navbar">
      <div className="leftside_navbar_dashboard">
        <div className="DineRightLogo_Dashboard">
          <img src="./assets/images/Dashboard_Navbar/Dine_icon.png" alt="Dine Icon" />
          {/* Conditionally render DINERIGHT.png */}
          {isSidebarOpen && <img src="./assets/images/Dashboard_Navbar/DINERIGHT.png" alt="DineRight Logo" />}
        </div>
        <div className="Hamburger_Dashboard">
          {/* Conditionally render Hamburger or Arrow based on isSidebarOpen */}
          {isSidebarOpen ? (
            <img
              className="Hamburger_MobileResponsive"
              src="./assets/images/Dashboard_Navbar/hamburger.png"
              alt="Hamburger Icon"
              onClick={toggleSidebar}
            />
          ) : (
            <img
              className="Hamburger_MobileResponsive"
              src="./assets/images/Dashboard_Navbar/arrow.png"
              alt="Arrow Icon"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>

      <div className="Centre_navbar_dashboard">
        <input className="Search_dashboard" type="text" placeholder="Search.." />
      </div>


      <div className="Rightside_navbar_dashboard">
        <img src="./assets/images/Dashboard_Navbar/bell.png" alt="" />
        <img src="./assets/images/Dashboard_Navbar/profile_nav.png" alt="" />

      </div>
    </nav>
  );
};

export default DashboardNavbar;
