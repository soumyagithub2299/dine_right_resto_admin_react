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
    <div className="container container-BannerVideo mb-4">
      <div className="row">
        <div className="col-12 col-md-8">
          <p className="Heading-BannerVideo">Upload Restaurant Banner Video</p>
          <div
            className="video-upload-container-BannerVideo"
          >
            {selectedVideo ? (
              <video
                src={selectedVideo}
                controls
                className="video-preview-BannerVideo"
              />
            ) : (
              <span className="icon-placeholder-BannerVideo">
                <RiImageEditLine />
              </span>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="file-input-BannerVideo"
            />
          </div>
        </div>

        <div className="col-12 col-md-4 button-BannerVideo">
          <div className="button-container-BannerVideo">
            <button
              className="uploadBtn-BannerVideo"
              onClick={() =>
                document.querySelector('.video-upload-container-BannerVideo input[type="file"]').click()
              }
            >
              Upload
            </button>
            <button className="deleteBtn-BannerVideo" onClick={handleVideoDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>

      <hr className="hr-banner-video" />
    </div>
  );
};

export default BannerVideo;
