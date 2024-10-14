// import React, { useState } from 'react';
// import { FaAngleLeft } from "react-icons/fa6";
// import EmailModal from './EmailModal';
// import OtpModal from './OtpModal';
// import { useNavigate, Link } from 'react-router-dom'; // Import Link
// import ChangePasswordModal from './ChangePasswordModal';
// import './Login.css';

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

//     const handleSignIn = () => {

//         setStep(2);
//     };

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
//                     <button type="submit" className='login-btn'>Next</button>
//                     <Link to="/signup" className="signup-link">
//                         <p className='SignUp-LoginPage'>Don't have an account? Sign up</p>
//                     </Link>
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
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import EmailModal from './EmailModal';
import OtpModal from './OtpModal';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import ChangePasswordModal from './ChangePasswordModal';
import { UserLoginAPI } from './../../../utils/APIs/credentialsApis'; // Import the API function
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from "../../../Loader/Loader/Loader";

const Login = () => {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            setLoading(true); 
            const body = {
                email: email,
            };
            // const response = await UserLoginAPI(body);
            const response = await axios.post(
                "https://dineright.techfluxsolutions.com/api/auth/loginWithOtp",
                body
              );

            setLoading(false); 

            if (response.data.response === true) {
                toast.success(response.data.success_msg || "Login successful!");
                setStep(2);
            } else {
                toast.error(response.data.error_msg || "Login failed. Please try again.");
            }
        } catch (error) {
            setLoading(false); 
            console.error("Error during login:", error);
            toast.error("An error occurred during login. Please try again later.");
        }
    };

    return (
        <>  {loading && <Loader />}
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
                    {/* <label htmlFor="password" className='login-label'>Password</label>
                    <input
                        type="password"
                        id="password"
                        className='login-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /> */}
                    <button type="submit" className='login-btn' >
                        Next
                    </button>
                    <Link to="/signup" className="signup-link">
                        <p className='SignUp-LoginPage'>Don't have an account? Sign up</p>
                    </Link>
                </form>
            </div>
            {step === 1 && (
                <EmailModal
                    isOpen={step === 1}
                    onHide={() => setStep(0)}
                    onEmailSubmit={(email) => setEmail(email)}
                />
            )}
            {step === 2 && (
                <OtpModal
                    isOpen={step === 2}
                    onHide={() => setStep(0)}
                    onOtpSubmit={(otp) => setStep(3)}
                />
            )}
            {step === 3 && (
                <ChangePasswordModal
                    isOpen={step === 3}
                    onHide={() => setStep(0)}
                    onPasswordReset={(password) => setStep(0)}
                />
            )}
        </div>
        </>
    );
};

export default Login;
