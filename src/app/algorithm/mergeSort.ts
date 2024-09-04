import React from 'react';
// import { MERGE_SLEEP_DELAY } from '../constant';
import { clearAllTimeouts, Sleep } from '../lib/sleepMethod';
import { currentIndicesProps, SortingDataProps } from '../types/sortingProps';

/**
 * Initiates the merge sort algorithm.
 *
 * @async
 * @param {SortingDataProps[]} data - The array of data to be sorted.
 * @param {(step: number) => void} setStep - Function to update the current step of the sorting process.
 * @param {React.Dispatch<React.SetStateAction<currentIndicesProps>>} setCurrentIndex - Function to update the current indices being compared during sorting.
 * @param {(isSorted: boolean) => void} setIsSorted - Function to mark sorting as complete.
 * @param {(data: SortingDataProps[]) => void} setData - Function to update the data array with sorted values.
 * @param {speedRange} number for setTimeOut method
 */

export const mergeSortMethod = async (
  data: SortingDataProps[],
  setStep: React.Dispatch<React.SetStateAction<number>>,
  currentIndex: currentIndicesProps,
  setCurrentIndex: React.Dispatch<React.SetStateAction<currentIndicesProps>>,
  setIsSorted: (sorted: boolean) => void,
  setData: (data: SortingDataProps[]) => void,
  speedRange: number,
  setCurrentHalves: React.Dispatch<
    React.SetStateAction<{
      leftHalf: number[];
      rightHalf: number[];
    }>
  >,
  setCompletedItems: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // eslint-disable-next-line prefer-const
  let low = 0;
  // eslint-disable-next-line prefer-const
  let high = data.length - 1;

  // clear all time out if it's present
  clearAllTimeouts();

  if (currentIndex.leftIndex !== -1 || currentIndex.rightIndex !== -1) {
    setCurrentIndex({ leftIndex: -1, rightIndex: -1 });
  }

  const tempArr = [...data];

  await mergeSortDFS(
    tempArr,
    low,
    high,
    setStep,
    setCurrentIndex,
    setData,
    speedRange,
    setCurrentHalves,
    setCompletedItems
  );

  setIsSorted(true);
  await Sleep(10);

  // after completed the merged properly
  for (let i = 0; i < data?.length; i++) {
    setCompletedItems((prv) => [...prv, i]);
    await Sleep(0);
  }

  await Sleep(1500);

  // after completed merge-sort mark initial state
  setCurrentHalves({
    leftHalf: [],
    rightHalf: [],
  });
  // setCompletedItems([]);
};

/**
 * Recursively divides the array and sorts the left and right halves using the merge sort algorithm.
 *
 * @async
 * @param {SortingDataProps[]} data - The array of data to be sorted.
 * @param {number} low - The starting index of the array or sub-array.
 * @param {number} high - The ending index of the array or sub-array.
 * @param {(step: number) => void} setStep - Function to update the current step of the sorting process.
 * @param {React.Dispatch<React.SetStateAction<{ leftIndex: number | null; rightIndex: number | null; }>>} setCurrentIndex - Function to update the current indices being compared during sorting.
 * @param {(data: SortingDataProps[]) => void} setData - Function to update the data array with sorted values.
 */

const mergeSortDFS = async (
  data: SortingDataProps[],
  low: number,
  high: number,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<currentIndicesProps>>,
  setData: (data: SortingDataProps[]) => void,
  speedRange: number,
  setCurrentHalves: React.Dispatch<
    React.SetStateAction<{
      leftHalf: number[];
      rightHalf: number[];
    }>
  >,
  setCompletedItems: React.Dispatch<React.SetStateAction<number[]>>
) => {
  if (low >= high) return;

  // get middle of the array
  const mid = Math.floor((low + high) / 2);

  // called the left halves
  await mergeSortDFS(
    data,
    low,
    mid,
    setStep,
    setCurrentIndex,
    setData,
    speedRange,
    setCurrentHalves,
    setCompletedItems
  );

  // called the right halves
  await mergeSortDFS(
    data,
    mid + 1,
    high,
    setStep,
    setCurrentIndex,
    setData,
    speedRange,
    setCurrentHalves,
    setCompletedItems
  );

  // Update the state to indicate the current left and right halves
  setCurrentHalves({
    leftHalf: data.slice(low, mid + 1).map((item) => Number(item.id)), // (mid + 1) => include mid
    rightHalf: data.slice(mid + 1, high + 1).map((item) => Number(item.id)), //  (high + 1) => ensure to include last item also
  });

  // now merge both left & right halves
  await mergeMethod(data, low, mid, high, setCurrentIndex, setData, setStep, speedRange);

  setCurrentHalves({
    leftHalf: [],
    rightHalf: [],
  });
};

/**
 * Merges the sorted halves of the array and updates the current state.
 *
 * @async
 * @param {SortingDataProps[]} arr - The array of data to be merged.
 * @param {number} low - The starting index of the left half.
 * @param {number} mid - The midpoint index dividing the two halves.
 * @param {number} high - The ending index of the right half.
 * @param {React.Dispatch<React.SetStateAction<{ leftIndex: number | null; rightIndex: number | null; }>>} setCurrentIndex - Function to update the current indices being compared during merging.
 * @param {(data: SortingDataProps[]) => void} setData - Function to update the data array with merged values.
 */

const mergeMethod = async (
  arr: SortingDataProps[],
  low: number,
  mid: number,
  high: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<currentIndicesProps>>,
  setData: (data: SortingDataProps[]) => void,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  speedRange: number
) => {
  const tempArray: SortingDataProps[] = [];
  let left = low;
  let right = mid + 1;

  while (left <= mid && right <= high) {
    if (Number(arr[left].data) <= Number(arr[right].data)) {
      tempArray.push(arr[left]);
      setCurrentIndex((prev) => ({ ...prev, leftIndex: left }));
      await Sleep(speedRange);
      left++;
    } else {
      tempArray.push(arr[right]);
      setCurrentIndex((prev) => ({ ...prev, rightIndex: right }));
      await Sleep(speedRange);
      right++;
    }

    setStep((prevStep) => prevStep + 1); // Increment comparison count
  }

  while (left <= mid) {
    setCurrentIndex((prev) => ({ ...prev, rightIndex: left }));
    await Sleep(speedRange);
    tempArray.push(arr[left]);
    left++;

    setStep((prevStep) => prevStep + 1); // Increment comparison count
  }

  while (right <= high) {
    setCurrentIndex((prev) => ({ ...prev, rightIndex: right }));
    await Sleep(speedRange);
    tempArray.push(arr[right]);
    right++;

    setStep((prevStep) => prevStep + 1); // Increment comparison count
  }

  for (let i = low; i <= high; i++) {
    arr[i] = tempArray[i - low];
  }

  setData([...arr]);
  setCurrentIndex({ leftIndex: -1, rightIndex: -1 });

  setStep((prevStep) => prevStep + 1); // Increment comparison count

  await Sleep(speedRange);
};
