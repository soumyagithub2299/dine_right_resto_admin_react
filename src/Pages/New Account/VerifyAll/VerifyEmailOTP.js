import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import './VerifyNumber.css';

const VerifyEmailOTP = ({ isOpen, onResendOtp, handleNext, handleBack }) => {
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
                            We have sent you a verification code to your email.
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
                </Form>
            </div>
        </div>
    );
};
export default VerifyEmailOTP;

// import React, { useState, useEffect, useRef } from 'react';
// import { Button, Form, Spinner } from 'react-bootstrap'; // Import Spinner
// import { FaAngleLeft } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './VerifyNumber.css';
// import { OTPVerificationAPI } from '../../../utils/APIs/credentialsApis';

// const VerifyEmailOTP = ({ isOpen, onResendOtp, handleNext, handleBack }) => {
//     const [otp, setOtp] = useState(['', '', '', '']);
//     const [minutes, setMinutes] = useState(5);
//     const [seconds, setSeconds] = useState(0);
//     const [isResendEnabled, setIsResendEnabled] = useState(false);
//     const [loading, setLoading] = useState(false); // loading
//     const inputRefs = useRef([]);

//     useEffect(() => {
//         let timer = null;

//         if (isOpen) {
//             if (minutes > 0 || seconds > 0) {
//                 setIsResendEnabled(false);
//                 timer = setInterval(() => {
//                     if (seconds === 0) {
//                         if (minutes === 0) {
//                             clearInterval(timer);
//                             setIsResendEnabled(true);
//                         } else {
//                             setMinutes(minutes - 1);
//                             setSeconds(59);
//                         }
//                     } else {
//                         setSeconds(seconds - 1);
//                     }
//                 }, 1000);
//             } else {
//                 setIsResendEnabled(true);
//             }
//         } else {
//             clearInterval(timer);
//             setMinutes(5);
//             setSeconds(0);
//             setIsResendEnabled(false);
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

//         const otpCode = otp.join('');

//         if (otpCode.length < 4) {
//             toast.error('Please fill OTP in all fields');
//             return;
//         }

//         try {
//             setLoading(true); // Start loading

//             const formData = new FormData();
//             formData.append('otp', otpCode);

//             const response = await OTPVerificationAPI(formData);

//             setLoading(false); // Stop loading

//             if (
//                 response &&
//                 response?.data &&
//                 response?.data?.response &&
//                 response?.data?.response?.response === true &&
//                 response?.data?.response?.data
//             ) {
//                 toast.success(
//                     response?.data?.response?.success_msg || 'OTP verified successfully.'
//                 );
//                 handleNext();
//             } else {
//                 toast.error(response?.data?.response?.error_msg || 'Failed to verify OTP. Please try again.');
//             }
//         } catch (error) {
//             setLoading(false); // Stop loading on error
//             console.error('Error verifying OTP:', error);
//             toast.error(error.response?.data?.message || 'An error occurred while verifying OTP.');
//         }
//     };

//     const handleResendOtp = () => {
//         onResendOtp();
//         setMinutes(5);
//         setSeconds(0);
//         setIsResendEnabled(false);
//     };

//     const formatTime = (minutes, seconds) => {
//         return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     };

//     return (
//         <div className='new-verify-form'>
//             <div className='verify-form-container'>
//                 <h2 className='login-head'>
//                     <FaAngleLeft onClick={handleBack} style={{ cursor: 'pointer' }} />
//                     Verify account 
//                 </h2>
//                 {loading && (
//                     <div className="loading-indicator">
//                         <Spinner animation="border" variant="primary" />
//                         <span>Verifying OTP...</span>
//                     </div>
//                 )}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="otp">
//                         <label className='verify-label'>
//                             We have sent you a verification code to your email.
//                             Please confirm it now.
//                         </label>
//                         <div className="verify-input-container">
//                             {otp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     type="text"
//                                     value={digit}
//                                     onChange={(e) => handleChange(e, index)}
//                                     maxLength="1"
//                                     className="verify-input"
//                                     ref={(el) => (inputRefs.current[index] = el)}
//                                     disabled={loading} // Disable input while loading
//                                 />
//                             ))}
//                         </div>
//                     </Form.Group>
//                     <p className='resend-txt'>
//                         Resend verification in <span>{formatTime(minutes, seconds)}</span>
//                     </p>
//                     <hr />
//                     <button variant="primary" type="submit" className='login-btn' disabled={loading}>
//                         Submit
//                     </button>
//                 </Form>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default VerifyEmailOTP;
