'use client';

import { LinearSearchToFindTheTarget } from '@/app/algorithm/searching/linearSearch';
import { getRandomObject } from '@/app/lib/helpers';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { LinearSearchDataProps } from '@/app/types/commonProps';
import React, { useEffect, useState } from 'react';

// define component Page Props
interface PageProps {
  speedRange: number;
  ueeRandomKey: string;
}

const LinearSearchComponent: React.FC<PageProps> = ({ speedRange, ueeRandomKey }) => {
  const [data, setData] = useState<LinearSearchDataProps[]>([]);
  const [btnLoading, setButtonLoading] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [isReadyToPerformOperation, setIsReadyToPerformOperation] = useState<boolean>(false);

  useEffect(() => {
    const tempData = JSON.parse(JSON.stringify(getRandomObject(300)));
    setData(tempData);
    setSearchItem(Math.floor(Math.random() * tempData.length) % tempData.length);

    setIsReadyToPerformOperation(true);

    // clear all timeout after component un-mount
    return () => {
      clearAllTimeouts();
    };
  }, [ueeRandomKey]);

  useEffect(() => {
    if (searchItem && isReadyToPerformOperation) {
      handleLinearSearch();
      setIsReadyToPerformOperation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ueeRandomKey, searchItem, isReadyToPerformOperation]);

  /**
   * handle user input changes
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchItem(Number(e.target.value));
  };

  /**
   * Resets the data array to its initial state by clearing the `isCurrent` and `isTarget` flags for all items,
   * and clears all timeouts. This function is used before starting a new search or visualization to ensure a clean state.
   *
   * @async
   * @function resetAllAtInitialState
   * @returns {Promise<LinearSearchDataProps[]>} - Returns a promise that resolves to the reset data array.
   */
  const resetAllAtInitialState = async (): Promise<typeof data> => {
    // Clear all timeouts to ensure no delayed updates are left from previous runs
    clearAllTimeouts();

    const tempData = data.map((item) => ({
      ...item,
      isCurrent: false,
      isTarget: false,
    }));

    setData(tempData);
    // Reset step counter to 0
    setSteps(0);

    // Return the reset data for further use
    return tempData;
  };

  /**
   * Handles the linear search algorithm visualization. The search is performed on the `data` array to find the `searchItem`.
   * This function highlights the current item being checked, and if the target is found, it marks the item and displays a success message.
   * The function makes use of an async operation to allow for smooth visualization between each search step.
   *
   * @async
   * @function handleLinearSearch
   * @returns {Promise<void>} - Returns a promise that resolves when the linear search process is complete.
   */
  const handleLinearSearch = async (): Promise<void> => {
    try {
      // Set the button to loading state to disable further interactions
      setButtonLoading(true);

      // Reset the array to its initial state and get the reset data
      const resetData = await resetAllAtInitialState();

      // Add a slight delay for smoother visualization
      await Sleep(100);

      // Perform the actual linear search algorithm using the reset data
      // Passing the necessary state setters and parameters to control the search process
      await LinearSearchToFindTheTarget(
        resetData, // The data array with reset state
        setSteps, // State setter to update the step counter
        setData, // State setter to update the data during the search
        setSearchItem, // State setter to update the search item if needed
        speedRange, // The delay between steps for visualization
        searchItem // The target item to search for
      );
    } catch (error) {
      // Log any errors during development
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } finally {
      // Reset the button loading state after search completion or error
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className='mt-2 md:absolute md:top-0 md:mt-0'>
        <div className='flex flex-col'>
          <label htmlFor='insert-position' className='text-md font-semibold'>
            Find Data
          </label>
          <div className='flex'>
            <input
              className='h-[35px] w-[50px] border-[1px] border-r-[0px] border-black text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              type='number'
              min={1}
              max={999}
              onChange={handleTextInputChange}
              value={searchItem}
              disabled={btnLoading}
            />
            <button
              onClick={handleLinearSearch}
              className={`h-[35px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'} `}
              disabled={btnLoading}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='py-2 md:py-4'>
        {data?.length ? (
          <div className='flex flex-wrap items-center justify-between'>
            {data.map((item) => {
              let BG_COLOR = `bg-white text-back`;
              if (item.isTarget) BG_COLOR = `bg-green-600 text-white`;
              if (item.isCurrent) BG_COLOR = `bg-blue-600 text-white`;
              return (
                <div
                  className={`mb-[2px] me-[2px] min-w-[50px] border p-3 text-center text-sm md:p-4 ${BG_COLOR}`}
                  key={item.id}
                >
                  {item.data}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className='flex items-center justify-center pt-2'>
        <p className='text-base font-medium uppercase'>no of steps: {steps}</p>
      </div>
    </>
  );
};

export default LinearSearchComponent;
