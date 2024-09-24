import React, { useState, useRef } from 'react';
import './FeaturedImg.css'; 

const FeaturedImg = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null); // Reference for the file input

  // Handler for image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/')); // Filter only image files
    const newImages = imageFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handler for removing an image
  const removeImage = (indexToRemove) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );

    // Reset file input when all images are removed
    if (selectedImages.length === 1) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  return (
    <div className='container'>
      <p className='Heading-RestroBackgroundImg' style={{ textAlign: 'center' }}>Upload Gallery Images</p> {/* Centered Heading */}
      <div className='row row-bookingPeriod'>
        <div className='col-12 col-md-6'>
          <div className='SubHeading-Profile mb-2'>Featured Images:</div>
          
          {/* Image Upload Input */}
          <div className='flex-bookingPeriod-btn'>
            <input
              type='file'
              accept='image/*'
              multiple
              ref={fileInputRef} // Attach ref to input field
              onChange={handleImageChange}
            />
          </div>
          
          {/* Display Selected Images */}
          <div className='selected-images mt-3'>
            {selectedImages.map((image, index) => (
              <div key={index} className='image-thumbnail'>
                <img src={image} alt={`Selected ${index}`} width={50} height={50} />
                <button className='remove-btn' onClick={() => removeImage(index)}>
                  &times;
                </button>
              </div>
            ))}
          </div>

          {/* Message when no files are chosen */}
          {selectedImages.length === 0 && (
            <div className='no-file-chosen'>No file chosen</div>
          )}
        </div>
      </div>
      <hr className='hr-menu-accordian' />
    </div>
  );
};

export default FeaturedImg;
