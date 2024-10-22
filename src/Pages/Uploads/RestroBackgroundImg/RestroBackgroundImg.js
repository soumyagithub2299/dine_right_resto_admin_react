import React, { useEffect, useState } from "react";
import "./RestroBackgroundImg.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";

const RestroBackgroundImg = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);



  const [ImageID, setImageID] = useState(null);

  const [isUploadEnabled, setIsUploadEnabled] = useState(false); // State to track if upload is enabled
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  // Function to handle image selection
  const handleImageSelect = (event) => {

    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/jpg"];

      // Check if the selected file is jpeg or jpg
      if (!validImageTypes.includes(fileType)) {
        toast.error("Please select a JPEG or JPG image!"); // Show toast error
        setIsUploadEnabled(false); // Disable the upload button if incorrect file
        return;
      }

      setSelectedImage(file);
      setIsUploadEnabled(true); // Enable the upload button when a correct file is selected
    }
  };

  // Function to handle image delete
  const handleImageDelete = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API call using axios
      const response = await axios.delete(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/banner_image/${ImageID}`,
        config
      );

      setLoading(false);

      if (response.data.response === true) {
        setSelectedImage(null);
        setIsUploadEnabled(false);
        setShowModal(false);
        setImagePreview(null);
        handleGetBannerImage();
        toast.success(
          response.data.success_msg || "Image deleted successfully!"
        );
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during image upload:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Function to handle API call on upload
  const handleUpload = async () => {
    
    if (!isUploadEnabled) return;

    try {
      setLoading(true);

      // Create FormData to send the image
      const formData = new FormData();
      
      formData.append("banner_image", selectedImage);
      if(ImageID !== null){
      formData.append("banner_image_id", ImageID);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API call using axios
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/banner_image`,
        formData,
        config
      );

      setLoading(false);

      if (response.data.response === true) {

        handleGetBannerImage();
    setSelectedImage(null);

        toast.success(
          response.data.success_msg || "Image uploaded successfully!"
          
        );
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during image upload:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Function to handle API call on upload
  const handleGetBannerImage = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API call using axios
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/banner_image`,
        config
      );

      setLoading(false);

      if (response.data.response === true) {

        setImagePreview(response.data.banner_image);
        setImageID(response.data.banner_image_id);

      } else {
        // toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during image upload:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    handleGetBannerImage();
  }, []);

  // Inline styles for modal
  const modalBackgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // High z-index to appear above other elements
  };

  const modalContainerStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "400px", // Increased width
  };

  const modalButtonGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const confirmDeleteBtnStyle = {
    backgroundColor: "#d9534f", // Bootstrap danger red
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const cancelDeleteBtnStyle = {
    backgroundColor: "#5bc0de", // Bootstrap info blue
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <>
      {loading && <Loader />}

      <div className="container container-RestroBackgroundImg mb-4">
        <p className="Heading-RestroBackgroundImg">
          Upload Restaurant Banner Image:
        </p>
        <p className="recommendation-text-RestroBackgroundImg">
          Recommended height : <strong>450px</strong>
        </p>
        <div className="row row-RestroBackgroundImg">
          <div className="col-12 col-md-8">
            <div className="image-upload-container-RestroBackgroundImg">
            {selectedImage || imagePreview ? (
  <img
    src={selectedImage ? URL.createObjectURL(selectedImage) : imagePreview}
    alt="Uploaded"
    className="uploaded-image-RestroBackgroundImg"
    style={{
      width: "auto",
      objectFit: "cover",
    }}
  />
) : (
  <span className="icon-placeholder-RestroBackgroundImg">
    Browse and choose the file you want to upload from your device{" "}
    <IoCloudUploadOutline />
  </span>
)}

              <input
                type="file"
                accept="image/jpeg, image/jpg" // Restrict file selection to jpeg/jpg
                onChange={handleImageSelect}
                className="file-input-RestroBackgroundImg"
              />
            </div>
          </div>

          <div className="col-12 col-md-4 button-BackgroundImg">
            <div className="button-container-RestroBackgroundImg">
              <button
                className={`uploadBtn-Backgroundimg ${
                  isUploadEnabled ? "" : "disabled"
                }`} // Add class based on state
                onClick={handleUpload} // Call API on button click
                disabled={!isUploadEnabled} // Disable button until a valid file is selected
              >
                {ImageID === null ? "Upload" : "Update"}
              </button>

              <button
                className="deleteBtn-Backgroundimg"
                onClick={() => setShowModal(true)}
                disabled={ImageID === null}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div style={modalBackgroundStyle}>
            <div style={modalContainerStyle}>
              <p>Are you sure you want to delete this image?</p>
              <div style={modalButtonGroupStyle}>
                <button
                  style={confirmDeleteBtnStyle}
                  onClick={handleImageDelete} // Confirm deletion
                >
                  Yes, Delete
                </button>
                <button
                  style={cancelDeleteBtnStyle}
                  onClick={() => setShowModal(false)} // Close modal without deleting
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RestroBackgroundImg;
