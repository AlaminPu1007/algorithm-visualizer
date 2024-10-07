import { Sleep } from '@/app/lib/sleepMethod';
import { GridInputProps, SudoKuBoardProps } from '@/app/types/sudokyProps';
import React from 'react';
import { toast } from 'react-toastify';

/**
 * Checks if the given Sudoku board is valid.
 * A valid Sudoku board has no duplicate numbers in each row, column, and 3x3 sub-grid.
 *
 * @param {SudoKuBoardProps[][]} board - The 9x9 Sudoku board where each cell contains a value.
 * @returns {boolean} - Returns true if the Sudoku board is valid, otherwise false.
 */
const isValidSudoku = (board: SudoKuBoardProps[][]): boolean => {
  // Sets to track values in rows, columns, and sub-grids
  const rows = new Set();
  const cols = new Set();
  const grids = new Set();

  // Iterate through each cell in the 9x9 grid
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j].value;

      // Skip empty cells
      if (value === '#' || value === '') continue;

      // Create a unique key for row, column, and sub-grid checks
      const rowKey = `row-${i}-${value}`;
      const colKey = `col-${j}-${value}`;
      const gridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const gridKey = `grid-${gridIndex}-${value}`;

      // Check if the value already exists in the row, column, or sub-grid
      if (rows.has(rowKey) || cols.has(colKey) || grids.has(gridKey)) {
        return false; // Duplicate found, Sudoku is invalid
      }

      // Add keys to track the current value in the respective row, column, and sub-grid
      rows.add(rowKey);
      cols.add(colKey);
      grids.add(gridKey);
    }
  }

  // If no duplicates are found, return true (valid Sudoku)
  return true;
};

/**
 * Solves the given Sudoku board by filling in empty cells.
 * The function recursively checks each cell, validating the current placement
 * and backtracking if necessary.
 *
 * @param {SudoKuBoardProps[][]} board - The 9x9 Sudoku board to solve.
 * @returns {Promise<boolean>} - Returns a promise resolving to true if solved, otherwise false.
 */
export const Solve = async (
  board: SudoKuBoardProps[][],
  setBoard: React.Dispatch<React.SetStateAction<SudoKuBoardProps[][]>>,
  setInputsData: React.Dispatch<React.SetStateAction<GridInputProps[][]>>,
  speedRange: number
): Promise<boolean> => {
  // Before attempting to solve, check if the provided board is already valid
  if (!isValidSudoku(board)) {
    toast.error(`The Sudoku grid is invalid!`);
    return false;
  }

  const n: number = board.length;
  const m: number = board[0].length;

  // Iterate through each cell in the grid
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // Highlight the current cell being checked
      setBoard(() => {
        const tempData: SudoKuBoardProps[][] = [...board];
        tempData[i][j].isCurrent = true; // Mark the cell as the current one
        return tempData;
      });

      await Sleep(speedRange); // Sleep for visualization purposes

      // Deactivate the current cell highlighting after checking
      setBoard(() => {
        const tempData: SudoKuBoardProps[][] = [...board];
        tempData[i][j].isCurrent = false; // Remove the current cell mark
        return tempData;
      });

      // Check for empty cells (represented by '#')
      if (board[i][j].value === '#') {
        // Try numbers from 1 to 9 in the empty cell
        for (let c = 1; c <= 9; c++) {
          // Validate the placement of the number in the cell
          if (await isValid(board, i, j, String(c), setBoard, setInputsData, speedRange)) {
            board[i][j].value = String(c); // Place the number in the cell

            // Mark the cell as valid and update the board
            setBoard(() => {
              const tempData: SudoKuBoardProps[][] = [...board];
              tempData[i][j].isValid = true;
              return tempData;
            });

            // Recursively try to solve the rest of the board
            if (await Solve(board, setBoard, setInputsData, speedRange)) {
              return true; // If solved, return true
            } else {
              // If the current placement leads to an invalid solution, backtrack
              setBoard(() => {
                const tempData: SudoKuBoardProps[][] = [...board];
                tempData[i][j].isValid = false; // Mark the cell as invalid
                tempData[i][j].isInvalid = true; // Highlight it as an invalid choice
                return tempData;
              });

              await Sleep(speedRange); // Delay for visualization

              // Reset the invalid flag after the visualization
              setBoard(() => {
                const tempData: SudoKuBoardProps[][] = [...board];
                tempData[i][j].isInvalid = false;
                return tempData;
              });

              // Revert the cell back to empty
              board[i][j].value = '#';
            }
          }
        }

        return false; // Return false if no valid number is found for the current cell
      }
    }
  }

  // If all cells are successfully filled, notify success
  toast.success(`Sudoku solved successfully!`);
  return true; // Return true when the board is solved
};

/**
 * Checks if placing a number in a specific cell of the Sudoku board is valid.
 * It verifies the row, column, and 3x3 subgrid for duplicates of the number being placed.
 *
 * @param {SudoKuBoardProps[][]} board - The Sudoku board.
 * @param {number} row - The row index of the cell being checked.
 * @param {number} col - The column index of the cell being checked.
 * @param {string} c - The value to place in the cell.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if valid, otherwise false.
 */
const isValid = async (
  board: SudoKuBoardProps[][],
  row: number,
  col: number,
  c: string,
  setBoard: React.Dispatch<React.SetStateAction<SudoKuBoardProps[][]>>,
  setInputsData: React.Dispatch<React.SetStateAction<GridInputProps[][]>>,
  speedRange: number
): Promise<boolean> => {
  try {
    // Clone the board for immutability purposes when performing updates
    const tempUpdates: SudoKuBoardProps[][] = board.map((r) => r.map((cell) => ({ ...cell })));

    // Set the current cell with the given value for both board and input data
    setBoard(() => {
      const tempData = tempUpdates.map((r) => r.map((cell) => ({ ...cell })));
      tempData[row][col].value = String(c);
      return tempData;
    });
    setInputsData(() => {
      const tempData = tempUpdates.map((r) => r.map((cell) => ({ ...cell })));
      tempData[row][col].value = String(c);
      return tempData;
    });

    await Sleep(speedRange); // Delay for visualization

    // Check the column for duplicates
    for (let i = 0; i < 9; i++) {
      tempUpdates[i][col].isValidColItem = true; // Highlight the column being checked
      setBoard([...tempUpdates]);

      await Sleep(speedRange); // Visualization delay

      // If a duplicate is found in the column, mark it as invalid
      if (board[i][col].value === String(c)) {
        tempUpdates[i][col].isInvalid = true; // Highlight invalid cell
        setBoard([...tempUpdates]);
        await Sleep(speedRange);

        tempUpdates[i][col].isInvalid = false; // Reset invalid state
        setBoard([...tempUpdates]);

        return false; // Invalid placement
      }
    }

    // Check the row for duplicates
    for (let j = 0; j < 9; j++) {
      tempUpdates[row][j].isValidRowItem = true; // Highlight the row being checked
      setBoard([...tempUpdates]);

      await Sleep(speedRange); // Visualization delay

      // If a duplicate is found in the row, mark it as invalid
      if (board[row][j].value === String(c)) {
        tempUpdates[row][j].isInvalid = true; // Highlight invalid cell
        setBoard([...tempUpdates]);
        await Sleep(speedRange);

        tempUpdates[row][j].isInvalid = false; // Reset invalid state
        setBoard([...tempUpdates]);

        return false; // Invalid placement
      }
    }

    // Check the 3x3 subgrid for duplicates
    const subGridRowStart = Math.floor(row / 3) * 3;
    const subGridColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subGridRow = subGridRowStart + i;
        const subGridCol = subGridColStart + j;

        tempUpdates[subGridRow][subGridCol].isValidSubGridItem = true; // Highlight subgrid being checked
        setBoard([...tempUpdates]);

        await Sleep(speedRange); // Visualization delay

        // If a duplicate is found in the subgrid, mark it as invalid
        if (board[subGridRow][subGridCol].value === c) {
          tempUpdates[subGridRow][subGridCol].isInvalid = true; // Highlight invalid cell
          setBoard([...tempUpdates]);
          await Sleep(speedRange);

          tempUpdates[subGridRow][subGridCol].isInvalid = false; // Reset invalid state
          setBoard([...tempUpdates]);

          return false; // Invalid placement
        }
      }
    }

    // Reset all highlighted states before returning true
    setBoard((prevBoard) =>
      prevBoard.map((rowItem) =>
        rowItem.map((cell) => ({
          ...cell,
          isValidColItem: false,
          isValidRowItem: false,
          isValidSubGridItem: false,
        }))
      )
    );
    setInputsData((prevBoard) =>
      prevBoard.map((rowItem) =>
        rowItem.map((cell) => ({
          ...cell,
          isValidColItem: false,
          isValidRowItem: false,
          isValidSubGridItem: false,
        }))
      )
    );

    await Sleep(speedRange); // Visualization delay after reset
    return true; // Valid placement
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return false; // Return false in case of an error
  }
};
