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
import { PostOrderDFSTraversal } from '@/app/algorithm/treePostOrderTraversal';

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
    const newTree = new Tree(JSON.parse(JSON.stringify(getRandomTreeData(31))));

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

  /**
   * A recursive approach to traverse the tree (Pre-order[ex: root, left, right])
   *
   * @async
   * @param {(ITreeNode | null)} node
   * @param {Set<number>} visitedNodes
   * @returns {void}
   */
  const updateTreeRecursively = async (node: ITreeNode | null, visitedNodes: Set<number>) => {
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
  const performBFSMethod = () => {
    // update button type as well
    setActiveRootBtnType('bfs');
    // update key value
    setRandomKey(Math.random() * 9999);
  };

  // active button as per as in-order clicked
  const inOrderTechniqueBtnMethod = async () => {
    setChildBtnActiveType('in-order');

    if (data) {
      // clear time out if it's present
      clearAllTimeouts();
      setCurrentStep(-1);
      setVisitedNodes(new Set());

      await Sleep(DFS_DELAY);

      const visitedNodes = new Set<number>();
      await InOrderDFSTraversal(data, visitedNodes);

      // initialized with default value
      setCurrentStep(-1);
      setVisitedNodes(new Set());
    }
  };

  /**
   * Perform a in-order traversal
   */
  const InOrderDFSTraversal = async (node: ITreeNode | null, visitedNodes: Set<number>) => {
    // handle the base case
    if (!node) return;

    // Traverse left subtree
    if (node.left) {
      await InOrderDFSTraversal(node.left, visitedNodes);
    }

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

    // Traverse right subtree
    if (node.right) {
      await InOrderDFSTraversal(node.right, visitedNodes);
    }

    // Backtrack to current node
    setCurrentStep(steps.indexOf(node));
    await Sleep(DFS_DELAY);
  };

  // active button as per as in-order clicked
  const postOrderTechniqueBtnMethod = async () => {
    setChildBtnActiveType('post-order');

    if (data) {
      // clear time out if it's present
      clearAllTimeouts();
      setCurrentStep(-1);
      setVisitedNodes(new Set());

      await Sleep(DFS_DELAY);

      const visitedNodes = new Set<number>();
      await PostOrderDFSTraversal(data, visitedNodes, setCurrentStep, setVisitedNodes, steps);

      // initialized with default value
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
