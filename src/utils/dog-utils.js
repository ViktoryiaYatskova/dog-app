/**
 * Utility functions for dog-related operations
 */

/**
 * Generate a unique identifier for a dog based on breed and sub-breed
 * @param {Object} dog - The dog object
 * @param {string} dog.breed - The main breed
 * @param {string|null} dog.subBreed - The sub-breed (optional)
 * @returns {string} Unique identifier in format "breed-subbreed" or "breed-"
 */
export const generateDogId = (dog) => {
  if (!dog || !dog.breed) {
    throw new Error('Dog object must have a breed property');
  }
  return `${dog.breed}-${dog.subBreed || ''}`;
};

/**
 * Generate a React key for a dog item in a list
 * @param {Object} dog - The dog object
 * @param {string} dog.breed - The main breed
 * @param {string|null} dog.subBreed - The sub-breed (optional)
 * @param {string} prefix - Optional prefix for the key (default: 'dog')
 * @returns {string} React key in format "prefix-breed-subbreed"
 */
export const generateDogKey = (dog, prefix = 'dog') => {
  const id = generateDogId(dog);
  return `${prefix}-${id}`;
};

/**
 * Generate a React key for a dog item with index fallback
 * @param {Object} dog - The dog object
 * @param {number} index - The index in the array
 * @param {string} prefix - Optional prefix for the key (default: 'dog')
 * @returns {string} React key with index fallback for uniqueness
 */
export const generateDogKeyWithIndex = (dog, index, prefix = 'dog') => {
  const baseKey = generateDogKey(dog, prefix);
  return `${baseKey}-${index}`;
};

/**
 * Check if two dogs are the same based on their unique identifiers
 * @param {Object} dog1 - First dog object
 * @param {Object} dog2 - Second dog object
 * @returns {boolean} True if dogs have the same ID
 */
export const isSameDog = (dog1, dog2) => {
  if (!dog1 || !dog2) return false;
  return generateDogId(dog1) === generateDogId(dog2);
};

/**
 * Find a dog in an array by its unique identifier
 * @param {Array} dogs - Array of dog objects
 * @param {string} dogId - The unique identifier to search for
 * @returns {Object|undefined} The found dog object or undefined
 */
export const findDogById = (dogs, dogId) => {
  return dogs.find(dog => generateDogId(dog) === dogId);
};

/**
 * Remove a dog from an array by its unique identifier
 * @param {Array} dogs - Array of dog objects
 * @param {string} dogId - The unique identifier of the dog to remove
 * @returns {Array} New array with the dog removed
 */
export const removeDogById = (dogs, dogId) => {
  return dogs.filter(dog => generateDogId(dog) !== dogId);
};
