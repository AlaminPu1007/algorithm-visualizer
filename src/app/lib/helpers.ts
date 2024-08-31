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
