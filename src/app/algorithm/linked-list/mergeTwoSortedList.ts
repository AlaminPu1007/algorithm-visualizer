import { LINKED_LIST_NODE_START_CY } from '@/app/constant';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { Sleep } from '@/app/lib/sleepMethod';
import React from 'react';

/**
 * Visualizes the current node in the given list by setting the isCurrent flag.
 * @async
 * @param {TreeNode} node - The current node to visualize.
 * @param {Function} setListState - The state setter function for the list (setListOne or setListTwo).
 * @returns {Promise<void>}
 */
export const visualizeCurrentNode = async (
  node: TreeNode,
  setListState: React.Dispatch<React.SetStateAction<TreeNode | null | undefined>>,
  speedRange: number
): Promise<void> => {
  setListState((previousList: TreeNode | null | undefined) => {
    const clonedList = JSON.parse(JSON.stringify(previousList));
    let currentNode: TreeNode | null = clonedList;

    while (currentNode) {
      currentNode.isCurrent = currentNode.id === node.id; // Highlight the current node
      currentNode = currentNode.next;
    }

    return clonedList;
  });

  await Sleep(speedRange); // Delay for visualization

  // Reset the isCurrent flag after visualization
  setListState((previousList: TreeNode | null | undefined) => {
    const clonedList = JSON.parse(JSON.stringify(previousList));
    let currentNode: TreeNode | null = clonedList;

    while (currentNode) {
      currentNode.isCurrent = false; // Reset all nodes to not current
      currentNode = currentNode.next;
    }

    return clonedList;
  });
};

/**
 * Processes the remaining nodes in a list and merges them into the merged list.
 * @async
 * @param {TreeNode} remainingList - The remaining nodes to process.
 * @param {Function} setListState - The state setter function for the list (setListOne or setListTwo).
 * @param {TreeNode | null} mergedListTail - The current tail of the merged list.
 * @param {number} currentXPosition - The current X position for placing the nodes.
 * @param {TreeNode} dummyHeadNode - The dummy head node for the merged list.
 * @returns {Promise<void>}
 */
export const processRemainingNodes = async (
  remainingList: TreeNode | null,
  setListState: React.Dispatch<React.SetStateAction<TreeNode | null | undefined>>,
  mergedListTail: TreeNode | null,
  currentXPosition: number,
  dummyHeadNode: TreeNode,
  speedRange: number,
  setReverseNodes: React.Dispatch<React.SetStateAction<TreeNode | null | undefined>>
): Promise<void> => {
  while (remainingList) {
    await visualizeCurrentNode(remainingList, setListState, speedRange);

    remainingList.cx = currentXPosition;
    remainingList.cy = LINKED_LIST_NODE_START_CY;

    mergedListTail!.next = { ...remainingList, next: null }; // Safely assign the next node
    mergedListTail = mergedListTail!.next; // Advance the merged list tail
    remainingList = remainingList.next; // Move to the next node

    currentXPosition += 25; // Increment the position for the next node

    if (mergedListTail) {
      mergedListTail.isTarget = true; // Mark as target for visualization
    }

    setReverseNodes(() => ({ ...(dummyHeadNode.next as TreeNode) })); // Update the merged list visualization
    await Sleep(speedRange); // Add delay for visualization
  }
};

/**
 * Resets the status of all nodes in a list by clearing the isCurrent flag.
 * @param {Function} setListState - The state setter function for the list (setListOne or setListTwo).
 */
export const resetNodeStatus = (
  setListState: React.Dispatch<React.SetStateAction<TreeNode | null | undefined>>
): void => {
  setListState((previousList: TreeNode | null | undefined) => {
    const clonedList = JSON.parse(JSON.stringify(previousList));
    let currentNode: TreeNode | null = clonedList;

    while (currentNode) {
      currentNode.isCurrent = false; // Reset all nodes to not current
      currentNode = currentNode.next;
    }

    return clonedList;
  });
};
