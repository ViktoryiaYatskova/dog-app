const DOG_API_BASE = 'https://dog.ceo/api';

// Fetch all available breeds
export const fetchAllBreeds = async () => {
  try {
    const response = await fetch(`${DOG_API_BASE}/breeds/list/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
};

// Get a random image for a specific breed
export const fetchBreedImage = async (breed, subBreed = null) => {
  try {
    const breedPath = subBreed ? `${breed}/${subBreed}` : breed;
    const response = await fetch(`${DOG_API_BASE}/breed/${breedPath}/images/random`);
    if (!response.ok) {
      throw new Error(`Failed to fetch image for ${breed}`);
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(`Error fetching image for ${breed}:`, error);
    throw error;
  }
};

// Get a completely random dog image
export const fetchRandomDogImage = async () => {
  try {
    const response = await fetch(`${DOG_API_BASE}/breeds/image/random`);
    if (!response.ok) {
      throw new Error('Failed to fetch random dog image');
    }
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching random dog image:', error);
    throw error;
  }
};

// Helper function to get breed name from image URL
export const getBreedFromImageUrl = (imageUrl) => {
  try {
    // Extract breed from URL pattern: https://images.dog.ceo/breeds/breed-subbreed/filename.jpg
    const urlParts = imageUrl.split('/');
    const breedPart = urlParts[4]; // The breed part in the URL
    
    if (breedPart.includes('-')) {
      const [breed, subBreed] = breedPart.split('-');
      return `${breed} ${subBreed}`;
    }
    
    return breedPart;
  } catch (error) {
    console.error('Error extracting breed from URL:', error);
    return 'Unknown breed';
  }
};

// Helper function to format breed name for display
export const formatBreedName = (breed, subBreed = null) => {
  if (subBreed) {
    return `${breed} ${subBreed}`.replace(/\b\w/g, l => l.toUpperCase());
  }
  return breed.replace(/\b\w/g, l => l.toUpperCase());
};

// Get random breeds with their images
export const fetchRandomDogs = async (count = 10) => {
  try {
    const breeds = await fetchAllBreeds();
    const breedEntries = [];
    
    // Flatten breeds with sub-breeds
    Object.entries(breeds).forEach(([breed, subBreeds]) => {
      if (subBreeds.length > 0) {
        subBreeds.forEach(subBreed => {
          breedEntries.push({ breed, subBreed });
        });
      } else {
        breedEntries.push({ breed, subBreed: null });
      }
    });
    
    // Shuffle and select random breeds
    const shuffled = breedEntries.sort(() => 0.5 - Math.random());
    const selectedBreeds = shuffled.slice(0, count);
    
    // Fetch images for selected breeds
    const dogPromises = selectedBreeds.map(async ({ breed, subBreed }) => {
      try {
        const imageUrl = await fetchBreedImage(breed, subBreed);
        return {
          breed,
          subBreed,
          imageUrl,
          displayName: formatBreedName(breed, subBreed)
        };
      } catch (error) {
        console.error(`Failed to fetch image for ${breed}:`, error);
        return null;
      }
    });
    
    const results = await Promise.all(dogPromises);
    return results.filter(dog => dog !== null);
  } catch (error) {
    console.error('Error fetching random dogs:', error);
    throw error;
  }
};
