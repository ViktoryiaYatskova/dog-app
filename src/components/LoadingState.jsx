import React from 'react';

const LoadingState = ({ 
  elementType = 'div',
  message = 'Loading...',
  className = ''
}) => {
  const Element = elementType;

  return (
    <Element className={`loading-state ${className}`}>
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </Element>
  );
};

export default LoadingState;