import { SudoKuBoardProps } from '../types/sudokyProps';

/**
 * Generates an array of unique random indices within a specified range for a 2D grid.
 *
 * @param {number} count - The number of unique random indices to generate.
 * @param {number} maxRow - The maximum number of rows in the grid.
 * @param {number} maxCol - The maximum number of columns in the grid.
 * @returns {number[][]} An array of unique random indices, where each index is represented as an array of two numbers [row, col].
 *
 * @example
 * const randomIndices = getRandomIndices(5, 9, 9);
 * // Example output: [[0, 1], [3, 4], [7, 2], [5, 8], [1, 0]]
 */
const getRandomIndices = (count: number, maxRow: number, maxCol: number) => {
  const positions = new Set<string>();

  while (positions.size < count) {
    const row = Math.floor(Math.random() * maxRow);
    const col = Math.floor(Math.random() * maxCol);
    positions.add(`${row}-${col}`); // Add the position as a string to ensure uniqueness
  }

  return Array.from(positions).map((pos) => pos.split('-').map(Number));
};

/**
 * Adds a specified number of random '#' symbols to the Sudoku board by replacing values at random positions.
 *
 * @param {SudoKuBoardProps[][]} tempBoard - A 9x9 Sudoku board represented as a 2D array of SudoKuBoardProps objects.
 * @param {number} [maxHashes=4] - The maximum number of '#' symbols to add to the board. Default is 4.
 * @returns {SudoKuBoardProps[][]} The updated Sudoku board with randomly placed '#' symbols.
 *
 * @example
 * const board = JSON.parse(JSON.stringify(SUDOKU_BOARD_DATA));
 * const updatedBoard = addRandomHashesToBoard(board, 5); // Adds 5 random '#' symbols
 */
export const addRandomHashesToBoard = (tempBoard: SudoKuBoardProps[][], maxHashes: number = 4) => {
  const randomPositions = getRandomIndices(maxHashes, 9, 9); // Get up to 4 random positions

  randomPositions.forEach(([row, col]) => {
    // Replace the value with '#'
    tempBoard[row][col].value = '#';
  });

  return tempBoard;
};

/**
 * Initiate board with it's default value
 *
 * @param {SudoKuBoardProps[][]} board
 * @returns {*}
 */
export const InitialGridWithDefaultValue = (board: SudoKuBoardProps[][]) => {
  return JSON.parse(JSON.stringify(board)).map((row: SudoKuBoardProps[]) =>
    row.map((cell) => ({
      ...cell,
      isValid: false, // Reset the validity of the cell
      isActive: false, // Reset the active state of the cell
      isCurrent: false, // Reset the current state of the cell
      isTarget: false, // Reset the target state of the cell
      isValidRowItem: false, // Reset the row validity flag
      isValidColItem: false, // Reset the column validity flag
      isValidSubGridItem: false, // Reset the sub-grid validity flag
      isInvalid: false, // Reset the invalid state of the cell
    }))
  );
};
