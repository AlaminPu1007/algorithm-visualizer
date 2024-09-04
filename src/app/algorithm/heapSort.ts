import React from 'react';
import { Sleep } from '../lib/sleepMethod';
import { ITreeNode } from '../types/TreeTypeProps';
import { HeapSortedItemProps } from '../types/sortingProps';

/**
 * Performs heap sort on an array of tree nodes.
 *
 * This function sorts the `tempData` array using the heap sort algorithm, with visualization updates
 * at each step to reflect the current, swapped, and sorted states of the nodes.
 *
 * @param {ITreeNode[]} tempData - The array of tree nodes to be sorted.
 * @param {number} n - The number of elements in the array to be sorted.
 * @param {number} speedRange - The delay duration (in milliseconds) for visualization updates.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode[]>>} setData - State setter function for updating the visualization of the tree nodes.
 * @param {React.Dispatch<React.SetStateAction<HeapSortedItemProps[]>>} setSortedData - State setter function for storing the sorted items.
 *
 * @returns {Promise<void>} A promise that resolves when the heap sort process is complete.
 */
export const HeapSortApproach = async (
  tempData: ITreeNode[],
  n: number,
  speedRange: number,
  setData: React.Dispatch<React.SetStateAction<ITreeNode[]>>,
  setSortedData: React.Dispatch<React.SetStateAction<HeapSortedItemProps[]>>
) => {
  /** perform a heap sort */
  // Step 2: Perform heap sort
  for (let i = n - 1; i > 0; i--) {
    // Swap the root of the heap with the last element
    tempData[0].isCurrent = true;
    tempData[i].isSwap = true;

    setData([...tempData]);
    await Sleep(speedRange); // Delay for visualization

    [tempData[0].value, tempData[i].value] = [tempData[i].value, tempData[0].value];

    // Mark the last element as sorted
    tempData[0].isSwap = false;
    tempData[i].isSwap = false;
    tempData[i].isSorted = true;
    tempData[i].isCurrent = false;

    // stored sorted item
    setSortedData((prv) => [{ data: Number(tempData[i].value), id: Number(tempData[i].id) }, ...prv]);

    setData([...tempData]);
    await Sleep(speedRange); // Delay for visualization

    // Heapify the root element to get the next largest element
    await heapify(tempData, i, 0, speedRange, setData);

    // Reset node states after each iteration
    resetNodeStates(tempData);
  }

  // Mark the first element as sorted
  tempData[0].isSorted = true;
  setData([...tempData]);
};

/**
 * Resets the state of all nodes in the array.
 *
 * This helper function resets the `isCurrent`, `isSwap`, and `isSorted` states of all nodes
 * in the given array.
 *
 * @param {ITreeNode[]} arr - The array of tree nodes whose states are to be reset.
 */
export const resetNodeStates = (arr: ITreeNode[]) => {
  for (const node of arr) {
    node.isCurrent = false;
    node.isSwap = false;
  }
};

/**
 * Converts the array of tree nodes into a max heap.
 *
 * This function ensures that the tree nodes in the given array satisfy the max heap property
 * by recursively heapifying the affected subtree.
 *
 * @param {ITreeNode[]} arr - The array of tree nodes to be heapified.
 * @param {number} n - The size of the heap.
 * @param {number} i - The index of the node to heapify.
 * @param {number} speedRange - The delay duration (in milliseconds) for visualization updates.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode[]>>} setData - State setter function for updating the visualization of the tree nodes.
 *
 * @returns {Promise<void>} A promise that resolves when the heapify process is complete.
 */

export const heapify = async (
  arr: ITreeNode[],
  n: number,
  i: number,
  speedRange: number,
  setData: React.Dispatch<React.SetStateAction<ITreeNode[]>>
) => {
  // get current root node
  let largest = i;

  // get it's left child position
  const left = 2 * i + 1;

  // get it's right child position
  const right = 2 * i + 2;

  if (left < n && Number(arr[left].value) > Number(arr[largest].value)) {
    largest = left;
  }

  if (right < n && Number(arr[right].value) > Number(arr[largest].value)) {
    largest = right;
  }

  resetNodeStates(arr);
  await Sleep(50);

  if (largest !== i) {
    // Mark nodes involved in the swap
    arr[i].isSwap = true;
    arr[largest].isSwap = true;
    setData([...arr]);
    await Sleep(speedRange); // Delay for visualization

    // Perform the swap
    [arr[i].value, arr[largest].value] = [arr[largest].value, arr[i].value];

    // Update the visualization with swapped nodes
    setData([...arr]);
    await Sleep(speedRange); // Delay for visualization

    // Recursively heapify the affected subtree
    await heapify(arr, n, largest, speedRange, setData);
  }

  // Reset the node states after processing
  resetNodeStates(arr);
  setData([...arr]);
  await Sleep(200);
};
