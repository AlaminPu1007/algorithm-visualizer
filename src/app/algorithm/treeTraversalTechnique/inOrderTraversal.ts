import React from 'react';
import { Sleep } from '../../lib/sleepMethod';
import { ITreeNode } from '../../types/TreeTypeProps';

/**
 * Performs an In-Order Depth First Search (DFS) traversal on a binary tree.
 * This function will visit the left subtree first, then the current node, and finally the right subtree.
 * It marks the visited nodes and updates the current traversal step in the state, with a delay to visualize the process.
 *
 * @async
 * @function InOrderDFSTraversal
 * @param {ITreeNode | null} node - The current node to traverse. If null, the traversal stops (base case).
 * @param {Set<number>} visitedNodes - A Set to track the IDs of visited nodes during traversal.
 * @param {React.Dispatch<React.SetStateAction<number>>} setCurrentStep - State setter to update the current node's index during traversal.
 * @param {React.Dispatch<React.SetStateAction<Set<number>>>} setVisitedNodes - State setter to update the set of visited nodes.
 * @param {ITreeNode[]} steps - Array of all nodes representing the traversal steps. Used to determine the current node's index.
 *
 * @returns {Promise<void>} - A promise that resolves once the traversal is complete.
 *
 * @example
 * // Assume a tree with root node, and use state setters to update the current step and visited nodes
 * InOrderDFSTraversal(rootNode, visitedNodes, setCurrentStep, setVisitedNodes, steps);
 */
export const InOrderDFSTraversal = async (
  node: ITreeNode | null,
  visitedNodes: Set<number>,
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
  setVisitedNodes: React.Dispatch<React.SetStateAction<Set<number>>>,
  steps: ITreeNode[],
  speedRange: number
) => {
  // Base case: If the node is null, stop recursion
  if (!node) return;

  // Traverse the left subtree first
  if (node.left) {
    await InOrderDFSTraversal(node.left, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);
  }

  // Mark the current node as visited if its id is valid
  if (node.id !== null) {
    visitedNodes.add(node.id);
  }

  // Update the current step state by finding the node's index in the steps array
  setCurrentStep(steps.indexOf(node));

  // Update the state to reflect the visited nodes
  setVisitedNodes(new Set(visitedNodes));

  // Introduce a delay to visualize the traversal process
  await Sleep(speedRange);

  // Traverse the right subtree next
  if (node.right) {
    await InOrderDFSTraversal(node.right, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);
  }

  // After traversing the right subtree, backtrack to the current node and update the step
  setCurrentStep(steps.indexOf(node));

  // Add another delay to visualize backtracking
  await Sleep(speedRange);
};
