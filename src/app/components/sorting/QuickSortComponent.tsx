import { MERGE_SORT_SVG_HEIGHT, MERGE_SORT_SVG_WIDTH } from '@/app/constant';
import { mergeSortData } from '@/app/data/mergeSortData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { mergeSortDataProps } from '@/app/types/sortingProps';
import React, { useEffect, useState } from 'react';

const initializePositions = (
  data: mergeSortDataProps[],
  columnWidth: number
) => {
  return data.map((item, index) => ({
    ...item,
    xPosition: index * columnWidth, // Position each item based on its index
  }));
};

// Calculate the maximum value to normalize data
const maxValue = Math.max(...mergeSortData.map((item) => Number(item.data)));

// Calculate column width and spacing
const columnWidth = MERGE_SORT_SVG_WIDTH / mergeSortData.length;
const columnSpacing = 5; // Space between columns

const QuickSortComponent: React.FC<{ speedRange: number }> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  speedRange,
}) => {
  /** Define component state */
  const [data, setData] = useState<mergeSortDataProps[]>(
    initializePositions(JSON.parse(JSON.stringify(mergeSortData)), columnWidth)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      isSwapped: false,
      currentItem: false,
      isFinished: false,
      isCurrentCompareAbleItem: false,
      isCandidate: false,
      isActive: false,
    }));

    setData(tempData);
  };

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
      await quickSortAlgo([...data], 0, data.length - 1);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const quickSortAlgo = async (
    data: mergeSortDataProps[],
    low: number,
    high: number
  ) => {
    try {
      if (low < high) {
        const pivotIdx = await partition(data, low, high);

        await quickSortAlgo(data, low, pivotIdx - 1);
        await quickSortAlgo(data, pivotIdx + 1, high);

        // Mark the segment as sorted
        setData((prevData) => {
          const updatedData = [...prevData];
          for (let i = low; i <= high; i++) {
            updatedData[i] = {
              ...updatedData[i],
              isSorted: true,
              currentItem: false,
              isSwapped: false,
              isFinished: false,
              isCurrentCompareAbleItem: false,
              isCandidate: false,
              isActive: false,
            };
          }
          return updatedData;
        });

        await Sleep(speedRange);
      } else if (low === high) {
        // Mark single item as sorted
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[low] = {
            ...updatedData[low],
            isSorted: true,
            currentItem: false,
            isSwapped: false,
            isFinished: false,
            isCurrentCompareAbleItem: false,
            isCandidate: false,
            isActive: false,
          };
          return updatedData;
        });

        await Sleep(speedRange);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  const partition = async (
    dataArray: mergeSortDataProps[],
    low: number,
    high: number
  ): Promise<number> => {
    let i = low;
    let j = high;
    const pivot = Number(dataArray[low].data);

    // Set initial state for the pivot
    // setData((prevData) => {
    //   const updatedData = [...prevData];
    //   // updatedData[low].currentItem = true;
    //   // updatedData[low].currentItem = true;
    //   return updatedData;
    // });

    // await Sleep(speedRange);

    while (i < j) {
      // movie i point until get the lowest value
      // always find out the largest value from the pivot
      while (i < high && Number(dataArray[i].data) <= pivot) {
        // setData(() => {
        //   const temp = [...dataArray];

        //   // Clear previous item highlight
        //   if (i > low) temp[i - 1].isCurrentCompareAbleItem = false;

        //   // Highlight the new current item
        //   temp[i].isCurrentCompareAbleItem = true;

        //   return temp;
        // });

        // await Sleep(speedRange);

        i++;
      }

      while (j > low && Number(dataArray[j].data) > pivot) {
        // setData(() => {
        //   const temp = [...dataArray];

        //   // Clear previous item highlight
        //   if (j < high) temp[j + 1].isCurrentCompareAbleItem = false;

        //   // Highlight the new current item
        //   temp[j].isCurrentCompareAbleItem = true;

        //   return temp;
        // });

        // await Sleep(speedRange);

        j--;
      }

      if (i < j) {
        setData(() => {
          const temp = [...dataArray];
          temp[i].isSwapped = true;
          temp[j].isSwapped = true;

          return temp;
        });

        // await Sleep(speedRange);
        await animateSwap(i, j);

        [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];

        setData(() => {
          const temp = [...dataArray];
          temp[i].isSwapped = false;
          temp[j].isSwapped = false;

          return temp;
        });

        await Sleep(speedRange);
      }
    }

    // Move pivot to its correct place
    setData(() => {
      const temp = [...dataArray];

      temp[low].isSwapped = true;
      temp[j].isSwapped = true;

      return temp;
    });

    await Sleep(speedRange);

    [dataArray[low], dataArray[j]] = [dataArray[j], dataArray[low]];

    setData(() => {
      const temp = [...dataArray];

      // Clear candidate marks after final swap
      temp[low].isSwapped = false;
      temp[j].isSwapped = false;

      // Mark the final pivot as sorted
      temp[j].isSorted = true;

      return temp;
    });

    await Sleep(speedRange);

    return j;
  };

  const animateSwap = async (index1: number, index2: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      const element1 = document.getElementById(`item-${index1}`);
      const element2 = document.getElementById(`item-${index2}`);

      if (element1 && element2) {
        console.log(element1.getBoundingClientRect().x, 'ele');

        element1.style.transition = 'transform 0.5s ease';
        element2.style.transition = 'transform 0.5s ease';

        const xPos1 = element1.getBoundingClientRect().left;
        const xPos2 = element2.getBoundingClientRect().left;

        element1.style.transform = `translateX(${xPos2 - xPos1}px)`;
        element2.style.transform = `translateX(${xPos1 - xPos2}px)`;

        setTimeout(() => {
          element1.style.transform = '';
          element2.style.transform = '';
          resolve();
        }, 500);
      }
    });
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
            if (item.currentItem)
              fillColor = '#FF4D4D'; // Red for the current item
            else if (item.isCandidate)
              fillColor = '#6A0DAD'; // Purple for candidate items
            else if (item.isSwapped)
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
            else if (item.isCandidate)
              fillColor = 'bg-purple-600 text-white'; // Purple for candidate items
            else if (item.isSwapped)
              fillColor = 'bg-orange-600 text-white'; // Orange for items being compared
            else if (item.isSorted) fillColor = 'bg-green-600 text-white'; // Green for sorted items

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

export default QuickSortComponent;
