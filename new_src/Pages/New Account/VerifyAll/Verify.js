import React, { useState } from 'react';
import VerifyEmailOTP from './VerifyEmailOTP';

const Verify = ({ handleNext, handleBack }) => {
  // State to track whether email verification is active (no longer needed)
  // const [isEmailVerification, setIsEmailVerification] = useState(false);

  // Function to switch to phone verification view (no longer needed)
  // const switchToPhoneVerification = () => {
  //   setIsEmailVerification(false);
  // };

  return (
    <div>
      <VerifyEmailOTP  handleNext={handleNext} />
    </div>
  );
};

export default Verify;
