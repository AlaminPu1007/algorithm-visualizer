'use client';

import { Solve } from '@/app/algorithm/sudoku-solver/sudokuSolver';
import { sudokuColorsPlate } from '@/app/data/mockData';
import { SUDOKU_BOARD_DATA } from '@/app/data/sudokuData';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { GridInputProps, SudoKuBoardProps } from '@/app/types/sudokyProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SudoKuSolverComponent: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  /** Define component local memory state */
  const [board, setBoard] = useState<SudoKuBoardProps[][]>([]);
  const [inputsData, setInputsData] = useState<GridInputProps[][]>([]);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [isPerformOperation, setIsPerformOperation] = useState<boolean>(false);

  // Trigger for component mount
  useEffect(() => {
    clearAllTimeouts();
    const tempBoard = JSON.parse(JSON.stringify(SUDOKU_BOARD_DATA));
    setBoard(tempBoard);
    setInputsData(tempBoard);
    setIsPerformOperation(true);
    // Trigger for component un-mount
    return () => clearAllTimeouts();
  }, []);

  useEffect(() => {
    if (isPerformOperation) {
      handleSudoKuSolver();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPerformOperation]);

  /**
   * Handles the input change for Sudoku cells, ensuring only numbers 1-9 or '#' are allowed.
   * Updates both the input data and the board data accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   * @param {number} rowIndex - The row index of the Sudoku board cell.
   * @param {number} colIndex - The column index of the Sudoku board cell.
   * @returns {ReactNode} - Optionally returns a toast error message.
   */
  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number): ReactNode => {
    const value = e.target.value.trim(); // Get the trimmed input value

    // Ensure the input length is 1 (only one number allowed)
    if (value.length > 1) {
      return toast.error(`Only 1 number allowed at a time`);
    }

    // Validate input to accept only numbers 1-9 or a '#' (optional symbol for special cases)
    const validValue = /^[1-9|#]$/.test(value);

    // If the value is invalid (not a number between 1-9 or '#' and not empty), show an error
    if (!validValue && value !== '') {
      toast.error(`Only numbers 1-9 are allowed.`);
    }

    // Update the `inputsData` state with the valid value or clear it if invalid
    setInputsData((prevData) => {
      const updatedInputData = [...prevData];
      updatedInputData[rowIndex][colIndex].value = validValue ? value : ''; // Set the value or clear
      return updatedInputData;
    });

    // Update the `board` state with the valid value or clear it if invalid
    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard];
      updatedBoard[rowIndex][colIndex].value = validValue ? value : ''; // Set the value or clear
      return updatedBoard;
    });
  };

  /**
   * Initiate board with it's default value
   *
   * @param {SudoKuBoardProps[][]} board
   * @returns {*}
   */
  const InitialGridWithDefaultValue = (board: SudoKuBoardProps[][]) => {
    return JSON.parse(JSON.stringify(board)).map((row: SudoKuBoardProps[]) =>
      row.map((cell) => ({
        ...cell,
        isValid: false, // Reset the validity of the cell
        isActive: false, // Reset the active state of the cell
        isCurrent: false, // Reset the current state of the cell
        isTarget: false, // Reset the target state of the cell
        isValidRowItem: false, // Reset the row validity flag
        isValidColItem: false, // Reset the column validity flag
        isValidSubGridItem: false, // Reset the subgrid validity flag
        isInvalid: false, // Reset the invalid state of the cell
      }))
    );
  };

  /**
   * Handles the execution of the Sudoku solver algorithm.
   *
   * This function prepares the Sudoku board by resetting certain properties,
   * invokes the solver function, and updates the board state.
   */
  const handleSudoKuSolver = async (): Promise<void> => {
    try {
      // Indicate that the button is in a loading state
      setBtnLoading(true);
      // clear if any time interval's already are pending
      clearAllTimeouts();

      // Create a deep copy of the current board and reset specific properties
      const tempBoard: SudoKuBoardProps[][] = InitialGridWithDefaultValue(board);
      // Invoke the Sudoku solving algorithm with the temporary board
      await Solve(tempBoard, setBoard, setInputsData, speedRange);

      // Update the board and inputs data with the solved state
      setBoard(() => [...tempBoard]);
      setInputsData(() => [...tempBoard]);
    } catch (error) {
      // Log the error in development mode
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } finally {
      // Reset the button loading state regardless of success or failure
      setBtnLoading(false);
    }
  };

  return (
    <>
      <div className='min-[455px]:absolute min-[455px]:top-4'>
        <div className='mb-3 min-[455px]:mb-0 min-[455px]:me-3'>
          <StatusColorsPlate data={sudokuColorsPlate} />
        </div>
      </div>
      <div>
        {board?.length ? (
          <div className='item-center flex flex-col justify-start'>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className='flex items-center justify-center'>
                {row.map((col, colIndex) => {
                  let BG_COLOR = 'bg-white text-black'; // Default background color

                  // Apply border styles based on the row and column index
                  let borderStyles = `border-b-[0.5px] border-r-[0.5px] border-[#575C6B] text-xl`;

                  if (rowIndex === 0) borderStyles += ` border-t-[0.5px]`;
                  if (rowIndex === board.length - 1) borderStyles += ` border-b-[0.5px]`;
                  if (colIndex === 0) borderStyles += ` border-l-[0.5px]`;
                  if (colIndex === board[0].length - 1) borderStyles += ` border-r-[0.5px]`;

                  // Check if the current column is the last column of any 3x3 grid
                  if (colIndex % 3 === 2 && colIndex !== board.length - 1) {
                    borderStyles += ` border-r-[3px]`;
                  }

                  // Check if the current row is the last row of any 3x3 grid
                  if (rowIndex % 3 === 2 && rowIndex !== board[0].length - 1) {
                    borderStyles += ` border-b-[3px]`;
                  }

                  // check for valid item
                  if (board[rowIndex][colIndex].isValid) {
                    BG_COLOR = `bg-green-600 text-white`;
                  }
                  if (board[rowIndex][colIndex].isCurrent) {
                    BG_COLOR = `bg-blue-600 text-white`;
                  }
                  // for valid row check
                  if (board[rowIndex][colIndex].isValidRowItem) {
                    BG_COLOR = `bg-orange-600 text-white`;
                  }
                  // for valid col check
                  if (board[rowIndex][colIndex].isValidColItem) {
                    BG_COLOR = `bg-[#EB8317] text-white`;
                  }
                  // for valid subgrid check (3 X 3)
                  if (board[rowIndex][colIndex].isValidSubGridItem) {
                    BG_COLOR = `bg-purple-600 text-white`;
                  }
                  // check for invalid item
                  if (board[rowIndex][colIndex].isInvalid) {
                    BG_COLOR = `bg-red-600 text-white`;
                  }

                  return (
                    <div
                      className={`flex h-[60px] w-[60px] items-center justify-center ${borderStyles} ${BG_COLOR}`}
                      key={col.id}
                    >
                      <input
                        type='text'
                        className={`m-0 inline-block h-[100%] w-[100%] border-[0.5px] bg-inherit p-0 text-center text-inherit outline-none ${btnLoading ? 'cursor-not-allowed' : 'transition-all duration-300 hover:border-theme-btn-secondary'} `}
                        value={inputsData[rowIndex][colIndex]?.value}
                        onChange={(e) => {
                          handleTextInput(e, rowIndex, colIndex);
                        }}
                        max={9}
                        min={1}
                        disabled={btnLoading}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex min-h-[250px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default SudoKuSolverComponent;
