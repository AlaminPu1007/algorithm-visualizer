'use client';

import React, { useState } from 'react';
import MergeSortComponent from './MergeSortComponent';
import { uid } from '@/app/lib/uidGenerator';

const SortingComponent = () => {
  // define local state
  const [buttonType, setButtonType] = useState<string>('merge-sort');
  const [randomKey, setRandomKey] = useState<string>('');
  const [speedRange, setSpeedRange] = useState<number>(500);

  /** updated current button with it's type */
  const buttonMethod = (type: string) => {
    setButtonType(type);
    setRandomKey(uid());
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
          <div className='flex items-start'>
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
          </div>
        </div>
      </div>
      {buttonType === 'merge-sort' ? (
        <div className='container py-5'>
          <MergeSortComponent key={randomKey} speedRange={speedRange} />
        </div>
      ) : null}
      {buttonType === 'bubble-sort' ? (
        <div className='container py-5'>{/* <MergeSortComponent /> */}</div>
      ) : null}
    </div>
  );
};

export default SortingComponent;
