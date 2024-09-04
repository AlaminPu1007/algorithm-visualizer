/**
 * Get a size of random array of object
 *
 * @param {number} size
 * @returns {*}
 */
export const getRandomObject = (size: number) =>
  Array.from({ length: size }).map((item, i) => ({
    id: i + 1,
    data: Math.floor(Math.random() * 150 + 1),
    isSorted: false,
    currentItem: false,
    isSwapped: false,
    isFinished: false,
    isCurrentCompareAbleItem: false,
    isCandidate: false,
    isActive: false,
    xPosition: 0,
    isLeft: false,
    isRight: false,
  }));

/**
 * Get a valid grid move
 *
 * @param {number} row
 * @param {number} col
 * @param {number} n
 * @param {number} m
 * @returns {boolean}
 */
export const isValidDirection = (row: number, col: number, n: number, m: number) =>
  row >= 0 && row < n && col >= 0 && col < m;

/**
 * get a valid row, col size for select
 *
 * @param {number} [maxSize=12]
 * @returns {array} - a list of valid grid size
 */
export const gridRowColSize = (maxSize: number = 12) => {
  return Array.from({ length: maxSize }).map((item, i) => {
    return {
      id: i + 1,
      value: i + 4,
    };
  });
};
