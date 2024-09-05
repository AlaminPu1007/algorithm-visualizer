/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { del_col, del_row, UNIQUE_PATH_GRID_SIZE } from '@/app/constant';
import { createGridWithUniquePath } from '@/app/data/PathFindingGridData';
import { isValidDirection } from '@/app/lib/helpers';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { GridProps } from '@/app/types/uniquePathProps';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface PageProps {
  useRandomKey: string;
  speedRange: number;
  gridSize: { rowSize: number; colSize: number };
}

const NoOfIslands: React.FC<PageProps> = ({ useRandomKey, speedRange, gridSize }) => {
  const [data, setData] = useState<GridProps[][]>([]);
  const [queue, setQueue] = useState<{ rowIdx: number; colIdx: number }[]>([]);

  useEffect(() => {
    if (Object.keys(gridSize)?.length) {
      // create each new row, clear it's all previous states
      clearAllTimeouts();
      setData(
        JSON.parse(
          JSON.stringify(
            createGridWithUniquePath(gridSize.rowSize, gridSize.colSize, gridSize?.rowSize > 8 ? 0.4 : 0.3)
          )
        )
      );
    }
  }, [gridSize, useRandomKey]);

  useEffect(() => {
    let Time: number = 0;
    if (data?.length) {
      Time = window.setTimeout(() => {
        findNoOfIslands(data);
      }, 300);
    }
    return () => {
      clearTimeout(Time);
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.length]);

  const findNoOfIslands = async (data: GridProps[][]) => {
    try {
      console.log(data, 'dddddddddddddd');
      // create a shallow copy of root data
      const tempData = [...data];
      // create a shallow copy of root queue
      const tempQueue = [...queue];

      // tempQueue.shift({ row, col });

      // for (let i = 0; i < 4; i++) {
      //   const new_row = del_row[i] + row;
      //   const new_col = del_col[i] + col;

      //   // Check if the new cell is within bounds and not visited
      //   if (isValidDirection(new_row, new_col, n, m) && !tempData[new_row][new_col].isVisit) {
      //     if (!tempData[new_row][new_col].data) {
      //       // Handle cells with no data if needed
      //     } else {
      //       // Move to cells with data
      //       tempData[new_row][new_col].isVisit = true;
      //       tempData[new_row][new_col].isCurrent = true;

      //       // Set parent for backtracking
      //       tempData[new_row][new_col].parent = {
      //         rowIdx: row,
      //         colIdx: col,
      //       };

      //       setData([...tempData]);
      //       await Sleep(speedRange);

      //       // Use a local path variable to track the current path
      //       const newPath = path + directions[i % 4] + '->';

      //       // Recursively explore further
      //       await DFSFindUniquePathMethod(
      //         tempData,
      //         paths,
      //         n,
      //         m,
      //         new_row,
      //         new_col,
      //         newPath,
      //         speedRange,
      //         setData,
      //         setValidPaths
      //       );

      //       // Backtrack: Reset the state of the current cell
      //       tempData[new_row][new_col].isCurrent = false;
      //       tempData[new_row][new_col].isVisit = false;

      //       setData([...tempData]);
      //     }
      //   }
      // }
    } catch (error) {
      // Log error in development environment
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error, 'from catch');
      }
    }
  };

  return (
    <div className='container'>
      {data?.length ? (
        <div className='item-center flex flex-col justify-start'>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className='flex items-center justify-center'>
              {row.map((col, colIndex) => {
                let BG_COLOR = col.data === 1 ? 'bg-[#ff6060] text-black' : 'bg-[#1ca3ec] text-white';
                if (col.isInvalid) BG_COLOR = 'bg-red-600 text-white';
                if (col.isCurrent) BG_COLOR = 'bg-blue-600 text-white';
                if (col.isMarked) BG_COLOR = 'bg-pink-600 text-white';
                if (col.isValidPath) BG_COLOR = 'bg-green-600 text-white'; // Color for valid path

                let b = `border-b-[0.5px] border-r-[0.5px] border-[#575C6B] text-xl`;

                if (rowIndex === 0) {
                  b += ` border-t-[0.5px]`;
                }
                if (rowIndex === data?.length - 1) {
                  b += ` border-b-[0.5px]`;
                }
                if (colIndex === 0) {
                  b += ` border-l-[0.5px]`;
                }
                if (colIndex === data[0]?.length - 1) {
                  b += ` border-r-[0.5px]`;
                }

                return (
                  <div
                    className={`flex items-center justify-center ${UNIQUE_PATH_GRID_SIZE} ${b} ${BG_COLOR}`}
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
  );
};

export default NoOfIslands;
