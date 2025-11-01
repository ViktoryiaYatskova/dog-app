import React from 'react';
import RandomDogContainer from './components/RandomDogContainer';
import DogList from './components/DogList';
import './App.css';

function App() {
  return (
    <div className="app">
      <main className="main-content">
        {/* Featured Random Dog Section */}
        <section className="hero-section">
          <RandomDogContainer />
        </section>

        {/* Dog Gallery Section */}
        <section className="gallery-section">
          <DogList />
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Powered by{' '}
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
