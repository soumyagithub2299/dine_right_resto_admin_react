import React, { useState, useRef } from 'react';
import './FeaturedImg.css';
import { MdDelete } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";

const FeaturedImg = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null); // Reference for the file input

  // Handler for image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/')); 
    const newImages = imageFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

 
  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );

  
    if (selectedImages.length === 1) {
      fileInputRef.current.value = ''; 
    }
  };

  
  const handleSave = () => {
    console.log("Images saved:", selectedImages);
  };

  return (
    <div className='container mb-5'>
      <p className='Heading-RestroBackgroundImg'>Upload Gallery Images : </p> {/* Centered Heading */}
      <div className='row row-bookingPeriod'>
        <div className='col-12 col-md-12 border-Featured-img'>
          
         
          <div className='flex-bookingPeriod-btn'>
            <input
              type='file'
              accept='image/*'
              multiple
              ref={fileInputRef} 
              id='file-upload'
              onChange={handleImageChange}
              style={{ display: 'none' }} 
            />
           
            <label htmlFor='file-upload' className='custom-file-upload'>
              Upload File 
            </label>
          </div>
          
        
          <div className='selected-images mt-3'>
            {selectedImages.map((image, index) => (
              <React.Fragment key={index}>
                {index % 5 === 0 && index !== 0 && <hr className='hr-menu-accordian-preview' />} {/* Add hr tag after every 5 images */}
                <div className='image-item'>
                  <img src={image} alt={`Selected ${index}`} className='image-thumbnail' />
                  <button className='remove-btn' onClick={() => removeImage(index)}>
                    <MdDelete />
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>

       
          {selectedImages.length === 0 && (
            <div className='no-file-chosen'>Uploaded file will display here <IoCloudUploadOutline /></div>
          )}

          {/* Save Button */}
          {selectedImages.length > 0 && (
            <div className='save-btn-container text-center mt-3'>
              <button className='save-btn-Featuredimg' onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <hr className='hr-menu-accordian' /> */}
    </div>
  );
};

export default FeaturedImg;







    
// import React, { useState, useRef } from 'react';
// import './FeaturedImg.css';
// import { uploadFeatcherImagesAPI } from '../../../utils/APIs/UplodApis/UplodApi';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

// const FeaturedImg = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const fileInputRef = useRef(null); 
//   const [uploadError, setUploadError] = useState(null);

//   // Handler for image selection
//   const handleImageChange = async (e) => {
//     const files = Array.from(e.target.files);
//     const imageFiles = files.filter((file) => file.type.startsWith('image/')); 

    
//     const newImages = imageFiles.map((file) => URL.createObjectURL(file));
//     setSelectedImages((prevImages) => [...prevImages, ...newImages]);

    
//     const formData = new FormData();
//     imageFiles.forEach((file) => formData.append('images', file));

//     try {
//       const response = await uploadFeatcherImagesAPI(formData);
//       toast.success('Images uploaded successfully!'); 
//       console.log('Upload successful:', response);
//       setUploadError(null); // Clear any previous errors
//     } catch (error) {
//       console.error('Error uploading images:', error);
//       // setUploadError('Failed to upload images. Please try again.');
//       toast.error('Failed to upload images. Please try again.'); 
//     }
//   };

//   // Handler for removing an image by index
//   const removeImage = (indexToRemove) => {
//     setSelectedImages((prevImages) =>
//       prevImages.filter((_, index) => index !== indexToRemove)
//     );

//     // Reset file input when all images are removed
//     if (selectedImages.length === 1) {
//       fileInputRef.current.value = ''; // Clear the file input
//     }
//   };

  
//   const removeLastImage = () => {
//     if (selectedImages.length > 0) {
//       setSelectedImages((prevImages) => prevImages.slice(0, -1));
//     }

    
//     if (selectedImages.length === 1) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div className='container'>
//       {/* Toast container */}
//       <ToastContainer />

//       <p className='Heading-RestroBackgroundImg' style={{ textAlign: 'center' }}>
//         Upload Gallery Images
//       </p> {/* Centered Heading */}
//       <div className='row row-bookingPeriod'>
//         <div className='col-12 col-md-7'>
//           <div className='SubHeading-Profile mb-2'>Featured Images:</div>

//           {/* Image Upload Input */}
//           <div className='flex-bookingPeriod-btn'>
//             <input
//               type='file'
//               accept='image/*'
//               multiple
//               ref={fileInputRef} // Attach ref to input field
//               onChange={handleImageChange}
//             />
//           </div>

//           {/* Display Selected Images */}
//           <div className='selected-images mt-3'>
//             {selectedImages.map((image, index) => (
//               <div key={index} className='image-thumbnail'>
//                 <img src={image} alt={`Selected ${index}`} width={50} height={50} />
//                 <button className='remove-btn' onClick={() => removeImage(index)}>
//                   &times;
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Message when no files are chosen */}
//           {selectedImages.length === 0 && (
//             <div className='no-file-chosen'>No file chosen</div>
//           )}

//           {/* Display error if upload fails */}
//           {uploadError && (
//             <div className='upload-error'>
//               {uploadError}
//             </div>
//           )}
//         </div>

//         <div className='col-12 col-md-3'>
//           {/* Delete Button to remove the last image */}
//           <button className="deleteBtn-Featuredimg" onClick={removeLastImage}>
//             Delete
//           </button>
//         </div>
//       </div>
//       <hr className='hr-menu-accordian' />
//     </div>
//   );
// };

// export default FeaturedImg;

