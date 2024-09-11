'use client';

import React, { useEffect, useState } from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { DFS_DELAY, getRandomTreeData, NODE_POSITION } from '@/app/constant';
import { ITreeNode, TreeDFSTraversalProps } from '../types/TreeTypeProps';
import { Tree } from '../data-structure/Tree/TreeNode';
import { clearAllTimeouts, Sleep } from '../lib/sleepMethod';
import { preOrderTraversal } from '../algorithm/treeTraversalTechnique/preOrderTraversal';
import { InOrderDFSTraversal } from '../algorithm/treeTraversalTechnique/inOrderTraversal';
import { PostOrderDFSTraversal } from '../algorithm/treeTraversalTechnique/postOrderTraversal';

interface PageProps {
  speedRange: number;
  childBtnActiveType: string;
}

const TreeDFSTraversal: React.FC<PageProps> = ({ speedRange, childBtnActiveType }) => {
  // define a component local memory
  const [data, setData] = useState<ITreeNode | null>(null);
  const [steps, setSteps] = useState<ITreeNode[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());

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

      // Store collected nodes in the steps state
      setSteps(nodes);
    }

    return () => {
      clearAllTimeouts();
    };
  }, []);

  useEffect(() => {
    let TIME: number = 0;

    if (data && steps?.length) {
      // ensure if already some time is holding, need to clear them
      clearAllTimeouts();
      TIME = window.setTimeout(() => {
        if (childBtnActiveType === 'pre-order') {
          performDFSMethod();
        } else if (childBtnActiveType === 'in-order') {
          inOrderTechniqueBtnMethod();
        } else if (childBtnActiveType === 'post-order') {
          postOrderTechniqueBtnMethod();
        }
      }, 200);
    }

    return () => clearTimeout(TIME);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, data, childBtnActiveType]);

  /**
   * Performs a Pre-Order Depth First Search (DFS) traversal of the tree.
   *
   * This method sets the active root button type to 'dfs', clears any timeouts,
   * and initiates the pre-order DFS traversal on the tree. Once the traversal is complete,
   * it resets the current step and visited nodes to their default state.
   *
   * @async
   * @function performDFSMethod
   * @returns {Promise<void>} A promise that resolves when the traversal is complete.
   */
  const performDFSMethod = async () => {
    if (data) {
      // Clear any existing timeouts
      clearAllTimeouts();

      const visitedNodes = new Set<number>();
      // Perform pre-order traversal
      await preOrderTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);

      // Reset current step and visited nodes
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  /**
   * Performs an In-Order Depth First Search (DFS) traversal of the tree.
   *
   * This method sets the child button type to 'in-order', clears any timeouts,
   * and resets states. It then performs the in-order traversal and resets the states
   * after traversal is complete.
   *
   * @async
   * @function inOrderTechniqueBtnMethod
   * @returns {Promise<void>} A promise that resolves when the traversal is complete.
   */
  const inOrderTechniqueBtnMethod = async () => {
    if (data) {
      // Clear any existing timeouts
      clearAllTimeouts();
      // Reset current step and visited nodes
      setCurrentStep(-1);
      setVisitedNodes(new Set());

      // Add a delay before starting the traversal
      await Sleep(DFS_DELAY);

      const visitedNodes = new Set<number>();
      // Perform in-order traversal
      await InOrderDFSTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);

      // Reset current step and visited nodes after traversal
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  /**
   * Performs a Post-Order Depth First Search (DFS) traversal of the tree.
   *
   * This method sets the child button type to 'post-order', clears any timeouts,
   * and resets states. It performs the post-order traversal and resets the states
   * once traversal is complete.
   *
   * @async
   * @function postOrderTechniqueBtnMethod
   * @returns {Promise<void>} A promise that resolves when the traversal is complete.
   */
  const postOrderTechniqueBtnMethod = async () => {
    if (data) {
      // Clear any existing timeouts
      clearAllTimeouts();
      // Reset current step and visited nodes
      setCurrentStep(-1);
      setVisitedNodes(new Set());

      // Add a delay before starting the traversal
      await Sleep(DFS_DELAY);

      const visitedNodes = new Set<number>();
      // Perform post-order traversal
      await PostOrderDFSTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);

      // Reset current step and visited nodes after traversal
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  return (
    <>
      <svg viewBox='-20 20 280 138'>
        <RecursiveApproach root={data} steps={steps} currentStep={currentStep} visitedNodes={visitedNodes} />
      </svg>
    </>
  );
};

export default TreeDFSTraversal;

const RecursiveApproach: React.FC<TreeDFSTraversalProps> = ({ root, steps, currentStep, visitedNodes }) => {
  if (!root || steps.indexOf(root) === -1) return null;

  const isCurrentNode = steps.indexOf(root) === currentStep;
  const isVisited = visitedNodes.has(root.id!);

  return (
    <g key={root.id}>
      {root.parent &&
        (() => {
          const linePos = calculateLinePosition(root.parent.cx!, root.parent.cy!, root.cx!, root.cy!, NODE_POSITION);
          return (
            <>
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
            </>
          );
        })()}
      <circle
        cx={root.cx!}
        cy={root.cy!}
        r={NODE_POSITION}
        fill={isCurrentNode ? 'red' : isVisited ? '#3B9400' : 'white'}
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

      {root.left && (
        <RecursiveApproach root={root.left} steps={steps} currentStep={currentStep} visitedNodes={visitedNodes} />
      )}
      {root.right && (
        <RecursiveApproach root={root.right} steps={steps} currentStep={currentStep} visitedNodes={visitedNodes} />
      )}
    </g>
  );
};
