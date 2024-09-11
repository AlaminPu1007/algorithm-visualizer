import { quickSortAlgo } from '@/app/algorithm/quickSort';
import { MERGE_SORT_SVG_HEIGHT, MERGE_SORT_SVG_WIDTH } from '@/app/constant';
import { sortingData } from '@/app/data//SortData';
import { quickSortColorsData } from '@/app/data/mockData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { SortingDataProps } from '@/app/types/sortingProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// Calculate the maximum value to normalize data
const maxValue = Math.max(...sortingData.map((item) => Number(item.data)));

// Calculate column width and spacing
const columnWidth = MERGE_SORT_SVG_WIDTH / sortingData.length;
const columnSpacing = 5; // Space between columns

const QuickSortComponent: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  /** Define component state */
  const [data, setData] = useState<SortingDataProps[]>(JSON.parse(JSON.stringify(sortingData)));

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (data.length) {
      quickSortMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** a method to mark state as a initial-state */
  const resetDataState = async () => {
    // reset time-out
    clearAllTimeouts();

    const tempData = data.map((item) => ({
      ...item,
      isSorted: false,
      currentItem: false,
      isSwapped: false,
      isFinished: false,
      isCurrentCompareAbleItem: false,
      isCandidate: false,
      isActive: false,
      xPosition: 0,
      isLeft: false,
      isRight: false,
    }));

    setData(tempData);
  };

  /**
   * Method to perform quick sort visualization
   *
   * @async
   * @returns {*}
   */
  const quickSortMethod = async () => {
    try {
      if (!data.length) {
        throw new Error('The array is undefined!');
      }

      // Clear all state before starting
      await resetDataState();

      // Wait for state update to complete
      await Sleep(100);

      // Call the quick sort algorithm
      await quickSortAlgo([...data], 0, data.length - 1, setStep, setData, speedRange);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className='mb-3 mt-3 sm:mt-0'>
        <StatusColorsPlate data={quickSortColorsData} />
      </div>

      <div className='flex items-end justify-center'>
        <svg viewBox={`0 0 ${MERGE_SORT_SVG_WIDTH} ${MERGE_SORT_SVG_HEIGHT}`} className='border'>
          {data.map((item, index) => {
            const x = index * columnWidth;
            const columnHeight = (Number(item.data) / maxValue) * MERGE_SORT_SVG_HEIGHT + 15;

            let fillColor = 'black';
            if (item.currentItem)
              fillColor = '#FF4D4D'; // Red for the current item
            else if (item.isLeft)
              fillColor = '#6A0DAD'; // Purple for candidate items
            else if (item.isRight)
              fillColor = '#FF8C00'; // Orange for items being compared
            else if (item.isSorted) fillColor = '#28A745'; // Green for sorted items

            return (
              <g key={item.id} id={`item-${index}`}>
                <rect
                  x={x}
                  y={MERGE_SORT_SVG_HEIGHT - columnHeight}
                  width={columnWidth - columnSpacing}
                  height={columnHeight}
                  fill={fillColor}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className='item-center flex flex-wrap p-0 pt-3 text-center'>
        {data?.length &&
          data.map((item) => {
            let fillColor = 'bg-white';
            if (item.currentItem)
              fillColor = 'bg-red-600 text-white'; // Red for the current item
            else if (item.isLeft)
              fillColor = 'bg-purple-600 text-white'; // Purple for candidate items
            else if (item.isRight)
              fillColor = 'bg-orange-600 text-white'; // Orange for items being compared
            else if (item.isSorted) fillColor = 'bg-green-600 text-white'; // Green for sorted items

            return (
              <p key={item.id} className={`min-w-[50px] border p-2 text-[12px] ${fillColor}`}>
                {item.data || ''}
              </p>
            );
          })}
      </div>
      <div className='mt-4 text-center'>
        <p>Step: {step}</p>
      </div>
    </div>
  );
};

export default QuickSortComponent;
