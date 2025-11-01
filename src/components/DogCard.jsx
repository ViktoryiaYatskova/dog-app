import React, { useState } from 'react';

const DogCard = ({
  elementType = 'div',
  dog,
  index = null,
  className = ''
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const Element = elementType;

  // Ensure we have dog data
  if (!dog) {
    return null;
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = 'https://via.placeholder.com/200x200?text=🐕';
  };

  return (
    <Element className={`dog-card ${className}`}>
      <div className="dog-card-image-container">
        {!imageLoaded && !imageError && (
          <div className="dog-card-loading">
            <div className="loading-spinner-small"></div>
          </div>
        )}
        <img
          src={dog.imageUrl}
          alt={`A ${dog.displayName}`}
          className={`dog-card-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="dog-card-info">
        <h3 className="dog-card-breed">{dog.displayName}</h3>
        <div className="dog-card-actions">
          {index != null && (
            <span className="dog-card-number">#{index + 1}</span>
          )}
        </div>
      </div>
    </Element>
  );
};

export default DogCard;