import React, { useState } from "react";
import "./BannerVideo.css";
import { RiImageEditLine } from "react-icons/ri";

const BannerVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  const handleVideoDelete = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container container-RestroBackgroundImg mb-4">
      {/* Added margin-bottom to create space below this component */}
      <div className="row">
        <div className="col-12 col-md-8">
          <p className="Heading-RestroBackgroundImg">
            Upload Restaurant Banner Video
          </p>
          <div
            className="video-upload-container"
            style={{
              width: "500px",
              height: "200px",
              border: "2px solid #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              cursor: "pointer",
              margin: "20px auto", // Centers the upload container
            }}
          >
            {selectedVideo ? (
              <video
                src={selectedVideo}
                controls
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: "20px" }}>
                <RiImageEditLine />
              </span>
            )}
            <input
              type="file"
              accept="video/*" // Accept only video files
              onChange={handleVideoUpload}
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div className="col-12 col-md-4 button-BackgroundImg">
          <div className="button-container">
            <button
              className="uploadBtn-Backgroundimg"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              Upload
            </button>
            <button
              className="deletBtn-Backgroundimg"
              onClick={handleVideoDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <hr className="hr-menu-accordian" />
    </div>
  );
};

export default BannerVideo;
