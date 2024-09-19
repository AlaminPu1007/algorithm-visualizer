'use client';

import { findNoOfIslands } from '@/app/algorithm/noOfValidIslands';
import { UNIQUE_PATH_GRID_SIZE } from '@/app/constant';
import { noOfIslandsSortColorsData } from '@/app/data/mockData';
import { createGridWithUniquePath } from '@/app/data/PathFindingGridData';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { GridProps, PathFindingQueueProps, UniquePathPageProps } from '@/app/types/uniquePathProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const NoOfIslands: React.FC<UniquePathPageProps> = ({ useRandomKey, speedRange, gridSize }) => {
  // define component local state
  const [data, setData] = useState<GridProps[][]>([]);
  const [, setQueue] = useState<PathFindingQueueProps[]>([]);
  const [countIslands, setCountIslands] = useState<number>(0);

  useEffect(() => {
    let Time: number = 0;

    if (Object.keys(gridSize)?.length) {
      // create each new row, clear it's all previous states
      clearAllTimeouts();

      const tempData = JSON.parse(JSON.stringify(createGridWithUniquePath(gridSize.rowSize, gridSize.colSize, 0.3)));

      setData([...tempData]);
      setQueue([]);
      setCountIslands(0);

      if (tempData?.length) {
        Time = window.setTimeout(() => {
          noOfIslandsMethod(tempData, []);
        }, 300);
      }
    }

    return () => {
      clearTimeout(Time);
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize, useRandomKey]);

  /**
   * Method to perform BFS on the grid to find all valid islands.
   * An island is defined as a connected group of cells with value `1`.
   * For each island found, the method marks it as visited and increments the island count.
   *
   * @async
   * @function noOfIslandsMethod
   * @param {GridProps[][]} data - The grid representing land (1) and water (0) cells.
   * @param {{ rowIdx: number; colIdx: number }[]} queue - The queue used for BFS traversal.
   * @returns {Promise<void>} A Promise that resolves once all islands are found and counted.
   */
  const noOfIslandsMethod = async (data: GridProps[][], queue: { rowIdx: number; colIdx: number }[]) => {
    try {
      const n = data.length; // Number of rows in the grid
      const m = data[0]?.length; // Number of columns in the grid

      // Clone data and queue to avoid mutating the original state
      const tempData = [...data];
      const tempQueue = [...queue];

      // Traverse the grid to find unvisited land cells (islands)
      for (let row = 0; row < n; row++) {
        for (let col = 0; col < m; col++) {
          // If the cell is land (1) and hasn't been visited yet, initiate BFS to explore the island
          if (tempData[row][col].data === 1 && !tempData[row][col].isVisit) {
            // Perform BFS to find and mark the entire island
            await findNoOfIslands(row, col, tempData, tempQueue, setData, setQueue, speedRange);
            // Show a success toast message indicating that a valid island was found
            toast.success('One valid island is found', { position: 'top-left' });
            // Increment the island count
            setCountIslands((prev) => prev + 1);
          }
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error, 'from catch');
      }
    }
  };

  return (
    <div className='container'>
      <div className='items-start justify-between pb-1 pt-3 sm:flex'>
        <div className='flex items-center justify-center sm:block'>
          <StatusColorsPlate data={noOfIslandsSortColorsData} />
        </div>
        <p className='m-0 mb-2 p-0 text-center text-lg text-black sm:mb-0 sm:text-end'>
          No of islands : {countIslands}
        </p>
      </div>

      <div>
        {data?.length ? (
          <div className='item-center flex flex-col justify-start'>
            {data.map((row, rowIndex) => (
              <div key={rowIndex} className='flex items-center justify-center'>
                {row.map((col, colIndex) => {
                  let BG_COLOR = col.data === 0 ? 'bg-[#1ca3ec] text-white' : 'bg-[#E99F0C] text-black';
                  if (col.isInvalid) BG_COLOR = 'bg-red-600 text-white';
                  if (col.isCurrent) BG_COLOR = 'bg-blue-600 text-white';
                  if (col.isMarked) BG_COLOR = 'bg-pink-600 text-white';
                  if (col.isValidPath) BG_COLOR = 'bg-green-600 text-white';
                  if (col.islandColor?.length) BG_COLOR = col.islandColor;

                  let borderStyles = `border-b-[0.5px] border-r-[0.5px] border-[#575C6B] text-xl`;

                  if (rowIndex === 0) {
                    borderStyles += ` border-t-[0.5px]`;
                  }
                  if (rowIndex === data?.length - 1) {
                    borderStyles += ` border-b-[0.5px]`;
                  }
                  if (colIndex === 0) {
                    borderStyles += ` border-l-[0.5px]`;
                  }
                  if (colIndex === data[0]?.length - 1) {
                    borderStyles += ` border-r-[0.5px]`;
                  }

                  return (
                    <div
                      className={`flex items-center justify-center ${UNIQUE_PATH_GRID_SIZE} ${borderStyles} ${BG_COLOR}`}
                      key={col.id}
                    >
                      <span>{col.data}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex min-h-[200px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoOfIslands;
