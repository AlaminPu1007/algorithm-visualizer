import React from 'react';
import { SortingDataProps } from '../types/sortingProps';
import { Sleep } from '../lib/sleepMethod';

/**
 * A selection algorithm visualization to sort the actual data
 *
 * @async
 * @param {SortingDataProps[]} data
 * @param {React.Dispatch<React.SetStateAction<SortingDataProps[]>>} setData
 * @param {number} speedRange
 * @param {React.Dispatch<React.SetStateAction<number>>} setStep
 * @returns {*}
 */
export const selectionSortAlgo = async (
  data: SortingDataProps[],
  setData: React.Dispatch<React.SetStateAction<SortingDataProps[]>>,
  speedRange: number,
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const tempData: SortingDataProps[] = data;

    for (let i = 0; i < tempData.length; i++) {
      let min_idx = i;

      // update current item-index
      setData(() => {
        const updatedData = [...tempData];
        updatedData[i].currentItem = true;
        return updatedData;
      });

      await Sleep(speedRange);

      for (let j = i + 1; j < tempData.length; j++) {
        // Increment step for each comparison
        setStep((prv) => prv + 1);

        setData(() => {
          const updatedData = [...tempData];
          updatedData[j].isCurrentCompareAbleItem = true;
          return updatedData;
        });

        await Sleep(speedRange);

        if (tempData[min_idx].data > tempData[j].data) {
          // setStep((prv) => prv + 1);

          setData(() => {
            const updatedData = [...tempData];
            updatedData[min_idx].isCandidate = false;

            return updatedData;
          });

          await Sleep(speedRange);

          min_idx = j;

          setData(() => {
            const updatedData = [...tempData];
            updatedData[min_idx].isCandidate = true;

            return updatedData;
          });
        } else {
          setData(() => {
            const updatedData = [...tempData];
            updatedData[j].isCandidate = false;

            return updatedData;
          });
        }

        // do staff for all common thing
        setData(() => {
          const updatedData = [...tempData];
          updatedData[j].isCurrentCompareAbleItem = false;

          return updatedData;
        });
      }

      // new perform a swap operation
      if (min_idx !== i) {
        // Increment step for the swap operation
        setStep((prev) => prev + 1);

        [tempData[i], tempData[min_idx]] = [tempData[min_idx], tempData[i]];

        setData(() => {
          const updateData = [...tempData];
          updateData[i].isSorted = true;
          updateData[i].currentItem = false;
          updateData[min_idx].currentItem = false;
          updateData[i].isCandidate = false;
          updateData[min_idx].isCandidate = false;

          return updateData;
        });
      }

      setData(() => {
        const updatedData = [...tempData];
        updatedData[i].currentItem = false;
        updatedData[i].isSorted = true;
        return updatedData;
      });

      await Sleep(speedRange);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};
