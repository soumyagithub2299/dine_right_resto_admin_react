import React, { useState } from "react";
import OtpModal from "./OtpModal";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";

const Login = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");




  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      toast.error("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async () => {

    
    if (!validateInputs()) {
      return;
    }

    try {
      setLoading(true);
      const body = {
        email: email,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/loginWithOtp`,
        body
      );


      setLoading(false);

      if (response.data.response === true) {

        // toast.success(response.data.success_msg || "Login successful!");

        setStep(2);

        sessionStorage.setItem("newSignUpRestoUserId",response?.data?.userId);


      } else {

        toast.error(
          response.data.error_msg || "Login failed. Please try again."
        );

      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="main-container">
        <div className="login-container">
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            <h2
              style={{
                cursor: "default",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                fontSize: "24px",
                background:
                  "linear-gradient(90deg, #fffacd, #ffebcd)" /* Light yellow gradient */,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" /* Soft shadow */,
                padding: "10px 20px" /* Adds space around text */,
                borderRadius: "8px" /* Rounded corners */,
                marginBottom: "20px",
              }}
            >
              {/* <i className="fas fa-user" style={{ 
      fontSize: "24px", 
      position: "absolute", 
      left: "0" 
    }}></i>  */}
              <span style={{ textAlign: "center" }}>Restaurant Login</span>
              {/* <i className="fas fa-user" style={{ 
      fontSize: "24px", 
      position: "absolute", 
      right: "0" 
    }}></i> */}
            </h2>

            <label htmlFor="email" className="login-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="login-btn-container">
              <button
                type="submit"
                style={{ width: "30%" }}
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div
              style={{
                marginTop: "10px",
                alignContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/signup"
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
                  Don't have an account? Sign up
                </p>
              </Link>
            </div>
          </form>
        </div>
    
        {step === 2 && (
          <OtpModal
            isOpen={step === 2}
            onHide={() => setStep(0)}
            email={email}
          />
        )}
    
      </div>
    </>
  );
};

export default Login;
