import React, { useState, useCallback } from 'react';
import RandomDogContainer from './components/RandomDogContainer';
import DogList from './components/DogList';
import FavouritesList from './components/FavouritesList';
import './App.css';

function App() {
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedDogIndex, setSelectedDogIndex] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const handleThumbnailClick = useCallback((dog, index) => {
    setSelectedDog(dog);
    setSelectedDogIndex(index);
  }, []);

  const handleHeroRefresh = useCallback(() => {
    // Clear selection when hero is refreshed manually
    setSelectedDog(null);
    setSelectedDogIndex(null);
  }, []);

  const handleFavouriteToggle = useCallback((dog) => {
    setFavourites(prevFavourites => {
      const existingIndex = prevFavourites.findIndex(
        fav => fav.imageUrl === dog.imageUrl
      );
      
      if (existingIndex >= 0) {
        // Remove from favourites
        return prevFavourites.filter((_, index) => index !== existingIndex);
      } else {
        // Add to favourites
        return [...prevFavourites, dog];
      }
    });
  }, []);

  const isFavourite = useCallback((dog) => {
    return favourites.some(fav => fav.imageUrl === dog.imageUrl);
  }, [favourites]);

  const handleFavouriteClick = useCallback((dog, index) => {
    setSelectedDog(dog);
    setSelectedDogIndex(null); // Clear gallery selection when selecting from favourites
  }, []);

  return (
    <div className="app">
      <div className="app-layout">
        <main className="main-content">
          {/* Featured Random Dog Section */}
          <section className="hero-section">
            <RandomDogContainer
              selectedDog={selectedDog}
              onRefresh={handleHeroRefresh}
              onFavouriteToggle={handleFavouriteToggle}
              isFavourite={selectedDog ? isFavourite(selectedDog) : false}
              favourites={favourites}
            />
          </section>

          <section className="gallery-section">
            <DogList
              onThumbnailClick={handleThumbnailClick}
              selectedDogIndex={selectedDogIndex}
              onFavouriteToggle={handleFavouriteToggle}
              isFavourite={isFavourite}
            />
          </section>
        </main>

        {/* Favourites Sidebar */}
        <aside className="sidebar">
          <FavouritesList
            favourites={favourites}
            onFavouriteClick={handleFavouriteClick}
          />
        </aside>
      </div>

      <footer className="app-footer">
        <p>
          Powered by  {' '}
          <a
            href="https://dog.ceo/dog-api/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Dog CEO API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
