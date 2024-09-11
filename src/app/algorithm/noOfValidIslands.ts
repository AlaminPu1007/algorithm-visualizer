import React from 'react';
import { GridProps, PathFindingQueueProps } from '../types/uniquePathProps';
import { Sleep } from '../lib/sleepMethod';
import { del_col, del_row } from '../constant';
import { isValidDirection } from '../lib/helpers';
import { islandColorsPlate } from '../data/mockData';

let counter = 0;

/**
 * Performs a Breadth-First Search (BFS) to find and mark islands in a grid.
 * An island is defined as a connected group of cells with value `1`.
 * The function modifies the grid to mark visited cells and visualizes the process.
 *
 * @async
 * @function findNoOfIslands
 * @param {number} row - The current row index.
 * @param {number} col - The current column index.
 * @param {GridProps[][]} data - The grid representing land (1) and water (0) cells.
 * @param {{ rowIdx: number; colIdx: number }[]} queue - The queue used for BFS traversal.
 * @param {React.Dispatch<React.SetStateAction<GridProps[][]>>} setData - React state setter for updating the grid.
 * @param {React.Dispatch<React.SetStateAction<{ rowIdx: number; colIdx: number }[]>>} setQueue - React state setter for updating the BFS queue.
 * @param {number} speedRange - The delay in milliseconds to control the speed of the BFS visualization.
 * @returns {Promise<void>} A Promise that resolves once the island is fully traversed.
 */
export const findNoOfIslands = async (
  row: number,
  col: number,
  data: GridProps[][],
  queue: { rowIdx: number; colIdx: number }[],
  setData: React.Dispatch<React.SetStateAction<GridProps[][]>>,
  setQueue: React.Dispatch<React.SetStateAction<PathFindingQueueProps[]>>,
  speedRange: number
): Promise<void> => {
  try {
    const n: number = data.length; // Number of rows
    const m: number = data[0]?.length; // Number of columns

    // Clone data and queue to avoid mutating original state directly
    const tempData = [...data];
    const tempQueue = [...queue];

    // Generate a unique color for this island
    const islandColor = islandColorsPlate[counter % 20];
    // update counter
    counter++;

    // Add the starting cell to the queue
    const newElement = { rowIdx: row, colIdx: col };
    tempQueue.unshift(newElement);

    // Mark the starting cell as visited and as part of a valid path
    tempData[row][col].isVisit = true;
    tempData[row][col].isValidPath = true;
    tempData[row][col].islandColor = islandColor;

    // Update the state with the new grid and queue
    setData([...tempData]);
    setQueue([...tempQueue]);

    // Wait before continuing to visualize the changes
    await Sleep(speedRange);

    // Perform BFS to explore the entire island
    while (tempQueue.length > 0) {
      // Get the next cell to explore from the front of the queue
      const element = tempQueue.shift();

      if (element !== undefined) {
        const { rowIdx, colIdx } = element;

        // Explore the four possible directions (up, down, left, right)
        for (let i = 0; i < 4; i++) {
          const new_row = del_row[i] + rowIdx; // New row index after moving in the current direction
          const new_col = del_col[i] + colIdx; // New column index after moving in the current direction

          // Check if the new position is within bounds and hasn't been visited, and is land (1)
          if (
            isValidDirection(new_row, new_col, n, m) &&
            !tempData[new_row][new_col].isVisit &&
            tempData[new_row][new_col].data === 1
          ) {
            // Mark the new cell as visited and as the current cell being processed
            tempData[new_row][new_col].isVisit = true;
            tempData[new_row][new_col].isCurrent = true;

            // Set the parent cell for potential backtracking
            tempData[new_row][new_col].parent = {
              rowIdx: row,
              colIdx: col,
            };
            // Assign the same color to the entire island
            tempData[new_row][new_col].islandColor = islandColor;

            // Add the new cell to the queue for further exploration
            tempQueue.unshift({ rowIdx: new_row, colIdx: new_col });

            // Update the state with the new queue and grid
            setQueue([...tempQueue]);
            setData([...tempData]);

            // Wait to visualize the changes
            await Sleep(speedRange);

            // Reset the current cell state after processing
            tempData[new_row][new_col].isCurrent = false;
            tempData[new_row][new_col].isValidPath = true;

            // Update the state to reflect the reset
            setData([...tempData]);
          }
        }
      }
    }
  } catch (error) {
    // Handle errors during development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(error, 'Error during BFS traversal');
    }
  }
};
