import React, { useState, useRef, useEffect } from "react";
import "./FeaturedImg.css";
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import axios from "axios";
import Loader from "../../../Loader/Loader/Loader";

const FeaturedImg = () => {
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Files selected for upload
  const [galleryFiles, setGalleryFiles] = useState([]); // Files retrieved from the API
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [isNewFile, setIsNewFile] = useState(false); // Track if it's a new or existing file
  const fileInputRef = useRef(null);

  // Handler for file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "video/mp4"];

    const validFiles = files.filter((file) =>
      acceptedTypes.includes(file.type)
    );
    const invalidFiles = files.filter(
      (file) => !acceptedTypes.includes(file.type)
    );

    // Show error message for invalid files
    if (invalidFiles.length > 0) {
      toast.error(
        `Invalid file type(s): ${invalidFiles
          .map((file) => file.name)
          .join(", ")}`
      );
    }

    // Create an array of objects with id and file
    const newFiles = validFiles.map((file) => ({
      id: URL.createObjectURL(file), // Unique ID for local preview
      file: file, // Actual File object
      isNew: true, // Flag to identify new files
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Remove file, either locally or from the server
  const removeFile = (idToRemove, isNew) => {
    setFileToDelete(idToRemove);
    setIsNewFile(isNew);
    setShowModal(true); // Show confirmation modal
  };

  // Confirm deletion for the file
  const confirmDelete = async () => {
    setShowModal(false);

    // Handle deletion of existing gallery files
    if (!isNewFile) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/deleteBannerGallery`,
          { banner_gallery_id: fileToDelete }, // Send file ID to delete
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        if (response.data.response === true) {
          toast.success("File deleted successfully!");
          handleGetGallery();
          setGalleryFiles((prevFiles) =>
            prevFiles.filter((file) => file.id !== fileToDelete)
          );
        } else {
          toast.error(response.data.error_msg || "Unable to delete the file.");
        }
      } catch (error) {
        setLoading(false);
        console.error("Error during file deletion:", error);
        toast.error("An error occurred. Please try again later.");
      }
    } else {
      // Handle deletion of newly added files
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== fileToDelete)
      );
      toast.success("File deleted successfully!");
    }
    setFileToDelete(null);
  };

  const handleSave = async () => {
    if (selectedFiles.length === 0) return; // Ensure there are files to upload

    try {
      setLoading(true);
      const formData = new FormData();

      // Append each selected file to the FormData
      selectedFiles.forEach(({ file }) => {
        formData.append("files", file);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // API call to upload files
      const response = await axios.post(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/gallery`,
        formData,
        config
      );

      setLoading(false);

      if (response.data.response === true) {
        toast.success(
          response.data.success_msg || "Gallery images uploaded successfully!"
        );
        handleGetGallery();
        window.location.reload();

      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during file upload:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Function to fetch gallery files from API
  const handleGetGallery = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API call to get existing gallery files
      const response = await axios.get(
        `${process.env.REACT_APP_DINE_RIGHT_RESTAURANT_ADMIN_BASE_API_URL}/api/auth/getBannerGallery`,
        config
      );

      setLoading(false);

      if (response.data.response === true) {
        // Map through the response and create a gallery file structure similar to local files
        const galleryFilesData = response.data.files.map((file) => ({
          id: file.banner_gallery_id,
          file_url: file.file_url,
          file_type: file.file_type,
          isNew: false, // Existing files from API
        }));
        setGalleryFiles(galleryFilesData);
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching gallery files:", error);
      // toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    handleGetGallery();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="container mb-5">
        <p className="Heading-RestroBackgroundImg">
          Upload Gallery Images/Videos:
        </p>
        <p style={{ textAlign: "center" }}>
          Recommended height for website preview: <strong>250px</strong>
        </p>
        <p style={{ textAlign: "center" }}>
          Recommended width for website preview: <strong>200px</strong>
        </p>

        <div className="row row-bookingPeriod">
          <div className="col-12 col-md-12 border-Featured-img">
            <div className="flex-bookingPeriod-btn">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,video/mp4"
                multiple
                ref={fileInputRef}
                id="file-upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="custom-file-upload">
                Choose Files
              </label>
            </div>

            {/* Display files from API */}
            <div className="gallery-images mt-3">
              {galleryFiles.map((file, index) => (
                <React.Fragment key={file.id}>
                  {index % 5 === 0 &&
                    index !== 0 &&
                    // <hr className="hr-menu-accordian-preview" />
                    ""}
                  <div className="image-item">
                    <div className="image-preview">
                      {file.file_type.startsWith("video/") ? (
                        <video
                          src={file.file_url}
                          alt={`Gallery ${index}`}
                          className="image-thumbnail"
                          controls
                        />
                      ) : (
                        <img
                          src={file.file_url}
                          alt={`Gallery ${index}`}
                          className="image-thumbnail"
                        />
                      )}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(file.id, file.isNew)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Display newly selected files */}
            <div className="selected-images mt-3">
              {selectedFiles.map((file, index) => (
                <React.Fragment key={file.id}>
                  {index % 5 === 0 && index !== 0 && (
                    <hr className="hr-menu-accordian-preview" />
                  )}
                  <div className="image-item">
                    <div className="image-preview">
                      {file.file.type.startsWith("video/") ? (
                        <video
                          src={file.id}
                          alt={`Selected ${index}`}
                          className="image-thumbnail"
                          controls
                        />
                      ) : (
                        <img
                          src={file.id}
                          alt={`Selected ${index}`}
                          className="image-thumbnail"
                        />
                      )}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(file.id, file.isNew)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <div className="btn-save-gallery">
              <div className="save-btn-container text-center mt-3">
                <button
                  className="save-btn-Featuredimg"
                  onClick={handleSave}
                  disabled={selectedFiles.length === 0}
                  style={{
                    cursor:
                      selectedFiles.length === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

         {/* Confirmation Modal */}
         {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            width: "400px",
          }}>
            <p>Are you sure you want to delete this file?</p>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}>
              <button style={{
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }} onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button style={{
                backgroundColor: "#5bc0de",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }} onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedImg;
