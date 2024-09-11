'use client';

import { mergeSortMethod } from '@/app/algorithm/mergeSort';
import { MERGE_SORT_SVG_HEIGHT, MERGE_SORT_SVG_WIDTH } from '@/app/constant';
import { mergeSortColorsData } from '@/app/data/mockData';
import { sortingData } from '@/app/data/SortData';
import { SortingDataProps } from '@/app/types/sortingProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// Calculate the maximum value to normalize data
const maxValue = Math.max(...sortingData.map((item) => Number(item.data)));

// Calculate column width and spacing
const columnWidth = MERGE_SORT_SVG_WIDTH / sortingData.length;
const columnSpacing = 5; // Space between columns

const MergeSortComponent: React.FC<{ speedRange: number }> = ({ speedRange = 0 }) => {
  const [data, setData] = useState<SortingDataProps[]>(JSON.parse(JSON.stringify(sortingData)));
  const [step, setStep] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<{
    leftIndex: number | null;
    rightIndex: number | null;
  }>({
    leftIndex: -1,
    rightIndex: -1,
  }); // State for current index
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [currentHalves, setCurrentHalves] = useState<{
    leftHalf: number[];
    rightHalf: number[];
  }>({
    leftHalf: [],
    rightHalf: [],
  });
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  useEffect(() => {
    if (data.length) {
      mergeSortMethod(
        data,
        setStep,
        currentIndex,
        setCurrentIndex,
        setIsSorted,
        setData,
        speedRange,
        setCurrentHalves,
        setCompletedItems
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='mb-3 mt-3 sm:mt-0'>
        <StatusColorsPlate data={mergeSortColorsData} />
      </div>

      <div className='flex items-end justify-center'>
        <svg viewBox={`0 0 ${MERGE_SORT_SVG_WIDTH} ${MERGE_SORT_SVG_HEIGHT}`} className='border'>
          {data.map((item, index) => {
            const x = index * columnWidth;
            const columnHeight = (Number(item.data) / maxValue) * MERGE_SORT_SVG_HEIGHT + 15;

            const isLeftHalf = currentHalves.leftHalf.includes(Number(item.id));
            const isRightHalf = currentHalves.rightHalf.includes(Number(item.id));
            const isCurrentLeft = index === currentIndex.leftIndex;
            const isCurrentRight = index === currentIndex.rightIndex;

            let isCompleted = false;

            if (isSorted) {
              isCompleted = completedItems.includes(index);
            }

            let fillColor = 'black'; // Default color

            if (isCompleted && isSorted) {
              fillColor = 'green'; // Color for completed sorting
            } else if (isCurrentLeft) {
              fillColor = 'red'; // Color for current left index
            } else if (isCurrentRight) {
              fillColor = 'blue'; // Color for current right index
            } else if (isLeftHalf) {
              fillColor = 'orange'; // Color for current left half
            } else if (isRightHalf) {
              fillColor = 'purple'; // Color for current right half
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
          data.map((item, index) => {
            const isLeftHalf = currentHalves.leftHalf.includes(Number(item.id));
            const isRightHalf = currentHalves.rightHalf.includes(Number(item.id));

            const isCurrentLeft = index === currentIndex.leftIndex;
            const isCurrentRight = index === currentIndex.rightIndex;

            let isCompleted = false;

            if (isSorted) {
              isCompleted = completedItems.includes(index);
            }

            return (
              <p
                key={item.id}
                className={`min-w-[50px] border p-2 text-[12px] ${
                  !(isCompleted && isCompleted)
                    ? isCurrentLeft
                      ? 'bg-red-800 text-white'
                      : isCurrentRight
                        ? 'bg-blue-800 text-white'
                        : isLeftHalf
                          ? 'bg-orange-400 text-white'
                          : isRightHalf
                            ? 'bg-purple-400 text-white'
                            : ''
                    : 'bg-green-800 text-white'
                }`}
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

export default MergeSortComponent;
