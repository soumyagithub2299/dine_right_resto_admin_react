import React, { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import EmailModal from './EmailModal';
import OtpModal from './OtpModal';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import ChangePasswordModal from './ChangePasswordModal';
import './Login.css'; 

const Login = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = (email) => {
        setEmail(email);
        setStep(2); // Move to OTP step
    };

    const handleOtpSubmit = (otp) => {
        setOtp(otp);
        setStep(3); 
    };

    const handlePasswordReset = (password) => {
        setPassword(password);
        setStep(0); 
    };

    const handleForgotPassword = () => {
        setStep(1); // Open Email Modal
    };

    const handleClose = () => {
        setStep(0); 
    };

    const handleSignIn = () => {
        navigate('/dashboard');
    };

    return (
        <div className='main-container'>
            <div className="login-container">
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                    <h2 className='login-head'><FaAngleLeft /> Welcome Back </h2>
                    <label htmlFor="email" className='login-label'>Email</label>
                    <input
                        type="email"
                        id="email"
                        className='login-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className='login-label'>Password</label>
                    <input
                        type="password"
                        id="password"
                        className='login-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className='login-btn'>Sign In</button>
                    {/* Updated line: Replaced <p> with Link */}
                    <Link to="/signup" className="signup-link">
                        <p className='SignUp-LoginPage'>Don't have an account? Sign up</p>
                    </Link>
                    <div className='modal-sign-btn'>
                        <button type="button" className='forgot-password-btn' onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div>
                </form>
            </div>
            {step === 1 && (
                <EmailModal 
                    isOpen={step === 1}
                    onHide={handleClose}
                    onEmailSubmit={handleEmailSubmit}
                />
            )}
            {step === 2 && (
                <OtpModal 
                    isOpen={step === 2}
                    onHide={handleClose}
                    onOtpSubmit={handleOtpSubmit}
                />
            )}
            {step === 3 && (
                <ChangePasswordModal 
                    isOpen={step === 3}
                    onHide={handleClose}
                    onPasswordReset={handlePasswordReset}
                />
            )}
        </div>
    );
};

export default Login;



// import React, { useState } from 'react';
// import { FaAngleLeft } from "react-icons/fa6";
// import EmailModal from './EmailModal';
// import OtpModal from './OtpModal';
// import { useNavigate } from 'react-router-dom';
// import ChangePasswordModal from './ChangePasswordModal';
// import './Login.css'; 
// import { UserLoginAPI } from '../../../utils/APIs/credentialsApis';
// import { toast, ToastContainer } from 'react-toastify';


// const Login = () => {
//     const [step, setStep] = useState(0);
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleEmailSubmit = (email) => {
//         setEmail(email);
//         setStep(2);
//     };

//     const handleOtpSubmit = (otp) => {
//         setOtp(otp);
//         setStep(3); 
//     };

//     const handlePasswordReset = (password) => {
//         setPassword(password);
//         setStep(0); 
//     };

//     const handleForgotPassword = () => {
//         setStep(1);
//     };

//     const handleClose = () => {
//         setStep(0); 
//     };
   

//     const handleSignIn = async () => {
//   const data = {
//     email: email,
//     password: password,
//   };

//   console.log("Data sent to API:", data);

//   try {
//     const response = await UserLoginAPI(data);
//     console.log("API response received:", response);
//     if (response?.data?.token) {
//       toast.success("Login Successful!");
//       navigate('/dashboard');
//     } else {
//       toast.error("Login Failed. Please check your credentials.");
//     }
//   } catch (error) {
//     if (error.response) {
//       console.error("Error status:", error.response.status);
//       console.error("Error data:", error.response.data);
//     } else {
//       console.error("Network/Setup error:", error.message);
//     }
//     toast.error("Login Failed. Please check your credentials.");
//   }
// };

//     return (
//         <div className='main-container'>
//             <div className="login-container">
//                 <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
//                     <h2 className='login-head'><FaAngleLeft /> Welcome Back </h2>
//                     <label htmlFor="email" className='login-label'>Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         className='login-input'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <label htmlFor="password" className='login-label'>Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className='login-input'
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit" className='login-btn'>Sign In</button>
//                     <div className='modal-sign-btn'>
//                         <button type="button" className='forgot-password-btn' onClick={handleForgotPassword}>
//                             Forgot Password?
//                         </button>
//                     </div>
//                 </form>
//             </div>
//             {step === 1 && (
//                 <EmailModal 
//                     isOpen={step === 1}
//                     onHide={handleClose}
//                     onEmailSubmit={handleEmailSubmit}
//                 />
//             )}
//             {step === 2 && (
//                 <OtpModal 
//                     isOpen={step === 2}
//                     onHide={handleClose}
//                     onOtpSubmit={handleOtpSubmit}
//                 />
//             )}
//             {step === 3 && (
//                 <ChangePasswordModal 
//                     isOpen={step === 3}
//                     onHide={handleClose}
//                     onPasswordReset={handlePasswordReset}
//                 />
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Login;
