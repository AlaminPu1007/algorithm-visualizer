import { Sleep } from '@/app/lib/sleepMethod';
import { LinearSearchDataProps } from '@/app/types/commonProps';
import React from 'react';
import { toast } from 'react-toastify';

export const LinearSearchToFindTheTarget = async (
  data: LinearSearchDataProps[],
  setSteps: React.Dispatch<React.SetStateAction<number>>,
  setData: React.Dispatch<React.SetStateAction<LinearSearchDataProps[]>>,
  setSearchItem: React.Dispatch<React.SetStateAction<number>>,
  speedRange: number,
  searchItem: number
) => {
  // Create a shallow copy of the data for manipulation
  const tempData = [...data];

  // Iterate through the data array to perform the search
  for (let i = 0; i < data.length; i++) {
    // Increment the step count for each iteration
    setSteps((prev) => prev + 1);

    // Check if the current item matches the search item
    if (tempData[i].data === searchItem) {
      // Highlight the item as the target
      setData(() => {
        tempData[i].isTarget = true;
        return tempData;
      });

      // Wait for the specified speed before proceeding
      await Sleep(speedRange);

      // Show success notification
      toast.success(`Target is found at index ${i}`);

      // Set a new random search item for the next search iteration
      setSearchItem(Math.floor(Math.random() * data.length) % data.length);
      return;
    }

    // Highlight the current item being compared
    setData(() => {
      tempData[i].isCurrent = true;
      return tempData;
    });

    // Wait for the specified speed to allow visualization
    await Sleep(speedRange);

    // Remove the highlight after comparison
    setData(() => {
      tempData[i].isCurrent = false;
      return tempData;
    });
  }

  // If the loop completes without finding the target, show error notification
  toast.error(`Target is not found`);
};
