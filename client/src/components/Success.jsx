import React from 'react';
import './Success.css';

const Success = ({ message, onDismiss }) => {
  React.useEffect(() => {
    if (onDismiss) {
      const timer = setTimeout(onDismiss, 3000);
      return () => clearTimeout(timer);
    }
  }, [onDismiss]);

  return (
    <div className="success-container">
      <div className="success-message">
        <span className="success-icon">✓</span>
        <p>{message}</p>
        {onDismiss && (
          <button onClick={onDismiss} className="success-dismiss">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Success;
