// src/components/ComingSoonModal.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './ComingSoonModal.css';

const ComingSoonModal = ({ open, onClose, feature }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      className="coming-soon-modal"
      PaperProps={{
        className: "modal-paper"
      }}
    >
      <DialogTitle className="modal-title">
        <Box className="title-container">
          <FontAwesomeIcon icon={faExclamationCircle} className="title-icon" />
          <Typography variant="h5">Coming Soon!</Typography>
        </Box>
      </DialogTitle>
      <DialogContent className="modal-content">
        <Typography variant="body1">
          Our {feature || "social media"} integration is currently under development and will be available soon.
        </Typography>
        <Typography variant="body1" className="modal-message">
          We're working hard to bring you the best experience possible. Thank you for your patience!
        </Typography>
      </DialogContent>
      <DialogActions className="modal-actions">
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="contained"
          className="modal-button"
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComingSoonModal;
