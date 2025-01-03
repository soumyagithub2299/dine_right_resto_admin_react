import React from 'react';

const CommonModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; // Return nothing if modal is closed

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Blackish blurred background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onClose} // Close modal on clicking outside
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '80%',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <p style={{ marginBottom: '20px' }}>{message}</p>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            outline: 'none',
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CommonModal;
