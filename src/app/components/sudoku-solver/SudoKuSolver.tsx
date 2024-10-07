'use client';

import React, { useEffect, useState } from 'react';
import SudoKuSolverComponent from './SudoKuSolverComponent';
import { uid } from '@/app/lib/uidGenerator';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';

const SudoKuSolver = () => {
  /** Define component local memory state */
  const [speedRange, setSpeedRange] = useState<number>(200);
  const [randomKey, setRandomKey] = useState<string>('1');

  // Trigger for component mount
  useEffect(() => {
    // Trigger for component un-mount
    return () => clearAllTimeouts();
  }, []);

  /** submit method to perform current task from start */
  const submitMethod = () => {
    setRandomKey(uid());
  };

  /**
   * Handles the change event for an input range, updating the speed range state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const inputRangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the speed range state with the numeric value from the input
    setSpeedRange(Number(e.target.value));
  };

  return (
    <div className='container'>
      <div className='relative'>
        <div className='mb-3 flex flex-col-reverse justify-end min-[455px]:flex-row min-[455px]:items-end'>
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
                  onClick={submitMethod}
                  className={`ms-3 rounded-sm bg-theme-btn-secondary p-[7px] px-4 text-sm text-white transition-all duration-300`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Render component */}
        <SudoKuSolverComponent speedRange={speedRange} key={randomKey} />
      </div>
    </div>
  );
};

export default SudoKuSolver;
