import React from 'react';
import { SortingDataProps } from '../types/sortingProps';
import { Sleep } from '../lib/sleepMethod';

/**
 * A approach of bubble sort algorithm
 *
 * @async
 * @param {SortingDataProps[]} data
 * @param {React.Dispatch<React.SetStateAction<SortingDataProps[]>>} setData
 * @param {number} speedRange
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep
 * @returns {*}
 */

export const bubbleSortAlgo = async (
  data: SortingDataProps[],
  setData: React.Dispatch<React.SetStateAction<SortingDataProps[]>>,
  speedRange: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  // Create a copy of the data to work with
  const tempData: SortingDataProps[] = [...data];

  for (let i = 0; i < tempData.length; i++) {
    for (let j = 0; j < tempData.length - i - 1; j++) {
      // Compare two adjacent elements
      if (tempData[j].data > tempData[j + 1].data) {
        // Swap the elements
        [tempData[j], tempData[j + 1]] = [tempData[j + 1], tempData[j]];

        // Mark the current items as swapped for visualization
        setData(() => {
          const updatedData = [...tempData];
          updatedData[j].isSwapped = true;
          updatedData[j + 1].isSwapped = true;
          return updatedData;
        });

        await Sleep(speedRange);

        // After a delay, un-mark the items as swapped
        setData(() => {
          const updatedData = [...tempData];
          updatedData[j].isSwapped = false;
          updatedData[j + 1].isSwapped = false;
          return updatedData;
        });

        setStep((prevStep) => prevStep + 1);
      }
    }

    // Mark the last sorted item as sorted
    setData((prv) => {
      const tempData = [...prv];
      tempData[prv.length - 1 - i].isSorted = true;
      return tempData;
    });

    await Sleep(speedRange);
  }
};
