'use client';

import React, { useEffect, useState } from 'react';
import MergeSortComponent from './MergeSortComponent';
import { uid } from '@/app/lib/uidGenerator';
import BubbleSortComponent from './BubbleSortComponent';
import SelectionSortComponent from './SelectionSortComponent';
import QuickSortComponent from './QuickSortComponent';
import HeapSortComponent from './HeapSortComponent';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';

const SortingComponent = () => {
  // define local state
  const [buttonType, setButtonType] = useState<string>('merge-sort');
  const [randomKey, setRandomKey] = useState<string>('');
  const [speedRange, setSpeedRange] = useState<number>(200);

  // clear times out before component unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

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
    <div className='py-5'>
      <div className='container'>
        <div className='items-start justify-between min-[500px]:flex'>
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
          <div className='max-[500px]:mt-2'>
            <select
              // onClick={buttonMethod}
              onChange={handleSelectChange}
              value={buttonType}
              className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary max-[500px]:w-[60%]'
            >
              <option data-umami-event='selection-from-sorting-merge-sort' value='merge-sort'>
                Merge Sort
              </option>
              <option data-umami-event='selection-from-sorting-quick-sort' value='quick-sort'>
                Quick Sort
              </option>
              <option data-umami-event='selection-from-sorting-heap-sort' value='heap-sort'>
                Heap Sort
              </option>
              <option data-umami-event='selection-from-sorting-bubble-sort' value='bubble-sort'>
                Bubble Sort
              </option>
              <option data-umami-event='selection-from-sorting-selection-sort' value='selection-sort'>
                Selection Sort
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
      {buttonType === 'merge-sort' ? (
        <div className='container'>
          <MergeSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'bubble-sort' ? (
        <div className='container'>
          <BubbleSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'selection-sort' ? (
        <div className='container'>
          <SelectionSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'quick-sort' ? (
        <div className='container'>
          <QuickSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'heap-sort' ? (
        <div className='container'>
          <HeapSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
    </div>
  );
};

export default SortingComponent;
