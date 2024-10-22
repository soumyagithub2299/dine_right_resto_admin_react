import React, { useEffect, useState } from "react";
import "./RestroBackgroundImg_Register.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";

const RestroBackgroundImg_Register = ({userId}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ImageID, setImageID] = useState(null);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");

  const [imagePreview, setImagePreview] = useState(null);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/jpg"];

      if (!validImageTypes.includes(fileType)) {
        toast.error("Please select a JPEG or JPG image!");
        setIsUploadEnabled(false);
        return;
      }

      setSelectedImage(file);
      setIsUploadEnabled(true);
    }
  };





  const handleImageDelete = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/banner_image/${ImageID}`,
        config
      );

      setLoading(false);

      if (response.data.response === true) {
        setSelectedImage(null);
        setIsUploadEnabled(false);
        setShowModal(false);
        toast.success(response.data.success_msg || "Image deleted successfully!");
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during image deletion:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleUpload = async () => {
    if (!isUploadEnabled) return;

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("banner_image", selectedImage);
      formData.append("userId", userId);

      if(ImageID !== null){
      formData.append("banner_image_id", ImageID);
      }



      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/insertOrUpdateBannerImageByUserId`,
        formData,
        // config
      );

      setLoading(false);

      if (response.data.response === true) {

        toast.success(response.data.success_msg || "Image uploaded successfully!");

        sessionStorage.setItem("banner_image_id", response.data.banner_image_id);
    handleGetBannerImage();
    setSelectedImage(null);

    
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during image upload:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleGetBannerImage = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getBannerImagesByUserId/${userId}`,
        // config
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
      console.error("Error during fetching banner image:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    handleGetBannerImage();
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="restro-background-img-register">
        <p className="heading">Upload Restaurant Banner Image:</p>
        <p className="recommendation-text">Recommended height: <strong>450px</strong></p>

        <div className="image-upload-wrapper">
          <div className="image-upload-container">
          {selectedImage || imagePreview ? (
              <img
              src={selectedImage ? URL.createObjectURL(selectedImage) : imagePreview}
                alt="Uploaded"
                className="uploaded-image"
              />
            ) : (
              <span className="icon-placeholder">
                Browse and choose the file you want to upload from your device <IoCloudUploadOutline />
              </span>
            )}
            <input
              type="file"
              accept="image/jpeg, image/jpg"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>

          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    gap: "20px", // Add a gap between the buttons
  }}
>
<button
  style={{
    backgroundColor: isUploadEnabled ? "#4CAF50" : "#ccc",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: isUploadEnabled ? "pointer" : "not-allowed",
    flex: "1", // Ensure the button sizes are consistent
  }}
  onClick={handleUpload}
  disabled={!isUploadEnabled}
>
  {ImageID === null ? "Upload" : "Update"}
</button>


  {/* <button
    style={{
      backgroundColor: "#f44336",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: ImageID === null ? "not-allowed" : "pointer",
      flex: "1", // Ensure the button sizes are consistent
    }}
    onClick={() => setShowModal(true)}
    disabled={ImageID === null}
  >
    Delete
  </button> */}



</div>


        </div>

        {showModal && (
          <div className="modal-background">
            <div className="modal-container">
              <p>Are you sure you want to delete this image?</p>
              <div className="modal-button-group">
                <button className="confirm-delete-btn" onClick={handleImageDelete}>
                  Yes, Delete
                </button>
                <button className="cancel-delete-btn" onClick={() => setShowModal(false)}>
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

export default RestroBackgroundImg_Register;
