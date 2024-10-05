import React, { useState } from "react";
import "./RestroBackgroundImg.css";
import { RiImageEditLine } from "react-icons/ri";

const RestroBackgroundImg = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container container-RestroBackgroundImg mb-4">
      <div className="row">
        <div className="col-12 col-md-8">
          <p className="Heading-RestroBackgroundImg">Upload Restaurant Banner Image</p>
          <div className="image-upload-container-RestroBackgroundImg">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded"
                className="uploaded-image-RestroBackgroundImg"
              />
            ) : (
              <span className="icon-placeholder-RestroBackgroundImg">
                <RiImageEditLine />
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input-RestroBackgroundImg"
            />
          </div>
        </div>

        <div className="col-12 col-md-4 button-BackgroundImg">
          <div className="button-container-RestroBackgroundImg">
            <button className="uploadBtn-Backgroundimg"
              onClick={() => document.querySelector('input[type="file"]').click() } >
              Upload
            </button>

            <button className="deleteBtn-Backgroundimg"onClick={handleImageDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <hr className="hr-menu-accordian" />
    </div>
  );
};

export default RestroBackgroundImg;


     
// import React, { useState, useEffect } from "react";
// import "./RestroBackgroundImg.css";
// import { RiImageEditLine } from "react-icons/ri";
// import { uploadBackgroundImagesAPI, deleteBackgroundImagesAPI } from '../../../utils/APIs/UplodApis/UplodApi'; // Import your API functions
// import { displayBackgroundImagesAPI } from '../../../utils/APIs/UplodApis/UplodApi'; // Import the new API function
// import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
// import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

// const RestroBackgroundImg = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [backgroundImages, setBackgroundImages] = useState([]); // State to hold fetched background images

//   // Function to fetch background images
//   const fetchBackgroundImages = async () => {
//     try {
//       const response = await displayBackgroundImagesAPI(); // Fetch the images
//       setBackgroundImages(response.data); // Assuming the response has a data property with images
//     } catch (error) {
//       console.error('Error fetching background images:', error);
//       toast.error("Failed to load images."); // Error toast notification
//     }
//   };

//   // useEffect to fetch images when the component mounts
//   useEffect(() => {
//     fetchBackgroundImages(); // Call the fetch function on component mount
//   }, []); // Empty dependency array ensures it runs once on mount

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   const handleImageDelete = async (imageId) => {
//     try {
//       await deleteBackgroundImagesAPI({ id: imageId }); // Call the delete API with the image ID
//       toast.success("Image deleted successfully!"); // Success toast notification
//       fetchBackgroundImages(); // Re-fetch the images after deletion
//     } catch (error) {
//       console.error('Error deleting image:', error);
//       toast.error("Failed to delete image. Please try again."); // Error toast notification
//     }
//   };

//   const handleImageSubmit = async () => {
//     if (!selectedImage) {
//       toast.error("Please select an image to upload."); // Error toast if no image selected
//       return;
//     }

//     const formData = new FormData();
//     const fileInput = document.querySelector('input[type="file"]');
//     const file = fileInput.files[0];

//     if (file) {
//       formData.append('image', file); // Append the image file to FormData

//       try {
//         const response = await uploadBackgroundImagesAPI(formData);
//         toast.success("Image uploaded successfully!"); // Success toast notification
//         console.log('Upload successful:', response);
//         await fetchBackgroundImages(); // Re-fetch the images after successful upload
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         toast.error("Failed to upload image. Please try again."); // Error toast notification
//       }
//     }
//   };

//   return (
//     <div className="container container-RestroBackgroundImg mb-4">
//       {/* Toast container */}
//       <ToastContainer />

//       <div className="row">
//         <div className="col-12 col-md-8">
//           <p className="Heading-RestroBackgroundImg">Upload Restaurant Banner Image</p>
//           <div className="image-upload-container-RestroBackgroundImg">
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt="Uploaded"
//                 className="uploaded-image-RestroBackgroundImg"
//               />
//             ) : (
//               <span className="icon-placeholder-RestroBackgroundImg">
//                 <RiImageEditLine />
//               </span>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="file-input-RestroBackgroundImg"
//             />
//           </div>
//         </div>

//         <div className="col-12 col-md-4 button-BackgroundImg">
//           <div className="button-container-RestroBackgroundImg">
//             <button className="uploadBtn-Backgroundimg" onClick={handleImageSubmit}>
//               Upload
//             </button>
//             {/* Removed the main delete button here */}
//           </div>
//         </div>
//       </div>

//       <hr className="hr-menu-accordian" />

//       {/* Displaying the fetched background images */}
//       <div className="fetched-images-container">
//         {backgroundImages.length > 0 ? (
//           backgroundImages.map((image, index) => (
//             <div key={index} className="image-item">
//               <img src={image.url} alt={`Background ${index}`} className="fetched-image" />
//               <button 
//                 className="deleteBtn-Backgroundimg"
//                 onClick={() => handleImageDelete(image.id)} // Pass the image ID to delete
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No background images found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestroBackgroundImg;
