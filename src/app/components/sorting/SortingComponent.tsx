'use client';

import React, { useState } from 'react';
import MergeSortComponent from './MergeSortComponent';
import { uid } from '@/app/lib/uidGenerator';
import BubbleSortComponent from './BubbleSortComponent';
import SelectionSortComponent from './SelectionSortComponent';
import QuickSortComponent from './QuickSortComponent';

const SortingComponent = () => {
  // define local state
  const [buttonType, setButtonType] = useState<string>('quick-sort');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [randomKey, setRandomKey] = useState<string>('');
  const [speedRange, setSpeedRange] = useState<number>(200);

  /** updated current button with it's type */
  const buttonMethod = () => setRandomKey(uid());

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

  return (
    <div className='pb-5'>
      <div className='container'>
        <div className='flex items-start justify-between'>
          <div className='me-6 w-[160px]'>
            <p className='m-0 mb-1 p-0 text-sm'>
              Speed: {speedRange} (0 to 1500)
            </p>
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
          {/* <div className='flex items-start'>
            <button
              className={`root-btn ${buttonType === 'merge-sort' ? 'active-root-btn py-[500px]' : ''}`}
              onClick={() => buttonMethod('merge-sort')}
            >
              Merge sort
            </button>
            <button
              className={`root-btn mx-3 ${buttonType === 'bubble-sort' ? 'active-root-btn' : ''}`}
              onClick={() => buttonMethod('bubble-sort')}
            >
              Bubble sort
            </button>
            <button
              className={`root-btn ${buttonType === 'selection-sort' ? 'active-root-btn' : ''}`}
              onClick={() => buttonMethod('selection-sort')}
            >
              Selection sort
            </button>
            <button
              className={`root-btn ml-3 ${buttonType === 'quick-sort' ? 'active-root-btn' : ''}`}
              onClick={() => buttonMethod('quick-sort')}
            >
              Quick sort
            </button>
          </div> */}
          <div>
            <select
              // onClick={buttonMethod}
              onChange={handleSelectChange}
              value={buttonType}
              className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary'
            >
              <option value='bubble-sort'>Bubble Sort</option>
              <option value='selection-sort'>Selection Sort</option>
              <option value='merge-sort'>Merge Sort</option>
              <option value='quick-sort'>Quick Sort</option>
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
      {buttonType === 'merge-sort' ? (
        <div className='container py-5'>
          <MergeSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'bubble-sort' ? (
        <div className='container py-5'>
          <BubbleSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'selection-sort' ? (
        <div className='container py-5'>
          <SelectionSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'quick-sort' ? (
        <div className='container py-5'>
          <QuickSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
    </div>
  );
};

export default SortingComponent;
