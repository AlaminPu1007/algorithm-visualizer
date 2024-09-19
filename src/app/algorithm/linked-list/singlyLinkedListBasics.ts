import { LINKED_LIST_NODE_START_CX, LINKED_LIST_NODE_START_CY } from '@/app/constant';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { deleteKey } from '@/app/lib/mapUtils';
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
  setRoot: React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>
): Promise<TreeNode> => {
  let currentRoot: TreeNode | null = root;
  const newNode = new TreeNode(value);
  newNode.cx = LINKED_LIST_NODE_START_CX;
  newNode.cy = LINKED_LIST_NODE_START_CY;

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

export /**
 * Asynchronously deletes a node from the linked list at the specified position.
 * The linked list structure is updated visually with an animation using a delay based on the speedRange.
 * Also updates a Map with the modified values and adjusts the cx and cy (coordinate) values of nodes.
 *
 * @param {TreeNode} root - The root of the linked list.
 * @param {number} position - The 1-based position of the node to be deleted.
 * @param {number} speedRange - The speed (in ms) for visualizing the node deletion.
 * @param {Map<number, number>} dataMap - A map storing key-value pairs for the linked list nodes.
 * @param {React.Dispatch<React.SetStateAction<Map<number, number>>>} setDataMap - A function to update the dataMap state.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>} setRoot - A function to update the root node state.
 *
 * @returns {Promise<TreeNode>} The updated root node of the linked list.
 */
const updateTreeToDeleteData = async (
  root: TreeNode,
  position: number,
  speedRange: number,
  setRoot: React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>,
  dataMap: Map<number, number>,
  setDataMap: React.Dispatch<React.SetStateAction<Map<number, number>>>,
  setInsertedData: React.Dispatch<React.SetStateAction<number[]>>
): Promise<ITreeNode | null> => {
  const currentRoot: TreeNode | null = root;

  if (!currentRoot) {
    return null;
  }

  if (position === 1) {
    // Deleting the head node
    if (currentRoot) {
      currentRoot.isInsertedPosition = true;
      setRoot({ ...currentRoot });
      // delete from data-map also
      setDataMap(deleteKey(dataMap, Number(currentRoot.value)));
      setInsertedData((prv) => prv.filter((i) => i !== Number(currentRoot.value)));
      await Sleep(speedRange);

      currentRoot.isInsertedPosition = false;
      setRoot({ ...currentRoot });

      const newRoot: TreeNode | null = currentRoot.next || null;
      // Adjust coordinates for remaining nodes
      let nextNode: TreeNode | null = newRoot;
      while (nextNode) {
        nextNode.cx = (nextNode.cx || 0) - 25;
        nextNode = nextNode.next;
      }

      return newRoot; // Return the new root of the list
    }
  } else {
    let previousNode: TreeNode | null = null;
    let currentNode: TreeNode | null = currentRoot;
    let remainingSteps = position - 1;

    // Traverse to the node just before the target position
    while (remainingSteps-- > 0 && currentNode) {
      currentNode.isCurrent = true;
      setRoot({ ...root });

      await Sleep(speedRange);

      currentNode.isCurrent = false;
      setRoot({ ...root });

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    // Ensure the position is valid for deletion
    if (previousNode && currentNode) {
      currentNode.isInsertedPosition = true;
      setRoot({ ...root });

      await Sleep(speedRange);

      currentNode.isInsertedPosition = false;
      setRoot({ ...root });
      // delete from data-map also
      setDataMap(deleteKey(dataMap, Number(currentNode.value)));
      setInsertedData((prv) => prv.filter((i) => i !== Number(currentNode.value)));

      // Remove the node from the list
      previousNode.next = currentNode.next;

      // Adjust coordinates for remaining nodes
      let nextNode: TreeNode | null = previousNode.next;
      while (nextNode) {
        nextNode.cx = (nextNode.cx || 0) - 25;
        nextNode = nextNode.next;
      }

      return root; // Return the updated root of the list
    }
  }

  return root; // Return the root if the position is invalid or no deletion is performed
};

/**
 * Asynchronously searches for a node in a linked list and updates its visual state.
 * The search highlights each node and marks the found node as the target.
 *
 * @param {TreeNode} root - The root of the linked list to search within.
 * @param {number} searchItem - The value of the node to search for.
 * @param {number} speedRange - The speed (in ms) for visualizing the search process.
 * @param {React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>} setRoot - A function to update the root node state.
 * @returns {Promise<void>} - Returns nothing. The state updates and visualization are handled within the function.
 */
export const updateTreeToSearchNodeData = async (
  root: TreeNode,
  searchItem: number,
  speedRange: number,
  setRoot: React.Dispatch<React.SetStateAction<ITreeNode | null | undefined>>
): Promise<void> => {
  let currentNode: TreeNode | null = root;

  if (!currentNode) {
    return;
  }

  // Traverse the linked list
  while (currentNode) {
    currentNode.isCurrent = true;
    setRoot({ ...root }); // Trigger re-render
    await Sleep(speedRange);

    currentNode.isCurrent = false;
    setRoot({ ...root }); // Trigger re-render

    if (currentNode.value === searchItem) {
      currentNode.isTarget = true;
      setRoot({ ...root }); // Trigger re-render
      await Sleep(speedRange);

      currentNode.isTarget = false;
      setRoot({ ...root }); // Trigger re-render

      return; // Exit the function when the node is found
    }

    currentNode = currentNode.next; // Move to the next node
  }
};
