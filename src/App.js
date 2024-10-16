import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollToTop/ScrollToTop";
import InternetChecker from "./utils/InternetChecker/InternetChecker";
import Navbar from "./Template/Navbar";
import Login from "./Pages/Credentials/Login/Login";
import NewAccount from "./Pages/New Account/NewAccount";
// import VerifyNumber from "./Pages/New Account/VerifyAll/VerifyNumber";
import VerifyEmail from "./Pages/New Account/VerifyAll/VerifyEmail";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./Template/LayoutMain/LayoutMain/Layout";
import Footer from "./Template/LayoutMain/Footer/Footer";
import Guests from "./Pages/Guests/Guests";
import Bookings from "./Pages/Bookings/Bookings";
import Orders from "./Pages/Orders/Orders";
import Menu from "./Pages/Menu/Menu";
import Course from "./Pages/Course/Course";
import Profile from "./Pages/Profile/Profile";
import Tickets from "./Pages/Tickets/Tickets";
import Points from "./Pages/Points/Points";
import BookSlot from "./Pages/BookSlot/BookSlot";
import EmailModal from "./Pages/Credentials/Login/EmailModal";
import OtpModal from "./Pages/Credentials/Login/OtpModal";
import Uploads from "./Pages/Uploads/Uploads";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isDineRightUserLoggedIn");
    const encryptedToken = sessionStorage.getItem(
      "encryptedTokenForDineRightUser"
    );

    if (isLoggedIn === "true" && encryptedToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Move the Router down here so useLocation works correctly
  return (
    <BrowserRouter>
      <AppContent
        isOffline={isOffline}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        loggedIn={loggedIn}
      />
    </BrowserRouter>
  );
}

function AppContent({ isOffline, loggedIn }) {
  const location = useLocation();

  // Define the layout paths where the Navbar should be hidden
  const isLayoutRoute = [
    "/dashboard",
    "/book-slot",
    "/booking",
    "/guests",
    "/orders",
    "/menu",
    "/course",
    "/profile",
    "/uploads",
    "/tickets",
    "/points",
  ].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {/* Conditionally render the Navbar */}
      {!isLayoutRoute && <Navbar />}
      {isOffline && <InternetChecker />}

      <Routes>
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/signup" element={<NewAccount />} />
        {/* <Route path="/verifyNumber" element={<VerifyNumber />} /> */}
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/" element={<Login />} />
        <Route path="/email-modal" element={<EmailModal />} />
        <Route path="/OTPmodal" element={<OtpModal />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book-slot" element={<BookSlot />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/course" element={<Course />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/points" element={<Points />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
