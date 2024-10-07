'use client';

import { SUDOKU_BOARD_DATA } from '@/app/data/sudokuData';
import { Sleep } from '@/app/lib/sleepMethod';
import { GridInputProps, SudoKuBoardProps } from '@/app/types/sudokyProps';
import React, { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

const SudoKuSolverComponent = () => {
  const [board, setBoard] = useState<SudoKuBoardProps[][]>(JSON.parse(JSON.stringify(SUDOKU_BOARD_DATA)));
  const [inputsData, setInputsData] = useState<GridInputProps[][]>(JSON.parse(JSON.stringify(SUDOKU_BOARD_DATA)));
  const [speedRange, setSpeedRange] = useState<number>(200);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, colIndex: number): ReactNode => {
    const value = e.target.value.trim();

    if (value.length > 1) {
      return toast.error(`Only 1 number allowed at a time`);
    }

    // Validate the input to only allow numbers between 1 and 9
    const validValue = /^[1-9|#]$/.test(value);

    if (!validValue && value !== '') {
      toast.error(`Only number are allowed 1-9.`);
    }

    setInputsData((prv) => {
      const tempInputData = [...prv];
      tempInputData[rowIndex][colIndex].value = validValue ? value : '';
      return tempInputData;
    });
    setBoard((prv) => {
      const tempInputData = [...prv];
      tempInputData[rowIndex][colIndex].value = validValue ? value : '';
      return tempInputData;
    });
  };

  const isValidSudoku = (board: SudoKuBoardProps[][]): boolean => {
    const rows = new Set();
    const cols = new Set();
    const grids = new Set();

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = board[i][j].value;
        if (value === '#' || value === '') {
          continue; // Skip empty cells
        }

        // Check row
        const rowKey = `row-${i}-${value}`;
        if (rows.has(rowKey)) return false;
        rows.add(rowKey);

        // Check column
        const colKey = `col-${j}-${value}`;
        if (cols.has(colKey)) return false;
        cols.add(colKey);

        // Check 3x3 subgrid
        const gridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        const gridKey = `grid-${gridIndex}-${value}`;
        if (grids.has(gridKey)) return false;
        grids.add(gridKey);
      }
    }
    return true; // If no duplicates are found
  };

  const Solve = async (board: SudoKuBoardProps[][]): Promise<boolean> => {
    // before perform to check valid sudoku, check this is already a valid grid or not
    if (!isValidSudoku(board)) {
      toast.error(`The Sudoku grid is invalid!`);
      return false;
    }

    const n: number = board.length;
    const m: number = board[0].length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        // active current item
        setBoard(() => {
          const tempData: SudoKuBoardProps[][] = [...board];
          tempData[i][j].isCurrent = true;
          return tempData;
        });

        await Sleep(speedRange);

        setBoard(() => {
          const tempData: SudoKuBoardProps[][] = [...board];
          tempData[i][j].isCurrent = false;
          return tempData;
        });

        if (board[i][j].value === '#') {
          for (let c = 1; c <= 9; c++) {
            if (await isValid(board, i, j, String(c))) {
              board[i][j].value = String(c);

              setBoard(() => {
                const tempData: SudoKuBoardProps[][] = [...board];
                tempData[i][j].isValid = true;
                return tempData;
              });

              if (await Solve(board)) {
                return true;
              } else {
                setBoard(() => {
                  const tempData: SudoKuBoardProps[][] = [...board];
                  tempData[i][j].isValid = false;
                  tempData[i][j].isInvalid = true;
                  return tempData;
                });
                await Sleep(speedRange);
                setBoard(() => {
                  const tempData: SudoKuBoardProps[][] = [...board];
                  tempData[i][j].isInvalid = false;
                  return tempData;
                });

                board[i][j].value = '#';
              }
            }
          }

          return false;
        }
      }
    }
    toast.success(`Sudoku solved successfully!`);
    return true;
  };

  const handleSudoKuSolver = async (): Promise<void> => {
    try {
      setBtnLoading(true);
      const tempBoard: SudoKuBoardProps[][] = JSON.parse(JSON.stringify(board)).map((row: SudoKuBoardProps[]) =>
        row.map((cell) => ({
          ...cell,
          isValid: false,
          isActive: false,
          isCurrent: false,
          isTarget: false,
          isValidRowItem: false,
          isValidColItem: false,
          isValidSubGridItem: false,
          isInvalid: false,
        }))
      );
      await Solve(tempBoard);
      setBoard(() => [...tempBoard]);
      setInputsData(() => [...tempBoard]);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } finally {
      setBtnLoading(false);
    }
  };

  const isValid = async (board: SudoKuBoardProps[][], row: number, col: number, c: string): Promise<boolean> => {
    try {
      const tempUpdates: SudoKuBoardProps[][] = board.map((r) => r.map((cell) => ({ ...cell })));

      setBoard(() => {
        const tempData: SudoKuBoardProps[][] = tempUpdates.map((r) => r.map((cell) => ({ ...cell })));
        tempData[row][col].value = String(c);
        return tempData;
      });
      setInputsData(() => {
        const tempData: SudoKuBoardProps[][] = tempUpdates.map((r) => r.map((cell) => ({ ...cell })));
        tempData[row][col].value = String(c);
        return tempData;
      });
      await Sleep(speedRange);

      // Check the column
      for (let i = 0; i < 9; i++) {
        // Highlight the current column cell being checked
        tempUpdates[i][col].isValidColItem = true;
        setBoard([...tempUpdates]);
        // setInputsData([...tempUpdates]);
        await Sleep(speedRange); // Delay for visualization

        // Check for duplicates in the column
        if (board[i][col].value === String(c)) {
          tempUpdates[i][col].isInvalid = true;
          setBoard([...tempUpdates]);
          await Sleep(speedRange);
          tempUpdates[i][col].isInvalid = false;
          setBoard([...tempUpdates]);

          return false;
        }
      }

      // Check the row
      for (let j = 0; j < 9; j++) {
        // Highlight the current row cell being checked
        tempUpdates[row][j].isValidRowItem = true;
        setBoard([...tempUpdates]);
        // setInputsData([...tempUpdates]);
        await Sleep(speedRange); // Delay for visualization

        // Check for duplicates in the row
        if (board[row][j].value === String(c)) {
          tempUpdates[row][j].isInvalid = true;
          setBoard([...tempUpdates]);
          await Sleep(speedRange);
          tempUpdates[row][j].isInvalid = false;
          setBoard([...tempUpdates]);
          return false;
        }
      }

      // Check the 3x3 subgrid
      const subGridRowStart = Math.floor(row / 3) * 3;
      const subGridColStart = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const subGridRow = subGridRowStart + i;
          const subGridCol = subGridColStart + j;

          // Highlight the current subgrid cell being checked
          tempUpdates[subGridRow][subGridCol].isValidSubGridItem = true;
          setBoard([...tempUpdates]);
          // setInputsData([...tempUpdates]);
          await Sleep(speedRange); // Delay for visualization

          // Check for duplicates in the subgrid
          if (board[subGridRow][subGridCol].value === c) {
            tempUpdates[subGridRow][subGridCol].isInvalid = true;
            setBoard([...tempUpdates]);
            await Sleep(speedRange);
            tempUpdates[subGridRow][subGridCol].isInvalid = false;
            setBoard([...tempUpdates]);
            return false;
          }
        }
      }
      // Reset all valid flags before returning
      setBoard((prevBoard) => {
        return prevBoard.map((rowItem) =>
          rowItem.map((cell) => {
            return {
              ...cell,
              isValidColItem: false,
              isValidRowItem: false,
              isValidSubGridItem: false,
            };
          })
        );
      });
      setInputsData((prevBoard) =>
        prevBoard.map((rowItem) =>
          rowItem.map((cell) => {
            return {
              ...cell,
              isValidColItem: false,
              isValidRowItem: false,
              isValidSubGridItem: false,
            };
          })
        )
      );
      await Sleep(speedRange);
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(error);
      }
      return false;
    }
  };

  /**
   * input type range method
   *
   * @param {*} e
   */
  const inputRangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedRange(Number(e.target.value));
  };

  return (
    <>
      <div className='container'>
        <div className='mb-3 flex flex-col-reverse justify-between min-[455px]:flex-row min-[455px]:items-end'>
          <button
            className={`rounded-sm border px-4 py-1 text-[15px] text-white transition-all duration-300 ${btnLoading ? 'cursor-no-drop bg-gray-600' : 'bg-blue-500 hover:bg-theme-btn-secondary'}`}
            onClick={handleSudoKuSolver}
            disabled={btnLoading}
          >
            Revisualize
          </button>
          <div className='mb-2 items-end justify-end md:mb-0 md:flex'>
            <div className='mt-4 flex justify-between md:mt-0'>
              <div className='me-0 flex w-[160px] flex-col justify-end'>
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
              <div className='flex items-end'>
                <button
                  className={`ms-3 rounded-sm bg-theme-btn-secondary p-[7px] px-4 text-sm text-white transition-all duration-300`}
                >
                  Submit
                </button>
              </div>
            </div>
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
            <div className='flex min-h-[200px] w-full items-center justify-center'>
              <h1 className='text-center text-4xl font-medium'>Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SudoKuSolverComponent;
