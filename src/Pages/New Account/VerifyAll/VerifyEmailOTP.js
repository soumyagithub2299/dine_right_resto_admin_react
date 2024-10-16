
import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap"; 
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import axios from "axios";
import "./VerifyNumber.css";
import Loader from "../../../Loader/Loader/Loader";

const VerifyEmailOTP = ({ isOpen, handleNext, handleBack }) => {
  
  const userId = sessionStorage.getItem("newSignUpRestoUserId");


  const [otp, setOtp] = useState(["", "", "", ""]);

  const [timeRemaining, setTimeRemaining] = useState(20);
  const [showResend, setShowResend] = useState(false);


  const [loading, setLoading] = useState(false);
  const [userOtpId, setUserOtpId]=useState();



  const inputRefs = useRef([]);
  const navigate = useNavigate(); 



  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);

    // Only accept numbers
    if (!/^[0-9]$/.test(value) && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  const handleSubmit = async (event) => {

      // handleNext();



    event.preventDefault();
    setLoading(true); 

    try {
      const data = { 
        otp: otp.join(""),
        userId:userId
       };

      // Send a POST request to verify OTP
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/verify-otp`,
        data
      );

      setLoading(false); 

      if (response.data.response === true) {
        toast.success(response.data.success_msg || "OTP verified successfully!"); 
        setOtp(["", "", "", ""]);

 
          const newUserId = response.data.id;
          setUserOtpId(newUserId);
          
          handleNext({ userId: newUserId });

      } else {

        toast.error(response.data.error_msg || "OTP verification failed. Please try again."); 
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during OTP verification:", error);
      toast.error("An error occurred. Please try again."); 
    }
  };





  const handleResend = async () => {
    try {
      const body = {
        userId: userId,
      };

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/resendrestaurantOtp`,
        body
      );

      setLoading(false);

      if (response.data.response === true) {
        setTimeRemaining(20);
        setShowResend(false);
        toast.info("Verification code resent to your email.");
      } else {
        toast.error(response.data.error_msg || "Failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setShowResend(true); // Show "Resend OTP" when the timer ends
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };


  return (
    <>
      {loading && <Loader />} 

      <div className="new-verify-form">
        <div className="verify-form-container">
          <h2 className="login-head">
            {/* <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} /> */}
            Verify account
          </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="otp">
              <label className="verify-label">
                We have sent you a verification code to your email. Please confirm it now.
              </label>
              <div className="verify-input-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    maxLength="1"
                    className="verify-input"
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
            </Form.Group>
            {showResend ? (
              <p
                className="timer resend-txt"
                onClick={handleResend}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Resend OTP
              </p>
            ) : (
              <p style={{ cursor: "default" }} className="timer resend-txt">
                {formatTime(timeRemaining)}
              </p>
            )}

            <hr />

            <button
              variant="primary"
              type="submit"
              className="login-btn"
              disabled={loading}
            >
             Verify
            </button>

            {/* <div
              style={{
                marginTop: "10px",
                alignContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  marginTop: "10px",
                }}
              >
                <p
                  className="SignUp-LoginPage"
                  style={{
                    margin: "0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Already have an account? Login
                </p>
              </Link>
            </div> */}


          </Form>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailOTP;
