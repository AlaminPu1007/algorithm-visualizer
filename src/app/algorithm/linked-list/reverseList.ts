import { LINKED_LIST_NODE_START_CX } from '@/app/constant';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { Sleep } from '@/app/lib/sleepMethod';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import React from 'react';

/**
 * Recursively traverses a linked list and highlights each node as it is visited.
 *
 * @param {TreeNode | null} currentNode - The current node to be processed in the list.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>} updateRoot - Function to update the root node for re-rendering.
 * @param {number} delayDuration - The delay in milliseconds to visualize the node traversal.
 *
 * @returns {Promise<void>} - A promise that resolves after all nodes have been processed.
 */
export const traverseLinkedListRecursively = async (
  currentNode: TreeNode | null,
  updateRoot: React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>,
  delayDuration: number
): Promise<void> => {
  // Return early if the node is null
  if (!currentNode) return;

  // Highlight the current node
  updateRoot((previousRoot) => {
    const clonedRoot = JSON.parse(JSON.stringify(previousRoot));
    let nodeIterator: TreeNode | null = clonedRoot as TreeNode;

    while (nodeIterator) {
      // Set the isCurrent property of the current node to true, others to false
      nodeIterator.isCurrent = nodeIterator.id === currentNode.id;
      nodeIterator = nodeIterator.next;
    }
    return clonedRoot;
  });

  // Delay for visualizing the current node
  await Sleep(delayDuration);

  // Reset the current node highlight
  currentNode.isCurrent = false;
  updateRoot((previousRoot) => {
    const clonedRoot = JSON.parse(JSON.stringify(previousRoot));
    let nodeIterator: TreeNode | null = clonedRoot as TreeNode;

    while (nodeIterator) {
      // Reset isCurrent property to false
      if (nodeIterator.id === currentNode.id) {
        nodeIterator.isCurrent = false;
      }
      nodeIterator = nodeIterator.next;
    }
    return clonedRoot;
  });

  // Recursively process the next node
  await traverseLinkedListRecursively(currentNode.next, updateRoot, delayDuration);
};

/**
 * Reverses a linked list and updates the visual position of each node.
 *
 * @param {TreeNode | null} currentNode - The current node to start reversing from.
 * @param {number} totalNodes - The total number of nodes in the list.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>} setReversedList - Function to update the state of the reversed list for re-rendering.
 * @param {number} delayDuration - The delay in milliseconds to visualize each step of reversing.
 *
 * @returns {Promise<TreeNode | null>} - The new head of the reversed list.
 */
export const reverseLinkedListWithPositions = async (
  currentNode: TreeNode | null,
  totalNodes: number,
  setReversedList: React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>,
  delayDuration: number
): Promise<TreeNode | null> => {
  let previousNode: TreeNode | null = null;
  let positionIndex = 0; // Track the position index of nodes
  const nodeSpacing = 25; // Horizontal spacing between each node
  const startXPosition = LINKED_LIST_NODE_START_CX; // Initial x-coordinate for the first node

  // Reverse the linked list and update the position of each node
  while (currentNode) {
    const nextNode = currentNode.next; // Temporarily store the next node

    // Reverse the current node's next pointer
    currentNode.next = previousNode;

    // Update the x-coordinate (cx) of the node based on its new position in the reversed list
    currentNode.cx = startXPosition + (totalNodes - positionIndex - 1) * nodeSpacing;

    // Mark the current node as the target node and update the list
    previousNode = currentNode;
    currentNode.isTarget = true;
    setReversedList(JSON.parse(JSON.stringify(previousNode)));

    // Delay to visualize the node reversal process
    await Sleep(delayDuration);

    // Un-mark the current node and update the list again
    currentNode.isTarget = false;
    setReversedList(JSON.parse(JSON.stringify(previousNode)));

    // Move to the next node in the original list
    currentNode = nextNode;

    // Increment the position index for the next node
    positionIndex++;
  }

  // Return the new head of the reversed linked list
  return previousNode;
};
