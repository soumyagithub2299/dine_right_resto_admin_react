import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaAngleLeft } from 'react-icons/fa';
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiFillPlusSquare } from "react-icons/ai";
import './../CreatePassword/CreatePassword.css'; 

const CreateAccount = ({ handleNext }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [panno, setPanno] = useState('');
  const [gstno, setGstno] = useState('');

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/Login');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleNext(); 
  };

  return (
    <div>
      <div className="new-verify-form">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h2 className="login-head">
            <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} />
            Create an account
          </h2>
          <label htmlFor="name" className="login-label">Full Name</label>
          <input
            type="text"
            id="name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="phone" className="login-label">Phone</label>
          <input
            type="number"
            id="phone"
            className="login-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={10}
          />
          <label htmlFor="phone" className="login-label">PAN card number</label>
          <input
            type="text"
            id="pan"
            className="login-input"
            value={panno}
            onChange={(e) => setPanno(e.target.value)}
            required
            maxLength={10}
          />
          <label htmlFor="phone" className="login-label">GSTIN Number</label>
          <input
            type="text"
            id="gstno"
            className="login-input"
            value={gstno}
            onChange={(e) => setGstno(e.target.value)}
            required
            maxLength={15}
          />
          <label htmlFor="file-upload" className="login-label">
            FSSAI license copy
          </label>
          <div className="file-upload-container">
            <input
              type="file"
              id="file-upload"
              className="file-input"
              // onChange={(e) => handleFileUpload(e.target.files)}
              // multiple 
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <div className="upload-content">
                <IoCloudUploadOutline className='upload-icon'/>
                <p>Browse and choose the files you want to upload from your computer</p>
                <AiFillPlusSquare className='upload-btn'/>
              </div>
            </label>
          </div>

          <button type="submit" className="login-btn">Create account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
