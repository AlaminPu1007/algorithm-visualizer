/**
 * A Root tree structure is defined here. This will return a svg after create a Tree structure.
 * @component - A React component
 */
'use client';

import React, { useEffect, useState } from 'react';
import { uid } from '@/app/lib/uidGenerator';
import BinarySearchTreeComponent from './BinarySearchTreeComponent';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';

const SearchingComponent = () => {
  // define a component local memory
  const [activeRootBtnType, setActiveRootBtnType] = useState<string>('bst');
  const [randomKey, setRandomKey] = useState<string>('1');
  const [speedRange, setSpeedRange] = useState<number>(200);

  // ensure clear all timeout after component un-mount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  /** submit method to perform current task from start */
  const submitMethod = () => {
    setRandomKey(uid());
  };

  /**
   * onChange method of select
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setActiveRootBtnType(value);
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
    <div className='container'>
      <div className='items-end justify-end md:flex'>
        <div className='mt-4 justify-between min-[455px]:flex md:mt-0 md:justify-start'>
          <div className='me-6 flex w-[160px] flex-col justify-end'>
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
          <div className='max-[455px]:my-3'>
            <p className='text-md m-0 p-0 font-medium'>Select type</p>
            <select
              onChange={handleSelectChange}
              value={activeRootBtnType}
              className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary'
            >
              <option data-umami-event='BST-from-searching' value='bst'>
                Binary search
              </option>
            </select>

            <button
              onClick={submitMethod}
              className={`ms-3 rounded-sm bg-theme-btn-secondary p-[8px] px-4 text-sm text-white transition-all duration-300`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div>
        {activeRootBtnType === 'bst' ? <BinarySearchTreeComponent key={randomKey} speedRange={speedRange} /> : null}
      </div>
    </div>
  );
};

export default SearchingComponent;
