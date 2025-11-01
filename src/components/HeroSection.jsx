import React from 'react';
import DogCard from './DogCard';

const HeroSection = ({
  dog,
  onRefresh,
  onFavouriteToggle = null,
  isFavourite = false,
  className = ''
}) => {
  return (
    <section className={`hero-section-content ${className}`}>
      <div className="hero-wrapper">
        <h1 className="app-title">🐕 Random Dog Gallery</h1>
        <div className="featured-dog-container">
          <DogCard
            dog={dog}
            onFavouriteToggle={onFavouriteToggle}
            isFavourite={isFavourite}
            className="hero-dog-card"
          />
          {onRefresh && (
            <button onClick={onRefresh} className="hero-refresh-button">
              🔄 Get Another Dog
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
