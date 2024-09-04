import { GridProps } from '../types/uniquePathProps';

/**
 * A dynamic approach to create a (n * m) valid grid
 *
 * @param {number} rows
 * @param {number} cols
 * @returns {GridProps[][]}
 */
export const createGridWithPath = (rows: number, cols: number): GridProps[][] => {
  const grid = Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: cols }, (_, colIdx) => ({
      id: rowIdx * cols + colIdx + 1,
      data: 1, // Initialize with default value (1 for walkable cells)
      isVisit: false,
      isCurrent: false,
      isActive: false,
      isAdjacent: false,
      isReachAble: false,
      isInvalid: false,
      isMarked: false,
      parent: { rowIdx: -1, colIdx: -1 },
      isValidPath: false,
    }))
  );

  if (rows > 1 && cols > 1) {
    // Simple method to ensure a path from top-left to bottom-right
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (r === rows - 1 || c === cols - 1) {
          grid[r][c].data = 1; // Ensure the last row and column are walkable
        } else {
          // 0.3 -> if we increase this, it will create more most obstacles or brick
          grid[r][c].data = Math.random() > 0.3 ? 1 : 0; // Random obstacles
        }
      }
    }
    grid[0][0].data = 1; // Ensure the start is walkable
    grid[rows - 1][cols - 1].data = 1; // Ensure the end is walkable
  }

  return grid;
};

// export const pathFindingGridData: GridProps[][] = [
//   [
//     {
//       id: 1,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 2,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 3,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 4,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 5,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//   ],
//   [
//     {
//       id: 6,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 7,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 8,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 9,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 10,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//   ],
//   [
//     {
//       id: 11,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 12,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 13,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 14,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 15,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//   ],
//   [
//     {
//       id: 16,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 17,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 18,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 19,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 20,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//   ],
//   [
//     {
//       id: 21,
//       data: 0,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 22,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 23,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 24,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//     {
//       id: 25,
//       data: 1,
//       isVisit: false,
//       isCurrent: false,
//       isActive: false,
//       isAdjacent: false,
//       isReachAble: false,
//       isInvalid: false,
//       isMarked: false,
//       parent: { rowIdx: -1, colIdx: -1 },
//       isValidPath: false,
//     },
//   ],
// ];
