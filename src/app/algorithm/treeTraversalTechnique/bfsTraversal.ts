import { TreeNode } from '@/app/data-structure/Tree/Node';
import { Sleep } from '@/app/lib/sleepMethod';
import React from 'react';

/**
 * Performs a Breadth-First Search (BFS) traversal on a binary tree.
 * BFS visits each node level by level, starting from the root, and moving horizontally.
 * The function uses a queue to explore nodes and updates the state to trigger re-renders for visualization.
 *
 * @async
 * @function traverseBFS
 * @param {TreeNode | null} root - The root node of the binary tree. If null, the traversal doesn't start.
 * @param {TreeNode | null} currentNode - The current node being visited during traversal.
 * @param {React.Dispatch<React.SetStateAction<TreeNode | null>>} setCurrentNode - State setter to update the current node being visited.
 * @param {React.Dispatch<React.SetStateAction<Set<number>>>} setVisitedNodes - State setter to update the set of visited nodes by their IDs.
 * @param {React.Dispatch<React.SetStateAction<TreeNode[]>>} setCurrentNodes - State setter to update the nodes being visited during BFS for visualization.
 *
 * @returns {Promise<void>} - A promise that resolves once the traversal is complete.
 *
 * @example
 * // Call BFS traversal starting from the root node and update states for visualization
 * traverseBFS(rootNode, null, setCurrentNode, setVisitedNodes, setCurrentNodes);
 */
export const traverseBFS = async (
  root: TreeNode | null,
  currentNode: TreeNode | null,
  setCurrentNode: React.Dispatch<React.SetStateAction<TreeNode | null>>,
  setVisitedNodes: React.Dispatch<React.SetStateAction<Set<number>>>,
  setCurrentNodes: React.Dispatch<React.SetStateAction<TreeNode[]>>,
  speedRange: number
) => {
  // Queue to manage the BFS order
  const queue = [root];
  // Array to keep track of the nodes visited in BFS order
  const bfsNodes: TreeNode[] = [];

  // Traverse nodes in a level-wise manner
  while (queue.length > 0) {
    // Dequeue the first node
    const currentNode = queue.shift()!;
    bfsNodes.push(currentNode);

    // Update the current node for visualization purposes
    setCurrentNode(currentNode);

    // Mark the node as visited and update the visited nodes set
    setVisitedNodes((prevVisitedNodes) => new Set(prevVisitedNodes).add(currentNode.id!));
    setCurrentNodes([...bfsNodes]);

    // Introduce a delay to visualize the BFS traversal step by step
    await Sleep(speedRange);

    // Enqueue the left and right children for future traversal
    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);
  }

  // Reset the current node once traversal is complete
  setCurrentNode(null);

  // Additional delay to show the last node before resetting the visited nodes
  await Sleep(speedRange * 3);

  // Reset the visited nodes set after the traversal is done
  setVisitedNodes(new Set());
};
