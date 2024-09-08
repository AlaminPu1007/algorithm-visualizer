/**
 * A Root tree structure is defined here. This will return a svg after create a Tree structure.
 * @component - A React component
 */
'use client';

import { DFS_DELAY, getRandomTreeData } from '@/app/constant';
import React, { useState, useEffect } from 'react';
import { Tree } from '@/app/data-structure/Tree/TreeNode';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import TreeDFSTraversal from '@/app/utils/TreeDFSTraversal';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import TreeBFSTraversal from '@/app/utils/TreeBFSTraversal';
import { InOrderDFSTraversal } from '@/app/algorithm/treeTraversalTechnique/inOrderTraversal';
import { PostOrderDFSTraversal } from '@/app/algorithm/treeTraversalTechnique/postOrderTraversal';
import { preOrderTraversal } from '@/app/algorithm/treeTraversalTechnique/preOrderTraversal';

const TreeComponent = () => {
  // define a component local memory
  const [data, setData] = useState<ITreeNode | null>(null);
  const [steps, setSteps] = useState<ITreeNode[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [activeRootBtnType, setActiveRootBtnType] = useState<string>('');
  const [childBtnActiveType, setChildBtnActiveType] = useState<string>('pre-order');
  const [randomKey, setRandomKey] = useState<number>(0);

  useEffect(() => {
    /**
     * Initializes the tree with random data and collects nodes in an in-order traversal manner.
     *
     * The new tree data is generated using `getRandomTreeData(31)` and then processed to extract
     * all nodes in an in-order traversal. The nodes are collected and stored in the `steps` state.
     */
    const newTree = new Tree(JSON.parse(JSON.stringify(getRandomTreeData(31))));

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
  }, []);

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
    // Set the button type to 'dfs'
    setActiveRootBtnType('dfs');

    if (data) {
      // Clear any existing timeouts
      clearAllTimeouts();

      const visitedNodes = new Set<number>();
      // Perform pre-order traversal
      await preOrderTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps);

      // Reset current step and visited nodes
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  /**
   * Initializes and triggers a Breadth-First Search (BFS) traversal of the tree.
   *
   * This method sets the active root button type to 'bfs', generates a random key,
   * and resets the visualization states.
   *
   * @function performBFSMethod
   * @returns {void}
   */
  const performBFSMethod = () => {
    // Set the button type to 'bfs'
    setActiveRootBtnType('bfs');
    // Generate a random key to trigger re-render
    setRandomKey(Math.random() * 9999);
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
    // Set the button type to 'in-order'
    setChildBtnActiveType('in-order');

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
      await InOrderDFSTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps);

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
    // Set the button type to 'post-order'
    setChildBtnActiveType('post-order');

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
      await PostOrderDFSTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps);

      // Reset current step and visited nodes after traversal
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
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
        {activeRootBtnType === 'dfs' ? (
          <div>
            <button
              onClick={() => {
                setChildBtnActiveType('pre-order');
                performDFSMethod();
              }}
              className={`child-btn ${childBtnActiveType === 'pre-order' ? 'active-child-btn' : ''}`}
            >
              Pre Order
            </button>
            <button
              onClick={inOrderTechniqueBtnMethod}
              className={`child-btn mx-2 ${childBtnActiveType === 'in-order' ? 'active-child-btn' : ''}`}
            >
              In Order
            </button>
            <button
              onClick={postOrderTechniqueBtnMethod}
              className={`child-btn ${childBtnActiveType === 'post-order' ? 'active-child-btn' : ''}`}
            >
              Post Order
            </button>
          </div>
        ) : null}
      </div>

      <div>
        {data ? (
          <svg viewBox='-20 20 280 150'>
            {activeRootBtnType === 'dfs' ? (
              <TreeDFSTraversal root={data} steps={steps} currentStep={currentStep} visitedNodes={visitedNodes} />
            ) : activeRootBtnType === 'bfs' ? (
              <TreeBFSTraversal root={data} key={randomKey} />
            ) : (
              <TreeDFSTraversal root={data} steps={steps} currentStep={currentStep} visitedNodes={visitedNodes} />
            )}
          </svg>
        ) : (
          <div className='flex min-h-[200px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeComponent;
