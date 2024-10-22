import React, { useState, useRef } from 'react';
import './FeaturedImg.css';
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import axios from 'axios';
import Loader from '../../../Loader/Loader/Loader';

const FeaturedImg = () => {
  const token = sessionStorage.getItem("TokenForDineRightRestoAdmin");
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Store objects with id and file
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null); // Track the file to delete
  const fileInputRef = useRef(null); // Reference for the file input

  // Handler for file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];

    const validFiles = files.filter((file) => acceptedTypes.includes(file.type));
    const invalidFiles = files.filter((file) => !acceptedTypes.includes(file.type));

    // Show error message for invalid files
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file type(s): ${invalidFiles.map(file => file.name).join(', ')}`);
    }

    // Create an array of objects with id and file
    const newFiles = validFiles.map((file) => ({
      id: URL.createObjectURL(file), // Unique ID
      file: file, // Actual File object
    }));

    // Store valid files directly
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (idToRemove) => {
    setFileToDelete(idToRemove); // Set the ID of the file to delete
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDelete = () => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileToDelete) // Delete based on ID
    );
    setShowModal(false); // Close the modal
    toast.success("File deleted successfully!"); // Show success message
    setFileToDelete(null); // Clear the file to delete
  };

  const handleSave = async () => {
    if (selectedFiles.length === 0) return; // Ensure there are files to upload

    try {
      setLoading(true);
      const formData = new FormData();

      // Append each selected file to the FormData
      selectedFiles.forEach(({ file }) => {
        formData.append("gallery_image[]", file); // Append the actual File object
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the API call using axios
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
      } else {
        toast.error(response.data.error_msg || "Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during file upload:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      {loading && <Loader />}
    <div className='container mb-5'>
      <p className='Heading-RestroBackgroundImg'>Upload Gallery Images:</p>
      <div className='row row-bookingPeriod'>
        <div className='col-12 col-md-12 border-Featured-img'>
          <div className='flex-bookingPeriod-btn'>
            <input
              type='file'
              accept='image/jpeg,image/jpg,image/png,video/mp4'
              multiple
              ref={fileInputRef}
              id='file-upload'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor='file-upload' className='custom-file-upload'>
              Choose Files
            </label>
          </div>

          <div className='selected-images mt-3'>
            {selectedFiles.map((file, index) => (
              <React.Fragment key={file.id}>
                {index % 5 === 0 && index !== 0 && <hr className='hr-menu-accordian-preview' style={{ height: "1px", border: "none", backgroundColor: "blue" }} />}
                <div className='image-item'>
                  <div className='image-preview'>
                    {file.file.type.startsWith('video/') ? (
                      <video src={file.id} alt={`Selected ${index}`} className='image-thumbnail' controls />
                    ) : (
                      <img src={file.id} alt={`Selected ${index}`} className='image-thumbnail' />
                    )}
                  </div>
                  <button className='remove-btn' onClick={() => removeFile(file.id)}>
                    <MdDelete />
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>

          {selectedFiles.length === 0 && (
            <div className='no-file-chosen'>Uploaded file will display here <IoCloudUploadOutline /></div>
          )}

          {selectedFiles.length > 0 && (
            <div className='save-btn-container text-center mt-3'>
              <button className='save-btn-Featuredimg' onClick={handleSave}>
                Upload
              </button>
            </div>
          )}
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
    </div>
    </>
  );
};

export default FeaturedImg;
