import React from 'react';

const FavoritesList = ({
  favorites = [],
  onFavoriteClick = null,
  selectedDogIndex = null,
  className = ''
}) => {
  return (
    <aside className={`favorites-container ${className}`}>
      <header className="favorites-header">
        <h2>❤️ Favorites</h2>
        <span className="favorites-count">
          {favorites.length} {favorites.length === 1 ? 'dog' : 'dogs'}
        </span>
      </header>

      <section className="favorites-content">
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-favorites-icon">🐕</div>
            <p>No favorites yet</p>
            <small>Click the heart icon on any dog to add it to your favorites!</small>
          </div>
        ) : (
          <ul className="favorites-list">
            {favorites.map((dog, index) => (
              <li
                key={`favorite-${dog.breed}-${dog.subBreed}-${index}`}
                className={`favorite-item ${selectedDogIndex === index ? 'selected' : ''}`}
                onClick={() => onFavoriteClick && onFavoriteClick(dog, index)}
              >
                <div className="favorite-image-container">
                  <img
                    src={dog.imageUrl}
                    alt={`A ${dog.displayName}`}
                    className="favorite-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=🐕';
                    }}
                  />
                </div>
                <div className="favorite-info">
                  <h4 className="favorite-breed">{dog.displayName}</h4>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
};

export default FavoritesList;
