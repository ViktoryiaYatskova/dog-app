import React from 'react';

const FavouritesList = ({
  favourites = [],
  onFavouriteClick = null,
  selectedDogIndex = null,
  className = ''
}) => {
  return (
    <aside className={`favourites-container ${className}`}>
      <header className="favourites-header">
        <h2>❤️ Favourites</h2>
        <span className="favourites-count">
          {favourites.length} {favourites.length === 1 ? 'dog' : 'dogs'}
        </span>
      </header>

      <section className="favourites-content">
        {favourites.length === 0 ? (
          <div className="empty-favourites">
            <div className="empty-favourites-icon">🐕</div>
            <p>No favourites yet</p>
            <small>Click the heart icon on any dog to add it to your favourites!</small>
          </div>
        ) : (
          <ul className="favourites-list">
            {favourites.map((dog, index) => (
              <li
                key={`favourite-${dog.breed}-${dog.subBreed}-${index}`}
                className={`favourite-item ${selectedDogIndex === index ? 'selected' : ''}`}
                onClick={() => onFavouriteClick && onFavouriteClick(dog, index)}
              >
                <div className="favourite-image-container">
                  <img
                    src={dog.imageUrl}
                    alt={`A ${dog.displayName}`}
                    className="favourite-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=🐕';
                    }}
                  />
                </div>
                <div className="favourite-info">
                  <h4 className="favourite-breed">{dog.displayName}</h4>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
};

export default FavouritesList;