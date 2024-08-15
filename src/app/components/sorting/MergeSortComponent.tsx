'use client';

import { mergeSortMethod } from '@/app/algorithm/mergeSort';
import { MERGE_SORT_SVG_HEIGHT, MERGE_SORT_SVG_WIDTH } from '@/app/constant';
import { mergeSortData } from '@/app/data/mergeSortData';
import { mergeSortDataProps } from '@/app/types/sortingProps';
import React, { useEffect, useState } from 'react';

// Calculate the maximum value to normalize data
const maxValue = Math.max(...mergeSortData.map((item) => Number(item.data)));

// Calculate column width and spacing
const columnWidth = MERGE_SORT_SVG_WIDTH / mergeSortData.length;
const columnSpacing = 5; // Space between columns

const MergeSortComponent = () => {
  const [data, setData] = useState<mergeSortDataProps[]>(mergeSortData);
  const [step, setStep] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<{
    leftIndex: number | null;
    rightIndex: number | null;
  }>({
    leftIndex: -1,
    rightIndex: -1,
  }); // State for current index
  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    if (data.length) {
      mergeSortMethod(data, setStep, setCurrentIndex, setIsSorted, setData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='flex items-end justify-center'>
        <svg
          viewBox={`0 0 ${MERGE_SORT_SVG_WIDTH} ${MERGE_SORT_SVG_HEIGHT}`}
          className='border'
        >
          {data.map((item, index) => {
            const x = index * columnWidth;
            const columnHeight =
              (Number(item.data) / maxValue) * MERGE_SORT_SVG_HEIGHT + 15;
            const isCurrentLeft = index === currentIndex.leftIndex;
            const isCurrentRight = index === currentIndex.rightIndex;
            const fillColor = isSorted
              ? 'green' // Color for completed sorting
              : isCurrentLeft
                ? 'red'
                : isCurrentRight
                  ? 'blue'
                  : 'black';
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
            const isCurrentLeft = index === currentIndex.leftIndex;
            const isCurrentRight = index === currentIndex.rightIndex;
            return (
              <p
                key={item.id}
                className={`border p-2 text-[12px] ${isCurrentLeft ? 'bg-red-800 text-white' : isCurrentRight ? 'bg-blue-800 text-white' : ''}`}
              >
                {item.data + ' ' || ''}
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
