import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'; 
import './Modal.css';

const OtpModal = ({ isOpen, onHide, onOtpSubmit, onResendOtp }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(15);
    const [isResendEnabled, setIsResendEnabled] = useState(true);
    const inputRefs = useRef([]);
    const navigate = useNavigate(); 

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
        onOtpSubmit(otp); // Call the function to handle OTP submission
        navigate('/dashboard'); // Redirect to /dashboard on submit
    };

    const handleResendOtp = () => {
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
// import { useNavigate } from 'react-router-dom'; 
// import { toast } from 'react-toastify'; 
// import './Modal.css';
// import { SignInOTPAPI } from './../../../utils/APIs/credentialsApis'; 

// const OtpModal = ({ isOpen, onHide, onOtpSubmit, onResendOtp }) => {
//     const [otp, setOtp] = useState(['', '', '', '']);
//     const [minutes, setMinutes] = useState(5);
//     const [seconds, setSeconds] = useState(15);
//     const [isResendEnabled, setIsResendEnabled] = useState(true);
//     const [loading, setLoading] = useState(false); 
//     const inputRefs = useRef([]);
//     const navigate = useNavigate(); 

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
//         const value = e.target.value.slice(0, 1); 
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
        
        
//         if (otp.some((digit) => digit === '')) {
//             toast.error("Please enter all 4 digits of the OTP.");
//             return;
//         }

//         try {
//             setLoading(true); 

            
//             const otpCode = otp.join(''); 

//             // API call
//             const response = await SignInOTPAPI({
//                 otp: otpCode, 
//             });

//             setLoading(false); 

           
//             if (
//                 response &&
//                 response.data &&
//                 response.data.response &&
//                 response.data.response.response === true
//             ) {
//                 toast.success(response.data.response.success_msg || "OTP verified successfully.");
//                 onOtpSubmit(otpCode); 
//                 navigate('/dashboard'); 
//             } else {
//                 toast.error(response.data.response.error_msg || "Invalid OTP. Please try again.");
//             }
//         } catch (error) {
//             setLoading(false);
//             toast.error("Error verifying OTP. Please try again.");
//             console.error("Error during OTP verification:", error);
//         }
//     };

//     const handleResendOtp = () => {
//         setMinutes(5);
//         setSeconds(15);
//         setIsResendEnabled(false);
//     };

//     const formatTime = (minutes, seconds) => {
//         return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     };

//     const handleSignInClick = () => {
//         onHide(); 
//     };

//     return (
//         <Modal show={isOpen} onHide={onHide} centered>
//             <Modal.Header>
//                 <Modal.Title><FaAngleLeft /> One Time Password</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="otp">
//                         <label className='otp-label'>
//                             You will get a One Time Password to reset your password
//                         </label>
//                         <div className="otp-input-container">
//                             {otp.map((digit, index) => (
//                                 <Form.Control
//                                     key={index}
//                                     type="text"
//                                     value={digit}
//                                     onChange={(e) => handleChange(e, index)}
//                                     maxLength="1"
//                                     className="otp-input"
//                                     ref={(el) => (inputRefs.current[index] = el)}
//                                 />
//                             ))}
//                         </div>
//                     </Form.Group>
//                     <p className='resend-txt'>Resend One Time Password in <span>{formatTime(minutes, seconds)}</span></p>
//                     <hr />
//                     <Button variant="primary" type="submit" className='login-btn' disabled={loading}>
//                         {loading ? 'Submitting...' : 'Submit'}
//                     </Button>
//                     <div className='modal-sign-btn'>
//                         <Button type="button" className='SignIn-btn' onClick={handleSignInClick}>
//                             Sign In
//                         </Button>
//                     </div>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default OtpModal;
