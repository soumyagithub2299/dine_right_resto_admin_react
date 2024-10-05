import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillPlusSquare } from "react-icons/ai";
import "./../CreatePassword/CreatePassword.css";

const CreateAccount = ({ handleNext }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [panno, setPanno] = useState("");
  const [gstno, setGstno] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [errors, setErrors] = useState({});

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
    if (!uploadedImage) newErrors.uploadedImage = "FSSAI license copy is required.";

    if (phone && !phonePattern.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (panno && !panPattern.test(panno)) {
      newErrors.panno = "PAN card number must be 10 characters (5 letters, 4 digits, 1 letter).";
    }
    if (gstno && !gstPattern.test(gstno)) {
      newErrors.gstno = "GSTIN Number must be 15 characters.";
    }

    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleNext();
    }
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="new-verify-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-head">
            <FaAngleLeft onClick={handleBackClick} style={{ cursor: "pointer" }} />
            Create an account
          </h2>
          <label htmlFor="name" className="login-label">Full Name</label>
          <input type="text" id="name" className="login-input" value={name} onChange={(e) => setName(e.target.value)} required />
          {errors.name && <span className="error">{errors.name}</span>}

          <label htmlFor="email" className="login-label">Email</label>
          <input type="email" id="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errors.email && <span className="error">{errors.email}</span>}

          <label htmlFor="phone" className="login-label">Phone</label>
          <input type="number" id="phone" className="login-input" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={10} />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <label htmlFor="pan" className="login-label">PAN card number</label>
          <input type="text" id="pan" className="login-input" value={panno} onChange={(e) => setPanno(e.target.value)} required maxLength={10} />
          {errors.panno && <span className="error">{errors.panno}</span>}

          <label htmlFor="gstno" className="login-label">GSTIN Number</label>
          <input type="text" id="gstno" className="login-input" value={gstno} onChange={(e) => setGstno(e.target.value)} required maxLength={15} />
          {errors.gstno && <span className="error">{errors.gstno}</span>}

          <label htmlFor="file-upload" className="login-label">FSSAI license copy</label>
          <div className="file-upload-container">
            <input type="file" id="file-upload" className="file-input" onChange={(e) => handleFileUpload(e.target.files)} required />
            <label htmlFor="file-upload" className="file-upload-label">
              <div className="upload-content">
                <IoCloudUploadOutline className="upload-icon" />
                <p>Browse and choose the files you want to upload from your computer</p>
                <AiFillPlusSquare className="upload-btn" />
              </div>
            </label>
            {uploadedImage && (
              <div className="uploaded-image-container">
                <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
              </div>
            )}
            {errors.uploadedImage && <span className="error">{errors.uploadedImage}</span>}
          </div>

          <button type="submit" className="login-btn">Create account</button>
          <p onClick={() => navigate("/")} className="Rendering-Login-new">
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaAngleLeft } from "react-icons/fa";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { AiFillPlusSquare } from "react-icons/ai";
// import "./../CreatePassword/CreatePassword.css";
// import { SignUpStepOneAPI, SignUpSendOTPApi } from "./../../../utils/APIs/credentialsApis";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const CreateAccount = ({ handleNext }) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [panno, setPanno] = useState("");
//   const [gstno, setGstno] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false); // Added loading state

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
//     if (!uploadedImage) newErrors.uploadedImage = "FSSAI license copy is required.";

//     if (phone && !phonePattern.test(phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//     }
//     if (panno && !panPattern.test(panno)) {
//       newErrors.panno = "PAN card number must be 10 characters (5 letters, 4 digits, 1 letter).";
//     }
//     if (gstno && !gstPattern.test(gstno)) {
//       newErrors.gstno = "GSTIN Number must be 15 characters.";
//     }

//     return newErrors;
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       toast.error("All fields are required");
//     } else {
//       setErrors({});
      
//       try {
//         const formData = new FormData();
//         formData.append("username", name);
//         formData.append("email", email);
//         formData.append("phone", phone);
//         formData.append("pancard", panno);
//         formData.append("image", uploadedImage); // Ensure this is a File object
//         formData.append("gst_no", gstno);

//         setLoading(true);
//         const response = await axios.post(
//           "https://dineright.techfluxsolutions.com/api/auth/createOrUpdate",
//           formData
//         );

//         console.log("sign up", response);
//         if (response?.data?.response?.response) {
//           const otpResponse = await SignUpSendOTPApi({ email });
//           if (otpResponse?.data?.response?.response) {
//             handleNext();
//           } else {
//             toast.error(otpResponse?.data?.response?.error_msg || "Failed to send OTP.");
//           }
//         } else {
//           toast.error(response?.data?.response?.error_msg || "Failed to create account.");
//         }
//       } catch (err) {
//         console.error("API error:", err);
//         toast.error("An error occurred. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleFileUpload = (files) => {
//     const file = files[0];
//     if (file) {
//       setUploadedImage(file); // Directly store the file object
//     }
//   };

//   return (
//     <div>
//       <div className="new-verify-form">
//         <form className="login-form" onSubmit={handleFormSubmit}>
//           <h2 className="login-head">
//             <FaAngleLeft onClick={handleBackClick} style={{ cursor: "pointer" }} />
//             Create an account
//           </h2>
//           <label htmlFor="name" className="login-label">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             className="login-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           {errors.name && <span className="error">{errors.name}</span>}

//           <label htmlFor="email" className="login-label">Email</label>
//           <input
//             type="email"
//             id="email"
//             className="login-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           {errors.email && <span className="error">{errors.email}</span>}

//           <label htmlFor="phone" className="login-label">Phone</label>
//           <input
//             type="number"
//             id="phone"
//             className="login-input"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             maxLength={10}
//           />
//           {errors.phone && <span className="error">{errors.phone}</span>}

//           <label htmlFor="pan" className="login-label">PAN card number</label>
//           <input
//             type="text"
//             id="pan"
//             className="login-input"
//             value={panno}
//             onChange={(e) => setPanno(e.target.value)}
//             required
//             maxLength={10}
//           />
//           {errors.panno && <span className="error">{errors.panno}</span>}

//           <label htmlFor="gstno" className="login-label">GSTIN Number</label>
//           <input
//             type="text"
//             id="gstno"
//             className="login-input"
//             value={gstno}
//             onChange={(e) => setGstno(e.target.value)}
//             required
//             maxLength={15}
//           />
//           {errors.gstno && <span className="error">{errors.gstno}</span>}

//           <label htmlFor="file-upload" className="login-label">FSSAI license copy</label>
//           <div className="file-upload-container">
//             <input
//               type="file"
//               id="file-upload"
//               className="file-input"
//               onChange={(e) => handleFileUpload(e.target.files)}
//               required
//             />
//             <label htmlFor="file-upload" className="file-upload-label">
//               <div className="upload-content">
//                 <IoCloudUploadOutline className="upload-icon" />
//                 <p>Browse and choose the files you want to upload from your computer</p>
//                 <AiFillPlusSquare className="upload-btn" />
//               </div>
//             </label>
//             {uploadedImage && (
//               <div className="uploaded-image-container">
//                 <p>{uploadedImage.name}</p> {/* Display the file name */}
//               </div>
//             )}
//             {errors.uploadedImage && <span className="error">{errors.uploadedImage}</span>}
//           </div>

//           <button type="submit" className="login-btn" disabled={loading}>
//             Create account
//           </button>
//           <p onClick={() => navigate("/")} className="Rendering-Login-newAccount">
//             Already have an account? Login
//           </p>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateAccount;
