/**
 * A Root tree structure is defined here. This will return a svg after create a Tree structure.
 */
'use client';

import { DFS_DELAY } from '@/app/constant';
import React, { useState, useEffect } from 'react';

import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import TreeDFSTraversal from '@/app/utils/TreeDFSTraversal';
import { ITreeNode } from '@/app/types/TreeTypeProps';

const TreeComponent = () => {
  // define a component local memory
  const [data, setData] = useState<ITreeNode>();
  const [steps, setSteps] = useState<ITreeNode[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [activeRootBtnType, setActiveRootBtnType] = useState<string>('');

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

  /**
   * Perform a DFS traversal
   *
   * @async an async method to called recursive approach
   * @returns {void}
   */
  const performDFSMethod = async () => {
    // update button type as well
    setActiveRootBtnType('dfs');

    if (data) {
      // clear time out if it's present
      clearAllTimeouts();

      const visitedNodes = new Set<number>();
      await updateTreeRecursively(data, visitedNodes);

      // initialized with default value
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  /**
   * Perform a BFS traversal
   *
   * @async an async method to called recursive approach
   * @returns {void}
   */
  const performBFSMethod = async () => {
    // update button type as well
    setActiveRootBtnType('bfs');

    // clear all bfs method if it's running
    clearAllTimeouts();
    setCurrentStep(-1);
    setVisitedNodes(new Set());
  };

  return (
    <div className=''>
      <div className='item-center flex justify-between'>
        <div className='flex'>
          <button
            onClick={performDFSMethod}
            className={`root-btn ${activeRootBtnType === 'dfs' ? 'active-root-btn' : ''}`}
          >
            DFS
          </button>
          <button
            className={`root-btn ml-2 ${activeRootBtnType === 'bfs' ? 'active-root-btn' : ''}`}
            onClick={performBFSMethod}
          >
            BFS
          </button>
        </div>
        <div>
          <button className='rounded-sm border bg-blue-500 px-3 py-1 text-sm text-white'>
            Pre Order
          </button>
          <button className='mx-3 rounded-sm border bg-blue-500 px-3 py-1 text-sm text-white'>
            In Order
          </button>
          <button className='rounded-sm border bg-blue-500 px-3 py-1 text-sm text-white'>
            Post Order
          </button>
        </div>
      </div>

      <div className=''>
        <svg viewBox='0 20 280 150'>
          {data && (
            <TreeDFSTraversal
              root={data}
              steps={steps}
              currentStep={currentStep}
              visitedNodes={visitedNodes}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default TreeComponent;
