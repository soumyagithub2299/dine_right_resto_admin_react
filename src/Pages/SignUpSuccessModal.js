import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material"; // Importing Close Icon
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system"; // For styled components

// Styled components
const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Background shadow
    borderRadius: "8px", // Rounded corners
  },
});

const StyledDialogContent = styled(DialogContent)({
  overflowX: "hidden", // Prevent horizontal scroll
});

const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#f50057", // Color for the close button
});

const ModalBackground = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Background opacity behind modal
  zIndex: 1, // Behind the modal
});

const SignUpSuccessModal = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {open && <ModalBackground />} {/* Background opacity behind modal */}
      <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="span">
            Congratulations!
          </Typography>
          <StyledCloseButton
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </StyledCloseButton>
        </DialogTitle>
        <StyledDialogContent>
          <Typography variant="body1">
            You have been signed up successfully! Now please Log In and contact
            the super admin to verify and activate your account to be listed on
            our Dine Right website for end users.
          </Typography>
        </StyledDialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              color: '#FFFFFF', // White text color
              backgroundColor: '#007BFF', // Dark blue background color
              transition: 'background-color 0.3s ease', // Smooth transition for hover effect
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3'; // Darker blue on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007BFF'; // Original blue when not hovering
            }}
          >
            Okay 🤝
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default SignUpSuccessModal;
