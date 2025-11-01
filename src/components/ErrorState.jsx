import React from 'react';

const ErrorState = ({ 
  elementType = 'div',
  message = 'Something went wrong. Please try again.',
  onRetry = null,
  retryText = 'Try Again',
  className = ''
}) => {
  const Element = elementType;

  return (
    <Element className={`error-state ${className}`}>
      <div className="error-content">
        <p className="error-message">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            {retryText}
          </button>
        )}
      </div>
    </Element>
  );
};

export default ErrorState;