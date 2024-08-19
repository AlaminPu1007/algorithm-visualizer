import { selectionSortAlgo } from '@/app/algorithm/selectionSort';
import { MERGE_SORT_SVG_HEIGHT, MERGE_SORT_SVG_WIDTH } from '@/app/constant';
import { mergeSortData } from '@/app/data/mergeSortData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { mergeSortDataProps } from '@/app/types/sortingProps';
import React, { useEffect, useState } from 'react';

// Calculate the maximum value to normalize data
const maxValue = Math.max(...mergeSortData.map((item) => Number(item.data)));

// Calculate column width and spacing
const columnWidth = MERGE_SORT_SVG_WIDTH / mergeSortData.length;
const columnSpacing = 5; // Space between columns

const SelectionSortComponent: React.FC<{ speedRange: number }> = ({
  speedRange,
}) => {
  /** Define component state */
  const [data, setData] = useState<mergeSortDataProps[]>(
    JSON.parse(JSON.stringify(mergeSortData))
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (data.length) {
      selectionSortMethod();
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
      isSwapped: false,
      currentItem: false,
      isFinished: false,
      isCurrentCompareAbleItem: false,
      isCandidate: false,
      isActive: false,
    }));

    setData(tempData);
  };

  const selectionSortMethod = async () => {
    try {
      if (!data.length) {
        throw new Error('The array is undefined!');
      }

      // Clear all state before starting
      await resetDataState();

      // Wait for state update to complete
      await Sleep(100);

      // Call the bubble sort algorithm
      selectionSortAlgo([...data], setData, speedRange, setStep);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className='mb-4 mt-0 flex items-center justify-start space-x-4'>
        <div className='group relative'>
          <div className='h-6 w-6 bg-red-600'></div>
          <span className='absolute bottom-full mb-2 hidden rounded bg-gray-800 p-2 text-xs text-white group-hover:block'>
            Current Item (Red)
          </span>
        </div>
        <div className='group relative'>
          <div className='h-6 w-6 bg-purple-600'></div>
          <span className='absolute bottom-full mb-2 hidden rounded bg-gray-800 p-2 text-xs text-white group-hover:block'>
            Candidate (Purple)
          </span>
        </div>
        <div className='group relative'>
          <div className='h-6 w-6 bg-orange-600'></div>
          <span className='absolute bottom-full mb-2 hidden rounded bg-gray-800 p-2 text-xs text-white group-hover:block'>
            Current Comparable Item (Orange)
          </span>
        </div>
        <div className='group relative'>
          <div className='h-6 w-6 bg-green-600'></div>
          <span className='absolute bottom-full mb-2 hidden rounded bg-gray-800 p-2 text-xs text-white group-hover:block'>
            Sorted (Green)
          </span>
        </div>
      </div>
      <div className='flex items-end justify-center'>
        <svg
          viewBox={`0 0 ${MERGE_SORT_SVG_WIDTH} ${MERGE_SORT_SVG_HEIGHT}`}
          className='border'
        >
          {data.map((item, index) => {
            const x = index * columnWidth;
            const columnHeight =
              (Number(item.data) / maxValue) * MERGE_SORT_SVG_HEIGHT + 15;

            let fillColor = 'black';

            if (item.currentItem) {
              fillColor = '#FF4D4D'; // Red
            }

            if (item.isCandidate) {
              fillColor = '#6A0DAD'; // Purple
            }

            if (item.isCurrentCompareAbleItem) {
              fillColor = '#FF8C00'; // Orange
            }

            if (item.isSorted) {
              fillColor = '#28A745'; // Green
            }

            return (
              <g key={item.id}>
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

            if (item.currentItem) {
              fillColor = 'bg-red-600 text-white'; // Red
            }

            if (item.isCandidate) {
              fillColor = 'bg-purple-600 text-white'; // Purple
            }

            if (item.isCurrentCompareAbleItem) {
              fillColor = 'bg-orange-600 text-white'; // Orange
            }

            if (item.isSorted) {
              fillColor = 'bg-green-600 text-white'; // Green
            }

            return (
              <p
                key={item.id}
                className={`min-w-[50px] border p-2 text-[12px] ${fillColor}`}
              >
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

export default SelectionSortComponent;
