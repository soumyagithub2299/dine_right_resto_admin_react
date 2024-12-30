import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft, FaTimes } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillPlusSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import "../GuestTimeSlot/CreatePassword.css";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Loader from "./../../../../src/Loader/Loader/Loader";

const CreateAccount = ({ handleNext }) => {
  const [userId, setUserId] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [panno, setPanno] = useState("");
  const [gstno, setGstno] = useState("");
  const [liquorLicense, setLiquorLicense] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [liquorLicenseType, setLiquorLicenseType] = useState("");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/Login");
  };

  const validateForm = () => {
    const newErrors = {};
    const phonePattern = /^[0-9]{10}$/;
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const gstPattern = /^[0-9A-Z]{15}$/;

    if (!name) newErrors.name = "Full Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!phone) newErrors.phone = "Phone number is required.";
    if (!panno) newErrors.panno = "PAN card number is required.";
    if (!gstno) newErrors.gstno = "GSTIN Number is required.";

    // if (!liquorLicense)
    //   newErrors.liquorLicense = "Liquor license copy is required.";

    if (uploadedImages.length === 0)
      newErrors.uploadedImages = "FSSAI license copy is required.";

    if (phone && !phonePattern.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (panno && !panPattern.test(panno)) {
      newErrors.panno =
        "PAN card number must be 10 characters (5 letters, 4 digits, 1 letter).";
    }
    if (gstno && !gstPattern.test(gstno)) {
      newErrors.gstno = "GSTIN Number must be 15 characters.";
    }

    return newErrors;
  };

  const handleFormSubmit = async (e) => {

    //  handleNext();

    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => toast.error(error));
    } else {
      setErrors({});

      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("username", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("pancard", panno);
        formData.append("gst_no", gstno);

        formData.append("license_image", liquorLicense);

        const imageFiles = uploadedImages.map(image => image.file);

        imageFiles.forEach(file => {
          formData.append('image', file);
        });



        const response = await axios.post(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/createOrUpdate`,
          formData
        );

        setLoading(false);

        if (response.data.response === true) {

          toast.success(response.data.success_msg || "Submitted successfully!");

          sessionStorage.setItem("newSignUpRestoUserId",response?.data?.userId);

         handleNext();


        } else {
          toast.error(
            response.data.error_msg ||
              "Error creating account. Please try again."
          );
        }
      } catch (error) {
        setLoading(false);
        console.error("Error during account creation:", error);
        toast.error("An error occurred during account creation.");
      }
    }
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG, JPEG, and PDF files are allowed.");
        setLiquorLicense(null);
        return;
      }

      setLiquorLicense(file);
      setLiquorLicenseType(file.type);

      setErrors((prevErrors) => {
        const { liquorLicense, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleFileDelete = () => {
    setLiquorLicense(null); // Remove file
    setLiquorLicenseType(""); // Reset file type
  };

  
  const handleMultipleFileUpload = (files) => {
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    const newImages = Array.from(files)
      .map((file) => {
        // Check file type
        if (!allowedTypes.includes(file.type)) {
          toast.error("Only PNG, JPEG, and PDF files are allowed.");
          return null; // Skip invalid files
        }
        return { id: URL.createObjectURL(file), file }; // Store file object here
      })
      .filter(Boolean); // Remove null values

    setUploadedImages((prevImages) => [...prevImages, ...newImages]);

    if (errors.uploadedImages) {
      setErrors((prevErrors) => {
        const { uploadedImages, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const removeImage = (id) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  };

  const handleChange = (setter, field, pattern) => (e) => {
    const value = e.target.value;
    setter(value);

    if (errors[field] && (!pattern || pattern.test(value))) {
      setErrors((prevErrors) => {
        const { [field]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="new-verify-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-head">
            {/* <FaAngleLeft
              onClick={handleBackClick}
              style={{ cursor: "pointer" }}
            /> */}
            Create an account
          </h2>

          {/* Input for Name */}
          <label htmlFor="name" className="login-label">
            Full Name of Owner <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="login-input"
            value={name}
            onChange={handleChange(setName, "name")}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}

          {/* Input for Email */}
          <label htmlFor="email" className="login-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => {
              const { value } = e.target;
              setEmail(value);

              // Email validation regex
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              // Validate email
              if (emailRegex.test(value)) {
                setErrors((prev) => ({ ...prev, email: "" })); // Clear error if valid
              } else {
                setErrors((prev) => ({
                  ...prev,
                  email: "Please enter a valid email address.",
                }));
              }
            }}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          {/* Input for Phone */}
          <label htmlFor="phone" className="login-label">
            Phone Number (only 10 digits) <span className="text-danger">*</span>
          </label>
          <input
            type="text" // Keep type as text
            id="phone"
            className="login-input"
            value={phone}
            onChange={(e) => {
              const { value } = e.target;

              // Only allow numbers and ensure length is 10
              if (/^\d{0,10}$/.test(value)) {
                setPhone(value);
                if (value.length === 10) {
                  setErrors((prev) => ({ ...prev, phone: "" })); // Clear error when valid
                }
              }
            }}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          {/* Input for PAN Number */}
          <label htmlFor="panno" className="login-label">
            PAN Card Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="panno"
            className="login-input"
            value={panno}
            onChange={(e) => {
              const value = e.target.value.toUpperCase(); // Convert input to uppercase
              setPanno(value);

              // PAN number validation regex
              const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

              // Validate PAN
              if (panRegex.test(value)) {
                setErrors((prev) => ({ ...prev, panno: "" })); // Clear error if valid
              } else if (value.length === 10) {
                setErrors((prev) => ({
                  ...prev,
                  panno:
                    "Invalid PAN format. It should be of the format: AAAAA9999A",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  panno: "PAN must be 10 characters long.",
                }));
              }
            }}
            minLength={10} // Minimum length of PAN
            maxLength={10} // Maximum length of PAN
            required
          />
          {errors.panno && <span className="error">{errors.panno}</span>}

          {/* Input for GSTIN */}
          <label htmlFor="gstno" className="login-label">
            GSTIN Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="gstno"
            className="login-input"
            value={gstno}

            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              setGstno(value);

              // GSTIN validation regex
              const gstRegex = /^[0-9A-Z]{15}$/;

              // Validate GSTIN
              if (gstRegex.test(value)) {
                setErrors((prev) => ({ ...prev, gstno: "" })); // Clear error if valid
              } else if (value.length === 15) {
                setErrors((prev) => ({
                  ...prev,
                  gstno:
                    "Invalid GSTIN format. It should be 15 characters long.",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  gstno: "GSTIN must be 15 characters long.",
                }));
              }
            }}
            minLength={15} // Minimum length of GSTIN
            maxLength={15} // Maximum length of GSTIN
            required
          />
          {errors.gstno && <span className="error">{errors.gstno}</span>}

          <hr />

          {/* FSSAI License Section */}
          <label htmlFor="file-upload" className="login-label">
            FSSAI license copy <span className="text-danger">*</span>
          </label>

          <div style={{ margin: "20px" }}>
            {/* <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={(e) => handleMultipleFileUpload(e.target.files)}
              required
              multiple
            /> */}

<input
  type="file"
  id="file-upload"
  style={{ display: "none" }}
  onChange={(e) => {
    handleMultipleFileUpload(e.target.files);
    e.target.value = null; // Reset the input value to allow re-selection of the same file
  }}
  required
  multiple
/>


            <label
              htmlFor="file-upload"
              style={{
                display: "block",
                cursor: "pointer",
                backgroundColor: "#f7f7f7",
                border: "1px dashed #ccc",
                padding: "10px",
                textAlign: "center",
                borderRadius: "8px",
                transition: "background-color 0.2s ease",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f7f7f7")
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IoCloudUploadOutline
                  style={{ fontSize: "36px", color: "#999" }}
                />
                <p>
                  Browse and choose the files you want to upload from your
                  computer
                </p>

                {/* <AiFillPlusSquare
                  style={{ fontSize: "24px", color: "#999", marginTop: "10px" }}
                /> */}
              </div>
            </label>

            {uploadedImages.length > 0 && (
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {uploadedImages.map(({ id, file }, index) => (
                  <div
                    key={id}
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "200px",
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "#f7f7f7",
                      margin: "5px",
                    }}
                  >
                    {file.type.includes("image") ? (
                      <img
                        src={id}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "4px",
                        }} // Changed to 'contain'
                      />
                    ) : (
                      <iframe
                        src={id}
                        title={`Preview ${index + 1}`}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                    <FaTimes
                      className="remove-icon"
                      onClick={() => removeImage(id)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        fontSize: "24px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {errors.uploadedImages && (
              <span
                style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
              >
                {errors.uploadedImages}
              </span>
            )}

            <p
              style={{
                fontSize: "14px",
                color: "red",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Only accept image (PNG, JPEG) and PDF files.
            </p>
          </div>

          <hr />

          {/* Liquor License Section */}
          <label htmlFor="liquor-license-upload" className="login-label">
            Liquor license copy (only if available)
          </label>

          <div style={{ margin: "20px" }}>
            {/* <input
              type="file"
              id="liquor-license-upload"
              style={{ display: "none" }}
              onChange={(e) => handleFileUpload(e.target.files)}
              // required
            /> */}


<input
  type="file"
  id="liquor-license-upload"
  style={{ display: "none" }}
  onChange={(e) => {
    handleFileUpload(e.target.files);
    e.target.value = null; // Reset the input value to allow re-selection of the same file
  }}
/>

            <label
              htmlFor="liquor-license-upload"
              style={{
                display: "block",
                cursor: "pointer",
                backgroundColor: "#f7f7f7",
                border: "1px dashed #ccc",
                padding: "10px",
                textAlign: "center",
                borderRadius: "8px",
                transition: "background-color 0.2s ease",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f7f7f7")
              }
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IoCloudUploadOutline
                  style={{ fontSize: "36px", color: "#999" }}
                />
                <p>
                  Browse and choose the file you want to upload from your
                  computer
                </p>
                {/* <AiFillPlusSquare
                  style={{ fontSize: "24px", color: "#999", marginTop: "10px" }}
                /> */}
              </div>
            </label>

            {liquorLicense && (
              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "#f7f7f7",
                  }}
                >
                  {liquorLicenseType.includes("image") ? (
                    <img
                      src={URL.createObjectURL(liquorLicense)}
                      alt="Liquor License Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: "4px",
                      }} // Changed to 'contain'
                    />
                  ) : (
                    <iframe
                      src={URL.createObjectURL(liquorLicense)}
                      title="Liquor License PDF"
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                </div>
              </div>
            )}

            {liquorLicense && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <AiOutlineDelete
                  onClick={handleFileDelete}
                  style={{
                    fontSize: "24px",
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              </div>
            )}

            {errors.liquorLicense && (
              <span
                style={{ color: "red", fontSize: "14px", marginTop: "10px" }}
              >
                {errors.liquorLicense}
              </span>
            )}

            <p
              style={{
                fontSize: "14px",
                color: "red",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Only accept image (PNG, JPEG), and PDF files.
            </p>
          </div>

          <hr />

          <button type="submit" className="login-btn">
            Create account
          </button>

          {/* 
          <p
            className="Rendering-Login-newAccount mt-2"
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </p>
 */}

          <div
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
