import React from 'react';
import { SortingDataProps } from '../types/sortingProps';
import { Sleep } from '../lib/sleepMethod';

/**
 * Performs the QuickSort algorithm on the provided data array, updating the visualization
 * at each step. The algorithm works by recursively partitioning the array around a pivot
 * element and sorting the left and right subarrays.
 *
 * @param {SortingDataProps[]} data - The array of data objects to be sorted, where each object
 * contains the data value and visualization state.
 * @param {number} low - The starting index of the portion of the array to be sorted.
 * @param {number} high - The ending index of the portion of the array to be sorted.
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep - Function to update the current step
 * in the sorting process, typically used for visualization.
 * @param {React.Dispatch<React.SetStateAction<SortingDataProps[]>>} setData - Function to update the
 * state of the data array, reflecting any changes during sorting.
 * @param {number} speedRange - The delay in milliseconds for each step of the sorting visualization,
 * controlling the speed of the animation.
 * @returns {Promise<void>} - A promise that resolves when the sorting process is complete.
 */

export const quickSortAlgo = async (
  data: SortingDataProps[],
  low: number,
  high: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  setData: React.Dispatch<React.SetStateAction<SortingDataProps[]>>,
  speedRange: number
) => {
  try {
    if (low < high) {
      // get current pivot item index
      const pivotIdx = await partition(data, low, high, setStep, setData, speedRange);

      // called the left half
      await quickSortAlgo(data, low, pivotIdx - 1, setStep, setData, speedRange);

      // called the right half
      await quickSortAlgo(data, pivotIdx + 1, high, setStep, setData, speedRange);
    }

    // Mark single item as sorted
    else if (low === high) {
      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[low].isSorted = true;
        return updatedData;
      });

      await Sleep(speedRange);
    }

    setStep((prev) => prev + 1);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
};

/**
 * Partitions the array around a pivot element, placing elements less than or equal
 * to the pivot on the left and elements greater than the pivot on the right.
 *
 * @param {SortingDataProps[]} dataArray - The array of data objects to be partitioned.
 * @param {number} low - The starting index of the portion of the array to be partitioned.
 * @param {number} high - The ending index of the portion of the array to be partitioned.
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep - Function to update the current step
 * in the partitioning process, typically used for visualization.
 * @param {React.Dispatch<React.SetStateAction<SortingDataProps[]>>} setData - Function to update the
 * state of the data array, reflecting any changes during partitioning.
 * @param {number} speedRange - The delay in milliseconds for each step of the partitioning visualization,
 * controlling the speed of the animation.
 * @returns {Promise<number>} - A promise that resolves to the index of the pivot element after partitioning.
 */

const partition = async (
  dataArray: SortingDataProps[],
  low: number,
  high: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  setData: React.Dispatch<React.SetStateAction<SortingDataProps[]>>,
  speedRange: number
): Promise<number> => {
  let i = low;
  let j = high;
  const pivot = Number(dataArray[low].data);

  // Clear any previously set pivot as current item
  dataArray.forEach((item) => (item.currentItem = false));
  dataArray[low].currentItem = true;

  // Set initial state for the pivot
  setData([...dataArray]);

  await Sleep(speedRange);

  while (i < j) {
    while (i < high && Number(dataArray[i].data) <= pivot) {
      dataArray[i].isLeft = true;
      setData([...dataArray]);
      await Sleep(speedRange);

      i++;

      dataArray[i - 1].isLeft = false;
      setData([...dataArray]);

      setStep((prev) => prev + 1); // Increment comparison count
    }

    while (j > low && Number(dataArray[j].data) > pivot) {
      dataArray[j].isRight = true;
      setData([...dataArray]);
      await Sleep(speedRange);

      j--;

      dataArray[j + 1].isRight = false;
      setData([...dataArray]);

      setStep((prev) => prev + 1); // Increment comparison count
    }

    if (i < j) {
      [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];
      setData([...dataArray]);
      await Sleep(speedRange);

      setStep((prev) => prev + 1); // Increment swap count
    }
  }

  [dataArray[low], dataArray[j]] = [dataArray[j], dataArray[low]];

  // Mark pivot and items in their final position as sorted
  dataArray[j].isSorted = true;
  setData([...dataArray]);

  await Sleep(speedRange);

  dataArray[j].currentItem = false;
  setData([...dataArray]);

  await Sleep(speedRange);

  return j;
};
