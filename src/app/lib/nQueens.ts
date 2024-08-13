import { ICell } from '../types/NQueensProps';

/**
 * To check valid or safe position to put a queen into grid
 *
 * @reference {https://github.com/AlaminPu1007/Data-structure-Algorithm/blob/master/DataStructure%20%26%20Algorithm/Recursion/N-Queens/n_queens_without_hashing.cpp} understand more readable to check valid queen
 * @param {number} row current row index of currently putted queen
 * @param {number} col current col index of currently putted queen
 * @param {number[]} board
 * @returns {boolean}
 */

export const isPutQueen = (row: number, col: number, board: number[]) => {
  for (let i = 0; i < col; i++) {
    /*
      board[i] === row checks if there is another queen in the same row in any previous column.
      Math.abs(board[i] - row) === Math.abs(i - col) checks for diagonal conflicts
     */
    if (board[i] === row || Math.abs(board[i] - row) === Math.abs(i - col)) {
      return false;
    }
  }
  return true;
};

/**
 * Description placeholder
 *
 * @param {number[]} board
 */
export const updateGrid = (board: number[], grid: ICell[][]) => {
  const newGrid = grid.map((rowArr, rowIndex) =>
    rowArr.map((cell, colIndex) => ({
      ...cell,
      value: board[colIndex] === rowIndex ? 1 : 0,
    }))
  );
  // setGrid(newGrid);
  return newGrid;
};

/**
 * Description placeholder
 *
 * @param {string} input
 * @returns {{ display: string; gap: string; gridTemplateColumns: string; width: string; height: string; }}
 */
export const gridStyle = (input: string) => {
  return {
    display: 'grid',
    gap: '0',
    gridTemplateColumns: `repeat(${input}, 1fr)`,
    width: '80vmin',
    height: '80vmin',
  };
};
