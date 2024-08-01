/**
 * A Root tree structure is defined here. This will return a svg after create a Tree structure.
 */
'use client';

import { DFS_DELAY, NODE_POSITION, Sleep } from '@/app/constant';
import React, { useState, useEffect } from 'react';

import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { calculateLinePosition } from '@/app/utils/reusable-method/calculateSvgLinePosition';
import { ITreeNode } from '@/app/data-structure/Tree/Node';

const TreeComponent = () => {
  // define a component local memory
  const [data, setData] = useState<ITreeNode>();

  const [steps, setSteps] = useState<ITreeNode[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newTree = new Tree();
    newTree.insertIntoList();

    if (newTree?.head) {
      setData(newTree.head);

      // recursively put each node in (In-order traversal manner).
      const nodes: ITreeNode[] = [];
      const collectNodes = (node: ITreeNode | null) => {
        if (node) {
          nodes.push(node);
          collectNodes(node.left);
          collectNodes(node.right);
        }
      };
      collectNodes(newTree.head);
      setSteps(nodes);
    }
  }, []);

  const updateTreeRecursively = async (
    node: ITreeNode | null,
    visitedNodes: Set<number>
  ) => {
    // handle the base case
    if (!node) return;

    // mark this node as visited
    if (node.id !== null) {
      visitedNodes.add(node.id);
    }

    // Mark the current node
    setCurrentStep(steps.indexOf(node));

    // update state of visited
    setVisitedNodes(new Set(visitedNodes));

    // wait until completed the current node
    await Sleep(DFS_DELAY);

    // Traverse left subtree
    if (node.left) {
      await updateTreeRecursively(node.left, visitedNodes);
    }

    // Backtrack to current node
    setCurrentStep(steps.indexOf(node));
    await Sleep(DFS_DELAY);

    // Traverse right subtree
    if (node.right) {
      await updateTreeRecursively(node.right, visitedNodes);
    }

    // Backtrack to current node
    setCurrentStep(steps.indexOf(node));
    await Sleep(DFS_DELAY);
  };

  const handleButtonClick = async () => {
    if (data) {
      const visitedNodes = new Set<number>();
      await updateTreeRecursively(data, visitedNodes);

      // initialized with default value
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  /**
   * A recursive approach to render the linked-list.
   */
  const renderNode = (root: ITreeNode) => {
    if (!root || steps.indexOf(root) === -1) return null;

    // get current node
    const isCurrentNode: boolean = Boolean(steps.indexOf(root) === currentStep);

    // is visited node
    const isVisited: boolean = Boolean(visitedNodes.has(root.id!));

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
                  stroke={
                    isCurrentNode
                      ? 'green' // Current node color
                      : isVisited
                        ? 'red' // Visited node color
                        : 'black'
                  }
                  strokeWidth={'0.3'}
                >
                  <animate
                    attributeName='stroke-dasharray'
                    attributeType='XML'
                    from='0 9.375' //from='0 79.375'
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
          fill={
            isCurrentNode
              ? 'cyan' // Current node color
              : isVisited
                ? '#3B9400' // Visited node color
                : 'white'
          }
          stroke={isCurrentNode ? 'white' : 'black'}
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
          fill={`${visitedNodes.has(root.id!) ? 'white' : 'black'}`}
        >
          {root?.value || -1}
        </text>

        {/* called it's left child if it's present */}
        {root.left && renderNode(root.left)}

        {/* called it's right child if it's present */}
        {root.right && renderNode(root.right)}
      </g>
    );
  };

  return (
    <div className=''>
      <button
        onClick={handleButtonClick}
        className='mb-2 h-10 w-[120px] border bg-green-500 text-white'
      >
        DFS
      </button>
      <div className=''>
        <svg viewBox='0 20 240 150'>{data && renderNode(data)}</svg>
      </div>
    </div>
  );
};

export default TreeComponent;
