import React from 'react';
import { Sleep } from '../../lib/sleepMethod';
import { ITreeNode } from '../../types/TreeTypeProps';

/**
 * Performs a Post-Order Depth First Search (DFS) traversal on a binary tree.
 * This function will visit the left subtree, then the right subtree, and finally the current node.
 * It marks the visited nodes and updates the current traversal step in the state, with a delay to visualize the process.
 *
 * @async
 * @function PostOrderDFSTraversal
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
 * PostOrderDFSTraversal(rootNode, visitedNodes, setCurrentStep, setVisitedNodes, steps);
 */
export const PostOrderDFSTraversal = async (
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
    await PostOrderDFSTraversal(node.left, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);
  }

  // Traverse the right subtree next
  if (node.right) {
    await PostOrderDFSTraversal(node.right, visitedNodes, setCurrentStep, setVisitedNodes, steps, speedRange);
  }

  // Mark the current node as visited if its id is valid
  if (node.id !== null) {
    visitedNodes.add(node.id);
  }

  // Find the current node's index in the steps array and update the current step state
  const nodeIndex = steps.findIndex((stepNode) => stepNode.id === node.id);
  setCurrentStep(nodeIndex);

  // Update the state to reflect the visited nodes
  setVisitedNodes(new Set(visitedNodes));

  // Introduce a delay to visualize the traversal process
  await Sleep(speedRange);
};
