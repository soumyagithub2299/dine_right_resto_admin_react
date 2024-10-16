import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, StepConnector } from '@mui/material';
import './NewAccount.css';
import CreateAccount from './CreateAccount/CreateAccount';
import RestroDetails from './RestroDetails/RestroDetails';
import GuestTimeSlot from './GuestTimeSlot/GuestTimeSlot';
import AddService from './AddServices/AddService';
import DinningArea from './DiningAreas/DinningArea';
import AddTable from './AddTable/AddTable';
import VerifyEmailOTP from './VerifyAll/VerifyEmailOTP';

const CustomStepConnector = (props) => (
  <StepConnector {...props} className="custom-step-connector" />
);

const steps = [
  'Create a new account',
  'Add restaurant details',
  'Verify account',
  'Guest Time',
  'Add service hours',
  'Add dining area',
  'Add Tables',
];

const NewAccount = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userId, setUserId] = useState(null);


  const handleNext = () => {

    const userId = sessionStorage.getItem("newSignUpRestoUserId");
    setUserId(userId);

    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepContents = [


    <CreateAccount handleNext={handleNext} />,
    <RestroDetails handleNext={handleNext} handleBack={handleBack}  userId={userId}/>,
    <VerifyEmailOTP handleNext={handleNext} handleBack={handleBack} userId={userId}/>,
    <GuestTimeSlot handleNext={handleNext} handleBack={handleBack} userId={userId}/>,
    <AddService handleNext={handleNext} handleBack={handleBack} userId={userId}/>,
    <DinningArea handleNext={handleNext} handleBack={handleBack} userId={userId}/>,
    <AddTable handleNext={handleNext} handleBack={handleBack} userId={userId}/>


  ];

  return (
    <div className="stepper">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomStepConnector />}
        className="stepper-icon-active"
      >
        {steps.map((label) => (
          <Step key={label} className="stepper-icon-active">
            <StepLabel className="stepper-icon-active">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ p: 3 }}>
        {activeStep === steps.length - 1 ? (
          <AddTable handleNext={handleNext} handleBack={handleBack} />
        ) : (
          stepContents[activeStep]
        )}
      </Box>
    </div>
  );
};

export default NewAccount;
