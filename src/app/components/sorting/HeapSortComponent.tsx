'use client';
import { heapify, HeapSortApproach } from '@/app/algorithm/heapSort';
import { getRandomTreeData, NODE_POSITION } from '@/app/constant';
import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { heapSortColorsData } from '@/app/data/mockData';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { HeapSortedItemProps } from '@/app/types/sortingProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const HeapSortComponent: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  const [data, setData] = useState<ITreeNode[]>([]);
  const [sortedData, setSortedData] = useState<HeapSortedItemProps[]>([]);

  useEffect(() => {
    const newTree = new Tree(JSON.parse(JSON.stringify(getRandomTreeData(31))));
    // created a valid tree
    newTree.insertIntoList();
    if (newTree?.linearArr?.length) {
      setData(newTree.linearArr);
    }
  }, []);

  useEffect(() => {
    if (data?.length) {
      performHeapMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  const performHeapMethod = async () => {
    const tempData = [...data];
    const n = tempData.length;

    // Index of last non-leaf node
    const startIdx = Math.floor(n / 2) - 1;

    // STEP: 1 -> Construct a heapify or max-heap tree
    toast.success('Heapify the tree');

    // Perform reverse level order traversal
    // from last non-leaf node and heapify
    // each node
    for (let i = startIdx; i >= 0; i--) {
      await heapify(tempData, n, i, speedRange, setData);
    }

    // after completed heapify the root data,
    // perform a heap sort
    toast.success('Perform a heap sort');
    // STEP: 2, Perform a heap sort
    HeapSortApproach(tempData, n, speedRange, setData, setSortedData);
  };

  return (
    <>
      <div className='mb-3 mt-3 sm:mt-0'>
        <StatusColorsPlate data={heapSortColorsData} />
      </div>

      <div>
        {sortedData?.length ? (
          <div className='flex flex-wrap items-center justify-end xl:flex-nowrap'>
            {sortedData.map((item) => {
              return (
                <p
                  className='me-2 flex h-[35px] w-[35px] items-center justify-center rounded-sm border-[1px] bg-green-600 text-center text-sm text-white'
                  key={item.id}
                >
                  {item.data}
                </p>
              );
            })}
          </div>
        ) : null}
      </div>
      <div>
        {data?.length ? (
          <svg viewBox='-25 20 300 140'>
            {data.map((root) => {
              let fillColor = '#000'; // Default stroke color (text color and line color)
              let circleFillColor = '#fff'; // Default circle fill color
              let textColor = '#000';

              // Define colors based on node states
              if (root.isCurrent) {
                fillColor = 'red';
                circleFillColor = 'red';
                textColor = '#fff';
              } else if (root.isSwap) {
                textColor = '#fff';
                circleFillColor = '#341f97';
              } else if (root.isSorted) {
                fillColor = 'green';
                circleFillColor = 'green';
                textColor = 'white';
              }

              return (
                <g key={root.id}>
                  {root.parent &&
                    (() => {
                      const linePos = calculateLinePosition(
                        root.parent.cx!,
                        root.parent.cy!,
                        root.cx!,
                        root.cy!,
                        NODE_POSITION
                      );
                      return (
                        <>
                          <line
                            x1={linePos.startX}
                            y1={linePos.startY}
                            x2={linePos.endX}
                            y2={linePos.endY}
                            stroke={root.parent.isSorted ? 'green' : '#000'}
                            strokeWidth={'0.3'}
                          >
                            <animate
                              attributeName='stroke-dasharray'
                              attributeType='XML'
                              from='0 9.375'
                              to='79.375 0'
                              dur={'4s'}
                              fill='freeze'
                            />
                          </line>
                        </>
                      );
                    })()}
                  <circle
                    cx={root.cx!}
                    cy={root.cy!}
                    r={NODE_POSITION}
                    fill={circleFillColor}
                    stroke={fillColor}
                    strokeWidth={'0.2'}
                  >
                    <animate attributeName='r' from='4' to={5} dur='1s' begin={'0s'} />
                  </circle>
                  <text
                    x={root.cx!}
                    y={root.cy!}
                    dy={2}
                    textAnchor='middle'
                    className='text-center text-[4px]'
                    fill={textColor}
                  >
                    {root?.value || -1}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className='flex min-h-[200px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default HeapSortComponent;
