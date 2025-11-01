import React, { useState, useEffect } from 'react';
import { fetchRandomDogImage, getBreedFromImageUrl } from '../services/dogApi';
import HeroSection from './HeroSection';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const RandomDogContainer = ({ 
  elementType = 'div',
  className = ''
}) => {
  const [dogData, setDogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandomDog = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const imageUrl = await fetchRandomDogImage();
      const breedName = getBreedFromImageUrl(imageUrl);
      
      setDogData({
        imageUrl,
        breedName: breedName.replace(/\b\w/g, l => l.toUpperCase()),
        displayName: breedName.replace(/\b\w/g, l => l.toUpperCase()),
        breed: breedName.split(' ')[0],
        subBreed: breedName.split(' ')[1] || null
      });
    } catch (err) {
      setError('Failed to load random dog. Please try again.');
      console.error('Error loading random dog:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomDog();
  }, []);

  const Element = elementType;

  if (loading) {
    return (
      <Element className={`random-dog-container ${className}`}>
        <LoadingState 
          message="Loading a beautiful dog for you..."
        />
      </Element>
    );
  }

  if (error) {
    return (
      <Element className={`random-dog-container ${className}`}>
        <ErrorState 
          message={error}
          onRetry={loadRandomDog}
        />
      </Element>
    );
  }

  return (
    <Element className={`random-dog-container ${className}`}>
      <HeroSection
        dog={dogData}
        onRefresh={loadRandomDog}
      />
    </Element>
  );
};

export default RandomDogContainer;