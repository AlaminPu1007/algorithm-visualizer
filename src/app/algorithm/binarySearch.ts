import React from 'react';
import { Sleep } from '../lib/sleepMethod';
import { ITreeNode } from '../types/TreeTypeProps';

/**
 * Performs a binary search on a binary search tree (BST) and visually updates the state at each step of the search.
 * This function highlights the current node being searched and marks nodes that are not part of the search path.
 *
 * @async
 * @function performBST
 * @param {ITreeNode | null} data - The root node of the binary search tree. Can be `null` if the tree is empty.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode | null>>} setData - Function to update the state of the tree data.
 * @param {number} speedRange - The delay time (in milliseconds) between each step of the search for visualization purposes.
 * @param {number} target - The value to search for in the binary search tree.
 *
 * @returns {Promise<void>} A promise that resolves after the search is completed or rejected in case of an error.
 */
export const performBST = async (
  data: ITreeNode | null,
  setData: React.Dispatch<React.SetStateAction<ITreeNode | null>>,
  speedRange: number,
  target: number
): Promise<void> => {
  try {
    // Return if the tree is empty
    if (!data) return;

    // Clone the data to avoid directly mutating the state
    const updatedData = { ...data };

    /**
     * Helper function that recursively searches the BST for the target value.
     *
     * @async
     * @function searchBST
     * @param {ITreeNode | null} node - The current node being searched.
     * @param {number} target - The target value to find in the tree.
     * @returns {Promise<ITreeNode | null>} The node containing the target value, or `null` if not found.
     */
    const searchBST = async (node: ITreeNode | null, target: number): Promise<ITreeNode | null> => {
      if (!node) return null;

      // Mark the current node as being actively searched
      node.isCurrent = true;
      setData({ ...updatedData }); // Trigger a re-render to visually update the node
      await Sleep(speedRange); // Pause to visualize the step

      // If the current node's value matches the target, mark it as the target
      if (node.value === target) {
        node.isCurrent = false;
        node.isTarget = true;
        setData({ ...updatedData });
        await Sleep(speedRange); // Pause to visualize the step

        return node;
      }

      // If the target value is smaller than the current node, search the left subtree
      if (target < Number(node.value)) {
        markInvalid(node.right); // Mark the right subtree as invalid
        setData({ ...updatedData });
        await Sleep(speedRange); // Pause to visualize the step

        return await searchBST(node.left, target);
      }
      // Otherwise, search the right subtree
      else {
        markInvalid(node.left); // Mark the left subtree as invalid
        setData({ ...updatedData });
        await Sleep(speedRange); // Pause to visualize the step

        return await searchBST(node.right, target);
      }
    };

    // Start the binary search from the root node
    await searchBST(updatedData, target);
  } catch (error) {
    // Log the error only during development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error, 'from bst catch error');
    }
  }
};

/**
 * Marks a node and its subtrees as invalid during the binary search.
 * This visually indicates that the node is not part of the correct search path.
 *
 * @async
 * @function markInvalid
 * @param {ITreeNode | null} node - The node to mark as invalid. If `null`, the function returns immediately.
 */
const markInvalid = async (node: ITreeNode | null): Promise<void> => {
  if (!node) return;

  // Mark the node as invalid
  node.isInvalid = true;

  // Recursively mark the left and right subtrees as invalid
  if (node.left) markInvalid(node.left);
  if (node.right) markInvalid(node.right);
};
