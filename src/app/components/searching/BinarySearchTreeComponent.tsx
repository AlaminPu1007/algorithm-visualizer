'use client';

import React, { useEffect, useState } from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { getRandomTreeData, NODE_POSITION } from '@/app/constant';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';

const ARRAY_SIZE = 31;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BinarySearchTreeComponent: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  // define component local state
  const [data, setData] = useState<ITreeNode | null>(null);
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    /**
     * Initializes the tree with random data and collects nodes in an in-order traversal manner.
     *
     * The new tree data is generated using `getRandomTreeData(31)` and then processed to extract
     * all nodes in an in-order traversal. The nodes are collected and stored in the `steps` state.
     */
    const tempArr = JSON.parse(JSON.stringify(getRandomTreeData(ARRAY_SIZE)));
    // store the target item
    setTarget(tempArr[Math.floor(Math.random() * 31 + 1)]);
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

  const performBST = async () => {
    try {
      if (!data) return;

      const updatedData = { ...data }; // Clone the data to force re-render

      // Helper function to perform binary search in BST
      const searchBST = async (node: ITreeNode | null, target: number) => {
        if (!node) return null;

        // Update the node's status and trigger a state update
        node.isCurrent = true;
        setData({ ...updatedData }); // Trigger re-render with updated node
        await Sleep(speedRange);

        if (node.value === target) return node;

        if (target < Number(node.value)) {
          markInvalid(node.right);
          setData({ ...updatedData });
          await Sleep(speedRange);

          return await searchBST(node.left, target);
        } else {
          markInvalid(node.left);
          setData({ ...updatedData });
          await Sleep(speedRange);

          return await searchBST(node.right, target);
        }
      };

      // Start the search from the root
      await searchBST(updatedData, target);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error, 'from bst cath error');
      }
    }
  };

  const markInvalid = async (node: ITreeNode | null) => {
    if (!node) return;

    node.isInvalid = true;

    if (node.left) markInvalid(node.left);
    if (node.right) markInvalid(node.right);
  };

  return (
    <>
      <button onClick={performBST}>CLICK</button>
      <p className='m-0 mt-2 p-0 text-center text-lg font-medium sm:text-start md:mt-0 md:text-xl'>
        TARGET : <span className='text-red-500'>{target}</span>
      </p>
      <svg viewBox='-20 20 280 138'>
        <RecursiveApproach node={data} />
      </svg>
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
                stroke={node.isCurrent ? 'red' : node.isInvalid ? 'orange' : 'black'}
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
          fill={node.isCurrent ? 'red' : node.isInvalid ? 'orange' : 'white'}
          stroke={node.isCurrent ? 'white' : 'black'}
          strokeWidth={'0.2'}
        >
          <animate attributeName='r' from='4' to={5} dur='1s' begin={'0s'} />
        </circle>
        <text x={node.cx!} y={node.cy!} dy={2} textAnchor='middle' className='text-center text-[4px]' fill={`'black`}>
          {node?.value || -1}
        </text>
      </g>
      {node?.left && <RecursiveApproach node={node.left} />}
      {node?.right && <RecursiveApproach node={node.right} />}
    </>
  );
};

export default BinarySearchTreeComponent;
