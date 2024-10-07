import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./VerifyNumber.css";

const VerifyEmailOTP = ({ isOpen, onResendOtp, handleNext, handleBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    let timer = null;

    if (isOpen) {
      if (minutes > 0 || seconds > 0) {
        setIsResendEnabled(false);
        timer = setInterval(() => {
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setIsResendEnabled(true);
            } else {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000);
      } else {
        setIsResendEnabled(true);
      }
    } else {
      clearInterval(timer);
      setMinutes(5);
      setSeconds(0);
      setIsResendEnabled(false);
    }

    return () => clearInterval(timer);
  }, [isOpen, minutes, seconds]);

  const handleChange = (e, index) => {
    const value = e.target.value.slice(0, 1);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext(); // Proceed to the next step
  };

  const handleResendOtp = () => {
    onResendOtp();
    setMinutes(5);
    setSeconds(0);
    setIsResendEnabled(false);
  };

  const formatTime = (minutes, seconds) => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Navigate to the home page
  const handleLoginNavigation = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="new-verify-form">
      <div className="verify-form-container">
        <h2 className="login-head">
          <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} />{" "}
          {/* Calls handleBack */}
          Verify account
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="otp">
            <label className="verify-label">
              We have sent you a verification code to your email. Please confirm
              it now.
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
          <p className="resend-txt">
            Resend verification in <span>{formatTime(minutes, seconds)}</span>
          </p>
          <hr />
          <button variant="primary" type="submit" className="login-btn">
            Submit
          </button>
          <p
            className="Rendering-Login-newAccount"
            style={{ cursor: "pointer" }}
            onClick={handleLoginNavigation} // Call navigation function on click
          >
            Already have an account? Login
          </p>
        </Form>
      </div>
    </div>
  );
};
export default VerifyEmailOTP;




// import React, { useState, useEffect, useRef } from "react";
// import { Form, Spinner } from "react-bootstrap"; 
// import { FaAngleLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom"; 
// import { toast } from "react-toastify"; 
// import axios from "axios";
// import "./VerifyNumber.css";
// import { OTPVerificationAPI } from './../../../utils/APIs/credentialsApis'; 

// const VerifyEmailOTP = ({ isOpen, onResendOtp, handleNext, handleBack }) => {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [minutes, setMinutes] = useState(5);
//   const [seconds, setSeconds] = useState(0);
//   const [isResendEnabled, setIsResendEnabled] = useState(false);
//   const [loading, setLoading] = useState(false); 
//   const inputRefs = useRef([]);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     let timer = null;

//     if (isOpen) {
//       if (minutes > 0 || seconds > 0) {
//         setIsResendEnabled(false);
//         timer = setInterval(() => {
//           if (seconds === 0) {
//             if (minutes === 0) {
//               clearInterval(timer);
//               setIsResendEnabled(true);
//             } else {
//               setMinutes(minutes - 1);
//               setSeconds(59);
//             }
//           } else {
//             setSeconds(seconds - 1);
//           }
//         }, 1000);
//       } else {
//         setIsResendEnabled(true);
//       }
//     } else {
//       clearInterval(timer);
//       setMinutes(5);
//       setSeconds(0);
//       setIsResendEnabled(false);
//     }

//     return () => clearInterval(timer);
//   }, [isOpen, minutes, seconds]);

//   const handleChange = (e, index) => {
//     const value = e.target.value.slice(0, 1);
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }

//     if (!value && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true); 

//     try {
        
//   //   const data = { otp: otp.join("") }; 
//     //   const response = await OTPVerificationAPI(data);

//       const data = { otp: otp.join("") }; 
//       const response = await axios.post(
//        "https://dineright.techfluxsolutions.com/api/auth/verify-otp",
//          data
//       );
//       setLoading(false); 

//       if (response?.data?.response) {
//         toast.success("OTP verified successfully!"); 
//         handleNext(); 
//       } else {
//         toast.error("OTP verification failed. Please try again."); 
//       }
//     } catch (error) {
//       setLoading(false); 
//       console.log(error);
//       toast.error("An error occurred. Please try again."); 
//     }
//   };

//   const handleResendOtp = () => {
//     onResendOtp();
//     setMinutes(5);
//     setSeconds(0);
//     setIsResendEnabled(false);
//   };

//   const formatTime = (minutes, seconds) => {
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };

//   const handleLoginNavigation = () => {
//     navigate("/"); 
//   };

//   return (
//     <div className="new-verify-form">
//       <div className="verify-form-container">
//         <h2 className="login-head">
//           <FaAngleLeft onClick={handleBack} style={{ cursor: "pointer" }} />{" "}
//           Verify account
//         </h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="otp">
//             <label className="verify-label">
//               We have sent you a verification code to your email. Please confirm
//               it now.
//             </label>
//             <div className="verify-input-container">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   value={digit}
//                   onChange={(e) => handleChange(e, index)}
//                   maxLength="1"
//                   className="verify-input"
//                   ref={(el) => (inputRefs.current[index] = el)}
//                 />
//               ))}
//             </div>
//           </Form.Group>
//           <p className="resend-txt">
//             Resend verification in <span>{formatTime(minutes, seconds)}</span>
//           </p>
//           <hr />
          
//           {/* Loading indicator displayed conditionally */}
//           {/* {loading && (
//             <div className="loading-indicator">
//               <Spinner animation="border" variant="primary" />
//               <span> Verifying...</span>
//             </div>
//           )} */}
          
//           <button variant="primary" type="submit" className="login-btn" disabled={loading}>
//             Submit
//           </button>
//           <p
//             className="Rendering-Login-newAccount"
//             style={{ cursor: "pointer" }}
//             onClick={handleLoginNavigation} 
//           >
//             Already have an account? Login
//           </p>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmailOTP;
