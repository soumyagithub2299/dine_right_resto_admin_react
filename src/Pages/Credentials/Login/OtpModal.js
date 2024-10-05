import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaAngleLeft } from "react-icons/fa6";
import './Modal.css';

const OtpModal = ({ isOpen, onHide, onOtpSubmit, onResendOtp }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(15);
    const [isResendEnabled, setIsResendEnabled] = useState(true);
    const inputRefs = useRef([]);

    useEffect(() => {
        let timer = null;

        if (isOpen && (minutes > 0 || seconds > 0)) {
            setIsResendEnabled(true); 
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
        }

        // Cleanup the interval on component unmount or when timer stops
        return () => clearInterval(timer);
    }, [isOpen, minutes, seconds]);

    const handleChange = (e, index) => {
        const value = e.target.value.slice(0, 1); // Allow only one character
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
        onOtpSubmit(otp.join(''));
    };

    const handleResendOtp = () => {
        // onResendOtp(); 
        
        setMinutes(5);
        setSeconds(15);
        setIsResendEnabled(false);
    };

    const formatTime = (minutes, seconds) => {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSignInClick = () => {
        onHide(); // Close the modal when "Sign In" button is clicked
    };

    return (
        <Modal show={isOpen} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title><FaAngleLeft /> One Time Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="otp">
                        <label className='otp-label'>
                            You will get a One Time Password to reset your password
                        </label>
                        <div className="otp-input-container">
                            {otp.map((digit, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(e, index)}
                                    maxLength="1"
                                    className="otp-input"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <p className='resend-txt'>Resend One Time Password in <span>{formatTime(minutes, seconds)}</span></p>
                    <hr />
                    <Button variant="primary" type="submit" className='login-btn'>
                        Submit
                    </Button>
                    <div className='modal-sign-btn'>
                        <Button type="button" className='SignIn-btn' onClick={handleSignInClick}>
                            Sign In
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default OtpModal;


// import React, { useState, useEffect, useRef } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { FaAngleLeft } from "react-icons/fa6";
// import { toast, ToastContainer } from 'react-toastify'; 
// import { SignInOTPAPI } from '../../../utils/APIs/credentialsApis'; 

// const OtpModal = ({ isOpen, onHide, onOtpSubmit, onResendOtp }) => {
//     const [otp, setOtp] = useState(['', '', '', '']);
//     const [minutes, setMinutes] = useState(5);
//     const [seconds, setSeconds] = useState(15);
//     const [isResendEnabled, setIsResendEnabled] = useState(true);
//     const inputRefs = useRef([]);

//     useEffect(() => {
//         let timer = null;

//         if (isOpen && (minutes > 0 || seconds > 0)) {
//             setIsResendEnabled(true); 
//             timer = setInterval(() => {
//                 if (seconds === 0) {
//                     if (minutes === 0) {
//                         clearInterval(timer);
//                         setIsResendEnabled(true); 
//                     } else {
//                         setMinutes(minutes - 1);
//                         setSeconds(59);
//                     }
//                 } else {
//                     setSeconds(seconds - 1);
//                 }
//             }, 1000);
//         }

//         return () => clearInterval(timer);
//     }, [isOpen, minutes, seconds]);

//     const handleChange = (e, index) => {
//         const value = e.target.value.slice(0, 1); // Allow only one character
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         if (value && index < 3) {
//             inputRefs.current[index + 1].focus();
//         }

//         if (!value && index > 0) {
//             inputRefs.current[index - 1].focus();
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Check if all OTP fields are filled
//         if (otp.some((digit) => digit === '')) {
//             toast.error('Please fill OTP in all fields.'); 
//             return;
//         }

//         try {
//             const response = await SignInOTPAPI({ otp: otp.join('') });
//             onOtpSubmit(otp.join(''));
//             toast.success('OTP submitted successfully!'); // Success message
//         } catch (error) {
//             toast.error('Failed to submit OTP. Please try again.');
//         }
//     };

//     const handleResendOtp = () => {
//         // onResendOtp(); Uncomment if you have resend OTP logic
//         setMinutes(5);
//         setSeconds(15);
//         setIsResendEnabled(false);
//     };

//     const formatTime = (minutes, seconds) => {
//         return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     };

//     const handleSignInClick = () => {
//         onHide(); // Close the modal when "Sign In" button is clicked
//     };

//     return (
//         <>
//             <Modal show={isOpen} onHide={onHide} centered>
//                 <Modal.Header>
//                     <Modal.Title><FaAngleLeft /> One Time Password</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="otp">
//                             <label className='otp-label'>
//                                 You will get a One Time Password to reset your password
//                             </label>
//                             <div className="otp-input-container">
//                                 {otp.map((digit, index) => (
//                                     <Form.Control
//                                         key={index}
//                                         type="text"
//                                         value={digit}
//                                         onChange={(e) => handleChange(e, index)}
//                                         maxLength="1"
//                                         className="otp-input"
//                                         ref={(el) => (inputRefs.current[index] = el)}
//                                     />
//                                 ))}
//                             </div>
//                         </Form.Group>
//                         <p className='resend-txt'>Resend One Time Password in <span>{formatTime(minutes, seconds)}</span></p>
//                         <hr />
//                         <Button variant="primary" type="submit" className='login-btn'>
//                             Submit
//                         </Button>
//                         <div className='modal-sign-btn'>
//                             <Button type="button" className='SignIn-btn' onClick={handleSignInClick}>
//                                 Sign In
//                             </Button>
//                         </div>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//             <ToastContainer /> {/* Toast container for displaying notifications */}
//         </>
//     );
// };

// export default OtpModal;
