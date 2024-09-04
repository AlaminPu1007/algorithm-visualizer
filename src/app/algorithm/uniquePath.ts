import { toast } from 'react-toastify';
import { Sleep } from '../lib/sleepMethod';
import { del_col, del_row, directions } from '../constant';
import { isValidDirection } from '../lib/helpers';
import React from 'react';
import { GridProps } from '../types/uniquePathProps';

/**
 * Finds unique paths from the top-left to the bottom-right corner of a grid using Depth-First Search (DFS).
 *
 * This function recursively explores all possible paths in the grid, marking the valid path and updating the state
 * of the grid at each step. It also handles visualization by changing the state of each cell and tracing back the path
 * once a valid path is found.
 *
 * @param {GridProps[][]} tempData - The grid data representing the current state of the grid cells.
 * @param {string[]} paths - An array to store the unique paths found during the search.
 * @param {number} n - The number of rows in the grid.
 * @param {number} m - The number of columns in the grid.
 * @param {number} row - The current row index in the grid.
 * @param {number} col - The current column index in the grid.
 * @param {string} path - The current path being explored.
 * @param {number} speedRange - The delay in milliseconds for visualization purposes.
 * @param {React.Dispatch<React.SetStateAction<GridProps[][]>>} setData - Function to update the state of the grid data.
 *
 * @returns {Promise<void>} A promise that resolves when the DFS traversal is complete.
 */

export const DFSFindUniquePathMethod = async (
  tempData: GridProps[][],
  paths: string[],
  n: number,
  m: number,
  row: number,
  col: number,
  path: string,
  speedRange: number,
  setData: React.Dispatch<React.SetStateAction<GridProps[][]>>,
  setValidPaths: React.Dispatch<React.SetStateAction<{ path: string; id: number }[]>>
) => {
  // Handle the base case: if the destination is reached
  if (row === n - 1 && col === m - 1) {
    // Reached the destination
    paths.push(path.slice(0, path?.length - 2));
    toast.success(`One valid path is found`, { autoClose: 1500, position: 'top-left' });

    // store into state also
    setValidPaths((prv) => [...prv, { id: Math.random() * 99999, path: path.slice(0, path?.length - 2) }]);

    // Trace back the valid path to visualize
    let current = { rowIdx: row, colIdx: col };

    // Create a deep copy of the grid to trace the path
    const pathData = tempData.map((row) => row.map((item) => ({ ...item })));

    // Mark the path as valid
    while (current.rowIdx !== -1 && current.colIdx !== -1) {
      pathData[current.rowIdx][current.colIdx].isValidPath = true;
      current = tempData[current.rowIdx][current.colIdx].parent;

      setData([...pathData]);
      await Sleep(speedRange);
    }

    await Sleep(speedRange + speedRange);

    // Reset the path marking
    current = { rowIdx: row, colIdx: col }; // Reset current to the end of the path

    while (current.rowIdx !== -1 && current.colIdx !== -1) {
      pathData[current.rowIdx][current.colIdx].isValidPath = false;
      current = pathData[current.rowIdx][current.colIdx].parent;

      setData([...pathData]); // Update state with reset pathData
      await Sleep(speedRange);
    }

    return;
  }

  // Explore all 4 possible directions
  for (let i = 0; i < 4; i++) {
    const new_row = del_row[i] + row;
    const new_col = del_col[i] + col;

    // Check if the new cell is within bounds and not visited
    if (isValidDirection(new_row, new_col, n, m) && !tempData[new_row][new_col].isVisit) {
      if (!tempData[new_row][new_col].data) {
        // Handle cells with no data if needed
      } else {
        // Move to cells with data
        tempData[new_row][new_col].isVisit = true;
        tempData[new_row][new_col].isCurrent = true;

        // Set parent for backtracking
        tempData[new_row][new_col].parent = {
          rowIdx: row,
          colIdx: col,
        };

        setData([...tempData]);
        await Sleep(speedRange);

        // Use a local path variable to track the current path
        const newPath = path + directions[i % 4] + '->';

        // Recursively explore further
        await DFSFindUniquePathMethod(
          tempData,
          paths,
          n,
          m,
          new_row,
          new_col,
          newPath,
          speedRange,
          setData,
          setValidPaths
        );

        // Backtrack: Reset the state of the current cell
        tempData[new_row][new_col].isCurrent = false;
        tempData[new_row][new_col].isVisit = false;

        setData([...tempData]);
      }
    }
  }
};
