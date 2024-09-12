'use client';

import React, { useEffect, useRef, useState } from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { getRandomTreeData, NODE_POSITION } from '@/app/constant';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { performBST } from '@/app/algorithm/binarySearch';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import { bstSearchColorsData } from '@/app/data/mockData';

// define component Page Props
interface PageProps {
  speedRange: number;
}

// a fixed array size
const ARRAY_SIZE = 31;

const BinarySearchTreeComponent: React.FC<PageProps> = ({ speedRange }) => {
  // define component local state
  const [data, setData] = useState<ITreeNode | null>(null);
  const [target, setTarget] = useState<number>(0);
  const isSearching = useRef(false); // Ref to track if the search is already running

  useEffect(() => {
    /**
     * Initializes the tree with random data and collects nodes in an in-order traversal manner.
     *
     * The new tree data is generated using `getRandomTreeData(31)` and then processed to extract
     * all nodes in an in-order traversal. The nodes are collected and stored in the `steps` state.
     */
    const tempArr = getRandomTreeData(ARRAY_SIZE);
    const randomIdx = Math.floor(Math.random() * ARRAY_SIZE + 1) % ARRAY_SIZE;

    // store the target item
    setTarget(tempArr[randomIdx]);
    const newTree = new Tree(tempArr);
    // create a valid BST
    newTree.createBalancedBST();

    if (newTree?.head) {
      // Set the tree data to state
      setData(newTree.head);
    }

    return () => {
      clearAllTimeouts();
    };
  }, []);

  useEffect(() => {
    // Trigger performBST only when data and target are set and search isn't in progress
    if (data && target && !isSearching.current) {
      isSearching.current = true; // Mark search as in progress
      performBST(data, setData, speedRange, target);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, target]);

  return (
    <>
      <div className='mt-2 flex md:mt-0'>
        <StatusColorsPlate data={bstSearchColorsData} />
        <p className='m-0 ms-5 p-0 text-center text-lg font-medium sm:text-start md:text-xl'>
          TARGET : <span className='text-green-600'>{target}</span>
        </p>
      </div>

      <>
        <svg viewBox='-20 20 280 138'>
          <RecursiveApproach node={data} />
        </svg>
      </>
    </>
  );
};

interface TreeBFSRecursiveTraversalProps {
  node: ITreeNode | null;
}

const RecursiveApproach: React.FC<TreeBFSRecursiveTraversalProps> = ({ node }) => {
  if (!node) return;

  return (
    <>
      <g key={node.id}>
        {node.parent &&
          (() => {
            const linePos = calculateLinePosition(node.parent.cx!, node.parent.cy!, node.cx!, node.cy!, NODE_POSITION);
            return (
              <line
                x1={linePos.startX}
                y1={linePos.startY}
                x2={linePos.endX}
                y2={linePos.endY}
                stroke={node.isCurrent ? '#2563EB' : node.isInvalid ? 'red' : node.isTarget ? 'green' : 'black'}
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
            );
          })()}
        <circle
          cx={node.cx!}
          cy={node.cy!}
          r={NODE_POSITION}
          fill={node.isCurrent ? '#2563EB' : node.isInvalid ? 'red' : node.isTarget ? 'green' : 'white'}
          stroke={node.isCurrent || node.isInvalid || node.isTarget ? 'white' : 'black'}
          strokeWidth={'0.2'}
        >
          <animate attributeName='r' from='4' to={5} dur='1s' begin={'0s'} />
        </circle>
        <text
          x={node.cx!}
          y={node.cy!}
          dy={2}
          textAnchor='middle'
          className='text-center text-[4px]'
          fill={node.isCurrent || node.isInvalid || node.isTarget ? 'white' : 'black'}
        >
          {node?.value || -1}
        </text>
      </g>
      {node?.left && <RecursiveApproach node={node.left} />}
      {node?.right && <RecursiveApproach node={node.right} />}
    </>
  );
};

export default BinarySearchTreeComponent;
