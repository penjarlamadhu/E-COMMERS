import React from 'react';
import './Error.css';

const Error = ({ message, onDismiss }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <span className="error-icon">❌</span>
        <p>{message}</p>
        {onDismiss && (
          <button onClick={onDismiss} className="error-dismiss">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
