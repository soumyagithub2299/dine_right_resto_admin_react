import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaAngleLeft } from 'react-icons/fa';
import './CreatePassword.css'; 

const CreatePassword = ({ handleNext, handleBack }) => { // Add handleBack here
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');

    // Function to validate password requirements
    const validatePassword = (pwd) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasLowercase = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const hasSymbol = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(pwd);
        return {
            isValid: pwd.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSymbol,
            errors: ['Set up a strong password with at least',
                pwd.length < minLength ? '8 characters' : '',
                !hasUppercase ? '1 uppercase letter' : '',
                !hasLowercase ? '1 lowercase letter' : '',
                !hasNumber ? '1 number' : '',
                !hasSymbol ? '1 symbol' : ''
            ].filter(Boolean)   
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]); // Reset errors before validating
        setSuccess(''); // Clear success message

        const { isValid, errors: validationErrors } = validatePassword(password);

        // If the password doesn't meet the validation criteria, show the errors
        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrors(prevErrors => [...prevErrors, 'Passwords do not match.']);
            return;
        }

        // If validation passes, show success message and reset the form
        setSuccess('Password has been reset successfully!');
        handleNext(); // Move to the next step only after successful validation
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className='new-verify-form'>
            <div className="verify-form-container">
                 <h2 className='login-head'>
                     <FaAngleLeft 
                         onClick={handleBack}  // Use handleBack for going back to previous step
                         style={{ cursor: 'pointer' }} 
                     /> 
                     Create password 
                 </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password">
                    <Form.Label className='login-label'>New Password</Form.Label>
                    <input
                        type="password"
                        className='pass-input'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <Form.Label className='pass-label'>Confirm New Password</Form.Label>
                    <input
                        type="password"
                        className='pass-input'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    
                    {/* Show error messages */}
                    {errors.length > 0 && (
                        <div className="error-messages">
                            {errors.map((error, index) => (
                                <div key={index} className="error-msg-txt">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Show success message */}
                    {success && <div className="success-message">{success}</div>}
                </Form.Group>
                
                <button variant="primary" type="submit" className='login-btn'>
                    Save Changes
                </button>
            </Form>
        </div>
        </div>
    );
};

export default CreatePassword;
