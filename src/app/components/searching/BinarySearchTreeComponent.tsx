'use client';

import React, { useEffect, useState } from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { getRandomTreeData, NODE_POSITION } from '@/app/constant';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BinarySearchTreeComponent: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  // define component local state
  const [data, setData] = useState<ITreeNode | null>(null);

  useEffect(() => {
    /**
     * Initializes the tree with random data and collects nodes in an in-order traversal manner.
     *
     * The new tree data is generated using `getRandomTreeData(31)` and then processed to extract
     * all nodes in an in-order traversal. The nodes are collected and stored in the `steps` state.
     */
    const newTree = new Tree(JSON.parse(JSON.stringify(getRandomTreeData(31))));
    // create a valid BST
    newTree.createBalancedBST();

    if (newTree?.head) {
      // Set the tree data to state
      setData(newTree.head);

      // Recursively collect each node in an in-order traversal manner
      const nodes: ITreeNode[] = [];
      const collectNodes = (node: ITreeNode | null) => {
        if (node) {
          nodes.push(node);
          collectNodes(node.left);
          collectNodes(node.right);
        }
      };
      collectNodes(newTree.head);
    }

    return () => {
      clearAllTimeouts();
    };
  }, []);

  return (
    <>
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
                stroke={'black'}
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
        <circle cx={node.cx!} cy={node.cy!} r={NODE_POSITION} fill={'#fff'} stroke={'black'} strokeWidth={'0.2'}>
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
