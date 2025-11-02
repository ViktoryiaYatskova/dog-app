import React, { useState, useEffect, useCallback } from 'react';
import { fetchRandomDogs } from '../services/dogApi';
import DogCard from './DogCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { generateDogKeyWithIndex } from '../utils/dog-utils';

const DogList = ({
  number = 10,
  onThumbnailClick = null,
  selectedDogIndex = null,
  onFavouriteToggle = null,
  isFavourite = null
}) => {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandomDogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const randomDogs = await fetchRandomDogs(number);
      setDogs(randomDogs);
    } catch (err) {
      setError('Failed to load dog gallery. Please try again.');
      console.error('Error loading random dogs:', err);
    } finally {
      setLoading(false);
    }
  }, [number]);

  useEffect(loadRandomDogs, [loadRandomDogs]);

  return (
    <div className="dog-list-container">
      <div className="section-header">
        <h2>🐾 Dog Gallery</h2>
        <p>Here are {number} random dogs from different breeds</p>
        <button onClick={loadRandomDogs} className="refresh-gallery-button">
          🔄 Refresh Gallery
        </button>
      </div>

      {loading && (
        <LoadingState
          message="Discovering amazing dogs from around the world..."
        />
      )}

      {error && (
        <ErrorState
          message={error}
          onRetry={loadRandomDogs}
        />
      )}

      {!loading && !error && (
        <>
          <ul className="dog-grid" role="list">
            {dogs.map((dog, index) => (
              <DogCard
                key={generateDogKeyWithIndex(dog, index)}
                elementType="li"
                dog={dog}
                index={index}
                onClick={onThumbnailClick}
                isSelected={selectedDogIndex === index}
                onFavouriteToggle={onFavouriteToggle}
                isFavourite={isFavourite ? isFavourite(dog) : false}
              />
            ))}
          </ul>

          {dogs.length === 0 && (
            <div className="no-dogs-message">
              <p>No dogs found. Please try refreshing the gallery.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DogList;