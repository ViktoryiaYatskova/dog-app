import React, { useState, useCallback } from 'react';
import RandomDogContainer from './components/RandomDogContainer';
import DogList from './components/DogList';
import FavoritesList from './components/FavoritesList';
import './App.css';

function App() {
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedDogIndex, setSelectedDogIndex] = useState(null);

  const handleThumbnailClick = useCallback((dog, index) => {
    setSelectedDog(dog);
    setSelectedDogIndex(index);
  }, []);

  const handleHeroRefresh = useCallback(() => {
    // Clear selection when hero is refreshed manually
    setSelectedDog(null);
    setSelectedDogIndex(null);
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
            />
          </section>

          <section className="gallery-section">
            <DogList
              onThumbnailClick={handleThumbnailClick}
              selectedDogIndex={selectedDogIndex}
            />
          </section>
        </main>

        {/* Favorites Sidebar */}
        <aside className="sidebar">
          <FavoritesList
            favorites={[]}
            onFavoriteClick={handleThumbnailClick}
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
