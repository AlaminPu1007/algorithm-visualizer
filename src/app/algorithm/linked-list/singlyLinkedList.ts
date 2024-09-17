import { TreeNode } from '@/app/data-structure/Tree/Node';
import { appendToMapWithNewValue } from '@/app/lib/mapUtils';
import { Sleep } from '@/app/lib/sleepMethod';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import React from 'react';

/**
 * Asynchronously inserts a new node into a tree structure at the specified position.
 * The tree structure is updated visually with an animation using a delay based on the speedRange.
 * Also, updates a Map with new values and adjusts the cx and cy (coordinate) values of nodes.
 *
 * @param {TreeNode} root - The root of the tree structure.
 * @param {number} value - The value of the new node to be inserted.
 * @param {number} position - The 1-based position to insert the new node.
 * @param {number} speedRange - The speed (in ms) for visualizing the node insertion.
 * @param {Map<number, number>} dataMap - A map storing key-value pairs for the tree nodes.
 * @param {React.Dispatch<React.SetStateAction<Map<number, number>>>} setDataMap - A function to update the dataMap state.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>} setRoot - A function to update the root node state.
 *
 * @returns {Promise<TreeNode>} The updated root node of the tree structure.
 */
export const updateTreeToInsertData = async (
  root: TreeNode,
  value: number,
  position: number,
  speedRange: number,
  dataMap: Map<number, number>,
  setDataMap: React.Dispatch<React.SetStateAction<Map<number, number>>>,
  setRoot: React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>
): Promise<TreeNode> => {
  let currentRoot: TreeNode | null = root;
  const newNode = new TreeNode(value);
  newNode.cx = 20;
  newNode.cy = 20;

  // Insert the new value into the map
  setDataMap(appendToMapWithNewValue(dataMap, value, value));

  // If the position is 1, insert the node as the new head
  if (position === 1) {
    currentRoot.isInsertedPosition = true;
    setRoot({ ...currentRoot });

    await Sleep(speedRange);

    currentRoot.isInsertedPosition = false;
    setRoot({ ...currentRoot });

    newNode.next = currentRoot;
    currentRoot = newNode;

    // Adjust the cx values of the shifted nodes
    let currentNode: TreeNode | null = newNode.next;
    while (currentNode) {
      currentNode.cx = (currentNode.cx || 0) + 25;
      currentNode = currentNode.next;
    }

    return currentRoot;
  } else {
    let previousNode: TreeNode | null = null;
    let currentNode: TreeNode | null = currentRoot;
    let remainingSteps = position - 1;

    // Traverse to the target position
    while (remainingSteps-- > 0 && currentNode) {
      currentNode.isCurrent = true;
      setRoot({ ...root });

      await Sleep(speedRange);

      currentNode.isCurrent = false;
      setRoot({ ...root });

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    // Ensure the position is valid for insertion
    if (previousNode && remainingSteps < 0) {
      if (currentNode) {
        currentNode.isInsertedPosition = true;
        setRoot({ ...root });

        await Sleep(speedRange);

        currentNode.isInsertedPosition = false;
        setRoot({ ...root });
      }

      // Insert the new node between previousNode and currentNode
      newNode.next = currentNode;
      previousNode.next = newNode;

      // Set the coordinates for the new node
      if (currentNode) {
        newNode.cx = currentNode.cx || 25;
        newNode.cy = currentNode.cy || 20;
      } else {
        newNode.cx = (previousNode.cx || 0) + 25;
        newNode.cy = previousNode.cy || 20;
      }

      // Adjust the cx values for all subsequent nodes
      let nextNode: TreeNode | null = newNode.next;
      while (nextNode) {
        nextNode.cx = (nextNode.cx || 0) + 25;
        nextNode = nextNode.next;
      }
    } else if (!currentNode && position > 1) {
      // If the position exceeds the list size, append the new node at the end
      previousNode!.next = newNode;
      newNode.cx = (previousNode!.cx || 0) + 25;
    }

    return root; // Return the updated root node
  }
};
