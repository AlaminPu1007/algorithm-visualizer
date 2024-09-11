import { GridProps } from '../types/uniquePathProps';

/**
 * A dynamic approach to create a (n * m) valid grid
 *
 * @param {number} rows
 * @param {number} cols
 * @returns {GridProps[][]}
 */
export const createGridWithUniquePath = (rows: number, cols: number, threshold: number = 0.3): GridProps[][] => {
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
      islandColor: '',
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
          grid[r][c].data = Math.random() > threshold ? 1 : 0; // Random obstacles
        }
      }
    }
    grid[0][0].data = 1; // Ensure the start is walkable
    grid[rows - 1][cols - 1].data = 1; // Ensure the end is walkable
  }

  return grid;
};
