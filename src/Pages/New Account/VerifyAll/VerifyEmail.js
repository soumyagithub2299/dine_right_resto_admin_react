import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import '../VerifyAll/VerifyNumber.css';

const VerifyEmail = ({ isOpen, onResendOtp, handleNext, switchToPhoneVerification, handleBack }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNext(); // Proceed to the next step
    };

    const handleBackClick = () => {
        handleBack(); // Navigate back to the previous step
    };

    return (
        <div className='new-verify-form'>
            <div className='verify-form-container'>
                <h2 className='login-head'>
                    <FaAngleLeft onClick={handleBackClick} style={{ cursor: 'pointer' }} /> 
                    Verify account 
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="otp">
                        <label className='verify-label'>
                            Click on verify to start the email verification process.
                        </label>
                    </Form.Group>
                  
                    <button variant="primary" type="submit" className='login-btn'>
                        Verify Now
                    </button>
                    <div className='mail-verify-msg'>
                        <p><IoMdCheckmarkCircleOutline /> Email Verification sent. Please check your inbox (Email demo@gmail.com).</p>
                    </div>
                    <div className='verify-content'>
                        <p className='verify-txt'>Verification not working? Switch to:</p>
                        <button type="button" className='verify-btn' onClick={switchToPhoneVerification}>
                            SMS Verification
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default VerifyEmail;
