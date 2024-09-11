'use client';

import React, { useEffect, useState } from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { getRandomTreeData, NODE_POSITION } from '@/app/constant';
import { TreeNode } from '../data-structure/Tree/Node';
import { ITreeNode } from '../types/TreeTypeProps';
import { traverseBFS } from '../algorithm/treeTraversalTechnique/bfsTraversal';
import { clearAllTimeouts } from '../lib/sleepMethod';
import { Tree } from '../data-structure/Tree/TreeNode';

const TreeBFSTraversal: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  const [currentNodes, setCurrentNodes] = useState<TreeNode[]>([]);
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [data, setData] = useState<ITreeNode | null>(null);

  useEffect(() => {
    /**
     * Initializes the tree with random data and collects nodes in an in-order traversal manner.
     *
     * The new tree data is generated using `getRandomTreeData(31)` and then processed to extract
     * all nodes in an in-order traversal. The nodes are collected and stored in the `steps` state.
     */
    const newTree = new Tree(JSON.parse(JSON.stringify(getRandomTreeData(31))));
    // created a valid tree
    newTree.insertIntoList();

    if (newTree?.head) {
      // Set the tree data to state
      setData(newTree.head);
    }

    return () => {
      clearAllTimeouts();
    };
  }, []);

  useEffect(() => {
    if (data) {
      traverseBFS(data, currentNode, setCurrentNode, setVisitedNodes, setCurrentNodes, speedRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <svg viewBox='-20 20 280 138'>
        <RecursiveApproach currentNodes={currentNodes} currentNode={currentNode} visitedNodes={visitedNodes} />
      </svg>
    </>
  );
};

export default TreeBFSTraversal;

interface TreeBFSRecursiveTraversalProps {
  currentNodes: TreeNode[];
  currentNode: TreeNode | null;
  visitedNodes: Set<number>;
}

const RecursiveApproach: React.FC<TreeBFSRecursiveTraversalProps> = ({ currentNodes, currentNode, visitedNodes }) => {
  return (
    <>
      {currentNodes.map((node) => {
        const isCurrentNode = node === currentNode;
        const isVisited = visitedNodes.has(node.id!);
        return (
          <g key={node.id}>
            {node.parent &&
              (() => {
                const linePos = calculateLinePosition(
                  node.parent.cx!,
                  node.parent.cy!,
                  node.cx!,
                  node.cy!,
                  NODE_POSITION
                );
                return (
                  <line
                    x1={linePos.startX}
                    y1={linePos.startY}
                    x2={linePos.endX}
                    y2={linePos.endY}
                    stroke={isCurrentNode ? 'red' : isVisited ? 'green' : 'black'}
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
              fill={isCurrentNode ? 'red' : isVisited ? '#3B9400' : 'white'}
              stroke={isCurrentNode ? 'white' : 'black'}
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
              fill={`${isVisited ? 'white' : 'black'}`}
            >
              {node?.value || -1}
            </text>
          </g>
        );
      })}
    </>
  );
};
