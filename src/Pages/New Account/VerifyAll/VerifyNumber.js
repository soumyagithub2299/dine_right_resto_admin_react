import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import './VerifyNumber.css';

const VerifyNumber = ({ switchToEmailVerification, isOpen, onResendOtp, handleNext, handleBack }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        let timer = null;

        if (isOpen) {
            if (minutes > 0 || seconds > 0) {
                setIsResendEnabled(false);
                timer = setInterval(() => {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(timer);
                            setIsResendEnabled(true);
                        } else {
                            setMinutes(minutes - 1);
                            setSeconds(59);
                        }
                    } else {
                        setSeconds(seconds - 1);
                    }
                }, 1000);
            } else {
                setIsResendEnabled(true);
            }
        } else {
            clearInterval(timer);
            setMinutes(5);
            setSeconds(0);
            setIsResendEnabled(false);
        }

        return () => clearInterval(timer);
    }, [isOpen, minutes, seconds]);

    const handleChange = (e, index) => {
        const value = e.target.value.slice(0, 1);
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        if (!value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleNext(); // Proceed to the next step
    };

    const handleResendOtp = () => {
        onResendOtp();
        setMinutes(5);
        setSeconds(0);
        setIsResendEnabled(false);
    };

    const formatTime = (minutes, seconds) => {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className='new-verify-form'>
            <div className='verify-form-container'>
                <h2 className='login-head'>
                    <FaAngleLeft onClick={handleBack} style={{ cursor: 'pointer' }} /> {/* Calls handleBack */}
                    Verify account 
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="otp">
                        <label className='verify-label'>
                            We have sent you a verification code to your mobile number.
                            Please confirm it now.
                        </label>
                        <div className="verify-input-container">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    maxLength="1"
                                    className="verify-input"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <p className='resend-txt'>
                        Resend verification in <span>{formatTime(minutes, seconds)}</span>
                    </p>
                    <hr />
                    <button variant="primary" type="submit" className='login-btn'>
                        Submit
                    </button>
                    <div className='verify-content'>
                        <p className='verify-txt'>Verification not working? Switch to:</p>
                        <button type="button" className='verify-btn' onClick={switchToEmailVerification}>
                            Email Verification
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default VerifyNumber;
