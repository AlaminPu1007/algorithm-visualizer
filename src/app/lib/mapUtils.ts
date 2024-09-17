/**
 * Creates a new map by adding a key-value pair to a copy of the original map.
 *
 * This function does not modify the original map but returns a new map with the new key-value pair added.
 *
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 * @param {Map<K, V>} originalMap - The original map to which the key-value pair will be added.
 * @param {K} key - The key to be added to the map.
 * @param {V} value - The value associated with the key.
 * @returns {Map<K, V>} - A new map with the key-value pair added.
 */
export const appendToMapWithNewValue = <K, V>(originalMap: Map<K, V>, key: K, value: V): Map<K, V> => {
  // Create a new map from the original one
  const newMap = new Map(originalMap);

  // Set the new key-value pair
  newMap.set(key, value);

  // Return the new map
  return newMap;
};

/**
 * Checks if a key exists in a map.
 *
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 * @param {Map<K, V>} map - The map to check.
 * @param {K} key - The key to check for existence.
 * @returns {boolean} - Returns true if the key exists in the map, otherwise false.
 */
export const hasKey = <K, V>(map: Map<K, V>, key: K): boolean => {
  return map.has(key);
};

/**
 * Deletes a key from a map and returns a new map with the key removed.
 *
 * @template K - The type of keys in the map.
 * @template V - The type of values in the map.
 * @param {Map<K, V>} dataMap - The original map from which to delete the key.
 * @param {K} key - The key to be deleted.
 * @returns {Map<K, V>} - Returns a new map with the key removed. If the key was not found, returns the original map.
 */
export const deleteKey = <K, V>(dataMap: Map<K, V>, key: K): Map<K, V> => {
  // Create a new map from the existing map
  const newMap = new Map(dataMap);

  // Check if the key exists and delete it
  if (newMap.has(key)) {
    newMap.delete(key);
  }

  // Return the new map
  return newMap;
};
