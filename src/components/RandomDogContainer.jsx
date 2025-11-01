import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchRandomDogImage, getBreedFromImageUrl } from '../services/dogApi';
import HeroSection from './HeroSection';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

const RandomDogContainer = ({ 
  elementType = 'div',
  selectedDog = null,
  onRefresh = null,
  onFavouriteToggle = null,
  isFavourite = false,
  favourites = [],
  className = ''
}) => {
  const [dogData, setDogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandomDog = useCallback(async () => {
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
  }, []);

  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      onRefresh(); // Notify parent to clear selection
    }
    loadRandomDog();
  }, [onRefresh, loadRandomDog]);

  useEffect(() => {
    if (selectedDog) {
      // Use selected dog from gallery
      setDogData(selectedDog);
      setLoading(false);
      setError(null);
    } else {
      // Load random dog when no selection
      loadRandomDog();
    }
  }, [selectedDog]);

  // Recalculate favourite status whenever dogData or favourites change
  const isCurrentDogFavourite = useMemo(() => {
    if (!dogData) return false;
    return favourites.some(fav => fav.imageUrl === dogData.imageUrl);
  }, [dogData, favourites]);

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
          onRetry={handleRefresh}
        />
      </Element>
    );
  }

  return (
    <Element className={`random-dog-container ${className}`}>
      <HeroSection
        dog={dogData}
        onRefresh={handleRefresh}
        onFavouriteToggle={onFavouriteToggle}
        isFavourite={isCurrentDogFavourite}
      />
    </Element>
  );
};

export default RandomDogContainer;