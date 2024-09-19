'use client';

import { uid } from '@/app/lib/uidGenerator';
import React, { useEffect, useState } from 'react';
import UniquePath from './UniquePath';
import { gridRowColSize } from '@/app/lib/helpers';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import NoOfIslands from './NoOfIslands';

const PathFind = () => {
  // define local state
  const [buttonType, setButtonType] = useState<string>('unique-path');
  const [randomKey, setRandomKey] = useState<string>('1');
  const [speedRange, setSpeedRange] = useState<number>(100);
  const [gridSize, setGridSize] = useState<{ rowSize: number; colSize: number }>({ rowSize: 8, colSize: 10 });
  const [submittedGridSize, setSubmittedGridSize] = useState<{ rowSize: number; colSize: number }>(gridSize);

  // clear times out before component unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  /** updated current button with it's type */
  const buttonMethod = () => {
    setRandomKey(uid());
    setSubmittedGridSize(gridSize); // Update the submitted grid size to pass to the child component
  };

  /**
   * onChange method of select
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setButtonType(e.target.value);
  };

  /**
   * input type range method
   *
   * @param {*} e
   */
  const inputRangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedRange(Number(e.target.value));
  };

  /**
   *Get user selectable grid row size
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleSelectChangeForRow = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGridSize((prv) => ({ ...prv, rowSize: Number(e.target.value) }));
  };

  /**
   *Get user selectable grid row size
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleSelectChangeForCol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGridSize((prv) => ({ ...prv, colSize: Number(e.target.value) }));
  };

  return (
    <div className='pb-5'>
      <div className='container'>
        <div className='items-end justify-between sm:flex'>
          <div className='me-6 w-[160px]'>
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
          <div className='items-end min-[410px]:flex'>
            <div className='flex'>
              <div className='max-[410px]:w-[45%]'>
                <p className='text-md m-0 p-0 font-medium'>Row</p>
                <select
                  onChange={handleSelectChangeForRow}
                  value={gridSize.rowSize}
                  className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary max-[410px]:w-full'
                >
                  {[...gridRowColSize(9)].map((item) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='mx-3 max-[410px]:w-[45%]'>
                <p className='text-md m-0 p-0 font-medium'>Col</p>
                <select
                  onChange={handleSelectChangeForCol}
                  value={gridSize.colSize}
                  className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary max-[410px]:w-full'
                >
                  {[...gridRowColSize(21)].map((item) => {
                    return (
                      <option key={item.id} value={item.value}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className='max-[410px]:mt-3'>
              <p className='text-md m-0 p-0 font-medium'>Select type</p>
              <select
                onChange={handleSelectChange}
                value={buttonType}
                className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary max-[410px]:w-[60%]'
              >
                <option data-umami-event='selection-from-path-finding-unique-path' value='unique-path'>
                  Unique Path
                </option>
                <option data-umami-event='selection-from-path-finding-no-of-islands' value='no-of-island'>
                  No of island
                </option>
              </select>

              <button
                onClick={buttonMethod}
                className={`ms-3 rounded-sm bg-theme-btn-secondary p-[8px] px-4 text-sm text-white transition-all duration-300`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {buttonType === 'unique-path' ? (
        <div className='container'>
          <UniquePath useRandomKey={randomKey} speedRange={speedRange} gridSize={submittedGridSize} />
        </div>
      ) : null}
      {buttonType === 'no-of-island' ? (
        <div className='container'>
          <NoOfIslands useRandomKey={randomKey} speedRange={speedRange} gridSize={submittedGridSize} />
        </div>
      ) : null}
    </div>
  );
};

export default PathFind;
