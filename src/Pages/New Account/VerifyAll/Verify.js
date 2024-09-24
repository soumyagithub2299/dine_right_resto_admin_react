import React, { useState } from 'react';
import VerifyNumber from './VerifyNumber';
import VerifyEmail from './VerifyEmail';

const Verify = ({ handleNext, handleBack }) => {
  // State to track whether email verification is active
  const [isEmailVerification, setIsEmailVerification] = useState(false);

  // Function to switch to email verification view
  const switchToEmailVerification = () => {
    setIsEmailVerification(true);
  };

  // Function to switch to phone verification view
  const switchToPhoneVerification = () => {
    setIsEmailVerification(false);
  };

  return (
    <div>
      {isEmailVerification ? (
        <VerifyEmail switchToPhoneVerification={switchToPhoneVerification}  handleNext={handleNext} />
      ) : (
        <VerifyNumber switchToEmailVerification={switchToEmailVerification}  handleNext={handleNext}/>
      )}
    </div>
  );
};

export default Verify;
