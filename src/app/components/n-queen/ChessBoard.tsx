'use client';

import { fillGridArray, GRID_SIZE } from '@/app/constant';
import { gridStyle, isPutQueen, updateGrid } from '@/app/lib/nQueens';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { ChessBoardGridInlineStyleProps } from '@/app/types/commonProps';
import { CurrentItemProps, ICell } from '@/app/types/NQueensProps';
import React, { useMemo, useState } from 'react';

const SIZE: number = GRID_SIZE;

const ChessBoard: React.FC = () => {
  const [grid, setGrid] = useState<ICell[][]>(fillGridArray(SIZE));
  const [currentItem, setCurrentItem] = useState<CurrentItemProps>({
    row: -1,
    col: -1,
  });
  const [selectInput, setSelectInput] = useState<string>(String(SIZE));
  const [highlight, setHighlight] = useState<{ [key: string]: boolean }>({});
  const [speedRange, setSpeedRange] = useState<number>(200);

  /**
   * Root Method to perform n-queen visualization
   *
   * @async
   * @returns {*}
   */
  const solveNQueens = async () => {
    // clear time-out it it's present
    clearAllTimeouts();
    // clear grid if it's present
    // if (currentItem.row !== -1 || Object.keys(highlight)?.length) {
    setGrid(fillGridArray(Number(selectInput)));
    // }
    setCurrentItem({ row: -1, col: -1 });
    setHighlight({});

    await Sleep(200);

    const size = Number(selectInput);
    const board = Array(size).fill(-1);
    await performDFS(0, board, size);
    setCurrentItem({ row: -1, col: -1 });
  };

  /**
   * Description placeholder
   *
   * @async
   * @param {number} col starting column (ex: 0)
   * @param {number[]} board a one dimensional array to validated the valid queen position
   * @param {number} n grid size
   * @returns {boolean}
   */

  const performDFS = async (col: number, board: number[], n: number) => {
    // handle base case
    if (col === n) {
      setGrid(updateGrid(board, grid));
      return true;
    }

    for (let row = 0; row < n; row++) {
      const highlightPath: { [key: string]: boolean } = {};

      setCurrentItem({ row, col });
      await Sleep(speedRange);

      if (isPutQueen(row, col, board)) {
        board[col] = row;
        setGrid(updateGrid(board, grid));
        setHighlight({});

        await Sleep(speedRange);

        if (await performDFS(col + 1, board, n)) {
          return true;
        }

        board[col] = -1;
        setGrid(updateGrid(board, grid));

        await Sleep(speedRange);
      } else {
        // handle invalid placement
        highlightPath[`${row}-${col}`] = true;
        setHighlight({ ...highlightPath });

        await Sleep(speedRange);
        setHighlight({});
      }
    }

    return false;
  };

  /**
   * get value from select method
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const selectOnChangeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // clear time-out it it's present
    clearAllTimeouts();

    // mark as initial state
    setGrid(fillGridArray(Number(e.target.value)));
    setCurrentItem({ row: -1, col: -1 });
    setHighlight({});

    setSelectInput(e.target.value);
  };

  /**
   * input type range method
   *
   * @param {*} e
   */
  const inputRangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSpeedRange(value);
  };

  /**
   * Memoize the style object
   *
   * @type {*}
   */
  const memoizedGridStyle: ChessBoardGridInlineStyleProps = useMemo(() => gridStyle(selectInput), [selectInput]);

  return (
    <div>
      <div className='items-e flex flex-wrap justify-between pb-2'>
        <div>
          <p className='m-0 mb-1 p-0 text-sm'>Speed: {speedRange} (0 to 1500)</p>
          <input
            value={speedRange}
            onChange={inputRangeMethod}
            type='range'
            id='points'
            name='points'
            min='0'
            max='1500'
          />
        </div>
        <div className='flex items-center'>
          <div>
            <select
              className='text-md w-[100px] cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] text-center outline-none transition-all duration-300 hover:border-theme-btn-secondary max-[410px]:w-[100%]'
              value={selectInput}
              onChange={selectOnChangeMethod}
            >
              {/* can hold 4 queen */}
              <option value='4'>4</option>
              {/* can hold 5 queen */}
              <option value='5'>5</option>
              {/* can hold 6 queen */}
              <option value='6'>6</option>
              {/* can hold 7 queen */}
              <option value='7'>7</option>
              {/* can hold 8 queen */}
              <option value='8'>8</option>
            </select>
          </div>

          <button
            onClick={solveNQueens}
            className={`ms-3 rounded-sm bg-theme-btn-secondary p-[8px] px-4 text-sm text-white transition-all duration-300`}
          >
            Submit
          </button>
        </div>
      </div>
      <div className='flex items-center justify-center p-2'>
        <div style={memoizedGridStyle}>
          {grid.map((item, rowIdx) => (
            <React.Fragment key={rowIdx}>
              {item.map((cell, colIdx) => {
                const isBlack = (rowIdx + colIdx) % 2 === 1;
                const isCurrentItem = rowIdx === currentItem.row && colIdx === currentItem.col;
                const isQueen = cell.value === 1;
                const isHighlighted = highlight[`${rowIdx}-${colIdx}`];

                const className = isHighlighted
                  ? 'bg-red-800'
                  : isCurrentItem
                    ? 'bg-green-200'
                    : isQueen
                      ? 'bg-blue-500'
                      : isBlack
                        ? 'bg-black'
                        : 'bg-red-200';

                return (
                  <div key={colIdx} className={className} style={{ aspectRatio: '1/1' }}>
                    {isQueen || isCurrentItem ? (
                      <div className='flex h-full items-center justify-center overflow-hidden'>
                        <svg
                          className='h-[50%] w-[50%]'
                          viewBox='0 0 70 62'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M69.6129 14.4346C69.6142 15.0825 69.4542 15.7206 69.1475 16.2914C68.8407 16.8621 68.3968 17.3476 67.8558 17.7041C67.3147 18.0605 66.6935 18.2768 66.048 18.3334C65.4025 18.39 64.7531 18.2852 64.1582 18.0284L54.4254 41.5065H15.5317L5.80668 18.0393C4.92782 18.4082 3.94443 18.443 3.04168 18.1372C2.13894 17.8314 1.37915 17.2061 0.905393 16.379C0.43164 15.552 0.276617 14.5803 0.469519 13.6469C0.662421 12.7134 1.18994 11.8828 1.95272 11.3113C2.71551 10.7398 3.66093 10.4669 4.61093 10.544C5.56094 10.6211 6.44997 11.0429 7.11061 11.7299C7.77125 12.4169 8.15791 13.3218 8.19776 14.2741C8.23762 15.2264 7.92792 16.1604 7.327 16.9002L20.9207 28.0252L24.1895 8.27523C23.2693 8.11192 22.4382 7.62411 21.8469 6.90035C21.2557 6.17658 20.9435 5.26482 20.9671 4.33055C20.9906 3.39628 21.3484 2.50143 21.9754 1.8084C22.6024 1.11537 23.4571 0.670097 24.3843 0.553402C25.3116 0.436707 26.2499 0.656322 27.0291 1.17239C27.8083 1.68845 28.3766 2.46676 28.6309 3.36606C28.8852 4.26535 28.8087 5.22603 28.4152 6.07372C28.0218 6.92142 27.3374 7.59995 26.4864 7.98617L34.9723 26.2674L43.4754 7.93929C42.6296 7.54037 41.9549 6.85124 41.5741 5.99712C41.1932 5.143 41.1314 4.18059 41.3999 3.28477C41.6684 2.38896 42.2494 1.61919 43.0372 1.11536C43.8251 0.611536 44.7676 0.407085 45.6934 0.539163C46.6192 0.671241 47.4669 1.13108 48.0825 1.83512C48.698 2.53916 49.0406 3.44068 49.0478 4.37584C49.0551 5.31099 48.7267 6.21773 48.1222 6.93128C47.5176 7.64482 46.6772 8.11781 45.7536 8.26429L49.0239 28.0174L62.6582 16.8768C62.2679 16.3896 62 15.816 61.877 15.204C61.754 14.592 61.7795 13.9594 61.9513 13.3593C62.1231 12.7591 62.4362 12.2089 62.8644 11.7547C63.2926 11.3005 63.8235 10.9555 64.4125 10.7487C65.0014 10.5418 65.6314 10.4792 66.2496 10.566C66.8678 10.6527 67.4562 10.8864 67.9655 11.2473C68.4748 11.6083 68.8901 12.0861 69.1768 12.6406C69.4634 13.1952 69.613 13.8104 69.6129 14.4346ZM58.4161 52.1299H11.5411V61.5049H58.4161V52.1299ZM54.0801 44.0049H15.9207V49.6299H54.0801V44.0049Z'
                            fill='black'
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className='flex h-full items-center justify-center' />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
