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
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system"; 

// Styled components
const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", 
    borderRadius: "8px",
  },
});

const StyledDialogContent = styled(DialogContent)({
  overflowX: "hidden",
});

const StyledCloseButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#f50057", 
});

const ModalBackground = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  zIndex: 1,
});

const SignUpSuccessModal = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  // Prevent closing on backdrop click
  const handleCloseDialog = (event, reason) => {
    if (reason !== "backdropClick") {
      handleClose();
    }
  };

  return (
    <>
      {open && <ModalBackground />}
      <StyledDialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="span">
            Congratulations!
          </Typography>
          <StyledCloseButton onClick={handleClose} aria-label="close">
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
              color: '#FFFFFF', 
              backgroundColor: '#007BFF', 
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3'; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007BFF'; 
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
