// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaAngleLeft, FaTimes } from "react-icons/fa";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { AiFillPlusSquare } from "react-icons/ai";
// import "../GuestTimeSlot/CreatePassword.css";

// const CreateAccount = ({ handleNext }) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [panno, setPanno] = useState("");
//   const [gstno, setGstno] = useState("");
//   const [liquorLicense, setLiquorLicense] = useState(null);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const handleBackClick = () => {
//     navigate("/Login");
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const phonePattern = /^[0-9]{10}$/;
//     const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//     const gstPattern = /^[0-9A-Z]{15}$/;

//     if (!name) newErrors.name = "Full Name is required.";
//     if (!email) newErrors.email = "Email is required.";
//     if (!phone) newErrors.phone = "Phone number is required.";
//     if (!panno) newErrors.panno = "PAN card number is required.";
//     if (!gstno) newErrors.gstno = "GSTIN Number is required.";
//     if (!liquorLicense)
//       newErrors.liquorLicense = "Liquor license copy is required.";
//     if (uploadedImages.length === 0)
//       newErrors.uploadedImages = "FSSAI license copy is required.";

//     if (phone && !phonePattern.test(phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//     }
//     if (panno && !panPattern.test(panno)) {
//       newErrors.panno =
//         "PAN card number must be 10 characters (5 letters, 4 digits, 1 letter).";
//     }
//     if (gstno && !gstPattern.test(gstno)) {
//       newErrors.gstno = "GSTIN Number must be 15 characters.";
//     }

//     return newErrors;
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       handleNext();
//     }
//   };

//   const handleFileUpload = (files, setImage) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImage(e.target.result);
//     };
//     reader.readAsDataURL(files[0]);
//   };

//   const handleMultipleFileUpload = (files) => {
//     const newImages = Array.from(files).map((file) => {
//       const reader = new FileReader();
//       return new Promise((resolve) => {
//         reader.onload = (e) => {
//           resolve(e.target.result);
//         };
//         reader.readAsDataURL(file);
//       });
//     });

//     Promise.all(newImages).then((images) => {
//       setUploadedImages((prevImages) => [...prevImages, ...images]);
//     });
//   };

//   const removeImage = (index) => {
//     setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   // Update onChange to remove error if the field is valid
//   const handleChange = (setter, field, pattern) => (e) => {
//     const value = e.target.value;
//     setter(value);

//     if (errors[field] && (!pattern || pattern.test(value))) {
//       setErrors((prevErrors) => {
//         const { [field]: _, ...rest } = prevErrors;
//         return rest;
//       });
//     }
//   };

//   return (
//     <div>
//       <div className="new-verify-form">
//         <form className="login-form" onSubmit={handleFormSubmit}>
//           <h2 className="login-head">
//             <FaAngleLeft
//               onClick={handleBackClick}
//               style={{ cursor: "pointer" }}
//             />
//             Create an account
//           </h2>

//           {/* Input for Name */}
//           <label htmlFor="name" className="login-label">
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             className="login-input"
//             value={name}
//             onChange={handleChange(setName, "name")}
//             required
//           />
//           {errors.name && <span className="error">{errors.name}</span>}

//           {/* Input for Email */}
//           <label htmlFor="email" className="login-label">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="login-input"
//             value={email}
//             onChange={handleChange(setEmail, "email")}
//             required
//           />
//           {errors.email && <span className="error">{errors.email}</span>}

//           {/* Input for Phone */}
//           <label htmlFor="phone" className="login-label">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             id="phone"
//             className="login-input"
//             value={phone}
//             onChange={handleChange(setPhone, "phone", /^[0-9]{10}$/)}
//             required
//           />
//           {errors.phone && <span className="error">{errors.phone}</span>}

//           {/* Input for PAN Number */}
//           <label htmlFor="panno" className="login-label">
//             PAN Card Number
//           </label>
//           <input
//             type="text"
//             id="panno"
//             className="login-input"
//             value={panno}
//             onChange={handleChange(
//               setPanno,
//               "panno",
//               /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
//             )}
//             required
//           />
//           {errors.panno && <span className="error">{errors.panno}</span>}

//           {/* Input for GSTIN */}
//           <label htmlFor="gstno" className="login-label">
//             GSTIN Number
//           </label>
//           <input
//             type="text"
//             id="gstno"
//             className="login-input"
//             value={gstno}
//             onChange={handleChange(setGstno, "gstno", /^[0-9A-Z]{15}$/)}
//             required
//           />
//           {errors.gstno && <span className="error">{errors.gstno}</span>}

//           {/* FSSAI License Section */}
//           <label htmlFor="file-upload" className="login-label">
//             FSSAI license copy
//           </label>
//           <div className="file-upload-container">
//             <input
//               type="file"
//               id="file-upload"
//               className="file-input"
//               onChange={(e) => handleMultipleFileUpload(e.target.files)}
//               required
//               multiple
//             />
//             <label htmlFor="file-upload" className="file-upload-label">
//               <div>
//                 <p>
//                   Browse and choose the files you want to upload from your
//                   computer
//                 </p>
//               </div>
//             </label>
//             <div className="preview-container">
//               {uploadedImages.map((image, index) => (
//                 <div key={index} className="uploaded-image-wrapper">
//                   <img
//                     src={image}
//                     alt="FSSAI License"
//                     className="uploaded-image"
//                   />
//                   <FaTimes
//                     className="remove-icon"
//                     onClick={() => removeImage(index)}
//                   />
//                 </div>
//               ))}
//             </div>
//             {errors.uploadedImages && (
//               <span className="error">{errors.uploadedImages}</span>
//             )}
//           </div>

//           {/* Liquor License Section */}
//           <label htmlFor="liquor-license-upload" className="login-label">
//             Liquor license copy
//           </label>
//           <div className="file-upload-container">
//             <input
//               type="file"
//               id="liquor-license-upload"
//               className="file-input"
//               onChange={(e) =>
//                 handleFileUpload(e.target.files, setLiquorLicense)
//               }
//               required
//             />
//             <label
//               htmlFor="liquor-license-upload"
//               className="file-upload-label"
//             >
//               <div className="upload-content">
//                 <IoCloudUploadOutline className="upload-icon" />
//                 <p>
//                   Browse and choose the file you want to upload from your
//                   computer
//                 </p>
//                 <AiFillPlusSquare className="upload-btn" />
//               </div>
//             </label>
//             {liquorLicense && (
//               <div className="uploaded-image-container">
//                 <img
//                   src={liquorLicense}
//                   alt="Liquor License"
//                   className="uploaded-image"
//                 />
//               </div>
//             )}
//             {errors.liquorLicense && (
//               <span className="error">{errors.liquorLicense}</span>
//             )}
//           </div>

//           <button type="submit" className="login-btn">
//             Create account
//           </button>
//           <p
//             className="Rendering-Login-newAccount mt-2"
//             style={{ cursor: "pointer", textAlign: "center" }}
//             onClick={() => navigate("/")}
//           >
//             Already have an account? Login
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaTimes } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillPlusSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import "../GuestTimeSlot/CreatePassword.css";
import { SignUpStepOneAPI } from "./../../../utils/APIs/credentialsApis";
import axios from "axios";
import Loader from "./../../../../src/Loader/Loader/Loader";

const CreateAccount = ({ handleNext }) => {
  const [userId, setUserId]=useState()
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [panno, setPanno] = useState("");
  const [gstno, setGstno] = useState("");
  const [liquorLicense, setLiquorLicense] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!liquorLicense)
      newErrors.liquorLicense = "Liquor license copy is required.";
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
        formData.append("liquorLicense", liquorLicense);
        uploadedImages.forEach((image, index) => {
          formData.append(`image${index + 1}`, image);
        });

        // const response = await SignUpStepOneAPI(formData);
        const response = await axios.post(
          "https://dineright.techfluxsolutions.com/api/auth/createOrUpdate",
          formData
        );

        setLoading(false);

        if (response.data.response === true) {
          toast.success(response.data.success_msg || "Account created successfully!");
          console.log("get user Id",response?.data?.id)
          const newUserId = response.data.id;
          setUserId(newUserId);
          
          // Pass userId to handleNext
          handleNext({ userId: newUserId });
        } else {
          toast.error(response.data.error_msg || "Error creating account. Please try again.");
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
    if (file) {
      setLiquorLicense(URL.createObjectURL(file));

      if (errors.liquorLicense) {
        setErrors((prevErrors) => {
          const { liquorLicense, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const handleMultipleFileUpload = (files) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setUploadedImages((prevImages) => [...prevImages, ...newImages]);
    if (errors.uploadedImages) {
      setErrors((prevErrors) => {
        const { uploadedImages, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const removeImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
            <FaAngleLeft
              onClick={handleBackClick}
              style={{ cursor: "pointer" }}
            />
            Create an account
          </h2>

          {/* Input for Name */}
          <label htmlFor="name" className="login-label">
            Full Name
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
            Email
          </label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={handleChange(setEmail, "email")}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          {/* Input for Phone */}
          <label htmlFor="phone" className="login-label">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            className="login-input"
            value={phone}
            onChange={handleChange(setPhone, "phone", /^[0-9]{10}$/)}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}

          {/* Input for PAN Number */}
          <label htmlFor="panno" className="login-label">
            PAN Card Number
          </label>
          <input
            type="text"
            id="panno"
            className="login-input"
            value={panno}
            onChange={handleChange(
              setPanno,
              "panno",
              /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
            )}
            required
          />
          {errors.panno && <span className="error">{errors.panno}</span>}

          {/* Input for GSTIN */}
          <label htmlFor="gstno" className="login-label">
            GSTIN Number
          </label>
          <input
            type="text"
            id="gstno"
            className="login-input"
            value={gstno}
            onChange={handleChange(setGstno, "gstno", /^[0-9A-Z]{15}$/)}
            required
          />
          {errors.gstno && <span className="error">{errors.gstno}</span>}

          {/* FSSAI License Section */}
          <label htmlFor="file-upload" className="login-label">
            FSSAI license copy
          </label>
          <div className="file-upload-container">
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={(e) => handleMultipleFileUpload(e.target.files)}
              required
              multiple
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <div>
                <p>
                  Browse and choose the files you want to upload from your
                  computer
                </p>
              </div>
            </label>
            <div className="preview-container">
              {uploadedImages.map((image, index) => (
                <div key={index} className="uploaded-image-wrapper">
                  <img
                    src={image}
                    alt="FSSAI License"
                    className="uploaded-image"
                  />
                  <FaTimes
                    className="remove-icon"
                    onClick={() => removeImage(index)}
                  />
                </div>
              ))}
            </div>
            {errors.uploadedImages && (
              <span className="error">{errors.uploadedImages}</span>
            )}
          </div>

          {/* Liquor License Section */}
          <label htmlFor="liquor-license-upload" className="login-label">
            Liquor license copy
          </label>
          <div className="file-upload-container">
            <input
              type="file"
              id="liquor-license-upload"
              className="file-input"
              onChange={(e) =>
                handleFileUpload(e.target.files, setLiquorLicense)
              }
              required
            />
            <label
              htmlFor="liquor-license-upload"
              className="file-upload-label"
            >
              <div className="upload-content">
                <IoCloudUploadOutline className="upload-icon" />
                <p>
                  Browse and choose the file you want to upload from your
                  computer
                </p>
                <AiFillPlusSquare className="upload-btn" />
              </div>
            </label>
            {liquorLicense && (
              <div className="uploaded-image-container">
                <img
                  src={liquorLicense}
                  alt="Liquor License"
                  className="uploaded-image"
                />
              </div>
            )}
            {errors.liquorLicense && (
              <span className="error">{errors.liquorLicense}</span>
            )}
          </div>

          <button type="submit" className="login-btn">
            Create account
          </button>
          <p
            className="Rendering-Login-newAccount mt-2"
            style={{ cursor: "pointer", textAlign: "center" }}
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
