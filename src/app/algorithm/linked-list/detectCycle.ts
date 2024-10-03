import { CycleFlags, ITreeNode, PointerFlags } from '@/app/types/TreeTypeProps';

/**
 * Marks the nodes in a linked list that are part of a cycle.
 *
 * @param {ITreeNode} head - The head of the linked list.
 * @param {ITreeNode | null | undefined} startNode - The node where the cycle starts.
 * @param {ITreeNode | null | undefined} endNode - The node where the cycle ends.
 * @param {CycleFlags} flags - The flags to mark the cycle properties on the nodes.
 * @returns {ITreeNode} The updated cloned linked list with marked cycle nodes.
 */
export const markCycleInList = (
  head: ITreeNode,
  startNode: ITreeNode | null | undefined,
  endNode: ITreeNode | null | undefined,
  flags: CycleFlags
) => {
  const clonedList = { ...head };
  let node = clonedList;
  let flag = false;

  while (node) {
    if (node === startNode) {
      flag = true;
      node.isCycleStartPoint = flags.isCycleStartPoint ?? true; // Mark the start of the cycle
    }

    if (node === endNode) {
      node.isCycle = flags.isCycle ?? true;
      node.isCycleEndPoint = flags.isCycleEndPoint ?? true; // Mark the end of the cycle
    }

    if (flag) {
      node.isCycle = flags.isCycle ?? true; // Mark all nodes in the cycle
    }

    // Move to the next node
    if (node === endNode) break;

    node = node.next as ITreeNode;
  }

  return clonedList; // Return the updated cloned list
};

/**
 * Updates the pointer flags for the slow and fast pointers in a linked list.
 *
 * This function traverses the linked list, marking the nodes that correspond
 * to the given slow and fast pointers. It also prevents marking nodes
 * multiple times in case of cycles.
 *
 * @param {ITreeNode} head - The head of the linked list.
 * @param {ITreeNode | null | undefined} slow - The current slow pointer node.
 * @param {ITreeNode | null | undefined} fast - The current fast pointer node.
 * @param {PointerFlags} pointerFlags - Flags to indicate whether to mark the pointers.
 * @returns {ITreeNode} The updated cloned linked list with marked pointer flags.
 */
export const updatePointersInList = (
  head: ITreeNode,
  slow: ITreeNode | null | undefined,
  fast: ITreeNode | null | undefined,
  pointerFlags: PointerFlags = {}
) => {
  const clonedList = { ...head };
  let node = clonedList;
  const localMap = new Map<number, boolean>();

  // Iterate through clonedList to reset and set pointer flags
  while (node) {
    // if node is already found, stop the loop (cycle detected)
    if (localMap.has(Number(node.id))) {
      return clonedList;
    }

    localMap.set(Number(node.id), true);

    // Update fast pointer based on condition
    node.firstPointer = Number(node.id) === Number(fast?.id) ? (pointerFlags.firstPointer ?? true) : false;

    // Update slow pointer based on condition
    node.slowPointer = Number(node.id) === Number(slow?.id) ? (pointerFlags.slowPointer ?? true) : false;

    // Move to the next node
    node = node.next as ITreeNode;
  }

  return clonedList;
};

export const resetNodeFlags = (head: ITreeNode, resetFlags: (node: ITreeNode) => void): ITreeNode => {
  const clonedList = { ...head };
  let node = clonedList;
  const localMap = new Map<number, boolean>();

  // Iterate through the cloned list
  while (node) {
    // Stop the loop if a cycle is detected
    if (localMap.has(Number(node.id))) {
      return clonedList;
    }

    localMap.set(Number(node.id), true);

    // Reset node flags using the provided callback
    resetFlags(node);

    node = node.next as ITreeNode;
  }

  return clonedList; // Return the updated cloned list
};

/**
 * Resets the flags of each node in a linked list using a provided callback function.
 *
 * This function traverses the linked list and applies the `resetFlags` callback
 * to each node, allowing for flexible flag resetting. It also prevents processing
 * nodes multiple times in case of cycles.
 *
 * @param {ITreeNode} head - The head of the linked list to process.
 * @param {(node: ITreeNode) => void} resetFlags - A callback function to reset the flags of a node.
 * @returns {ITreeNode} The updated cloned linked list with reset flags.
 */
export const resetNodes = (head: ITreeNode | null): ITreeNode | null => {
  let currentNode = head; // Start from the head

  while (currentNode) {
    // Reset the property
    currentNode.isVisited = false;
    currentNode.isCurrent = false;
    currentNode.isSwap = false;
    currentNode.isSorted = false;
    currentNode.isTarget = false;
    currentNode.isInvalid = false;
    currentNode.isCycle = false;
    currentNode.isInsertedPosition = false;
    currentNode.slowPointer = false;
    currentNode.firstPointer = false;
    currentNode.isCycleStartPoint = false;
    currentNode.isCycleEndPoint = false;
    // Move to the next node
    currentNode = currentNode.next as ITreeNode;
  }
  return head;
};

/**
 * Creates a cycle in a linked list by connecting the end node to the start node.
 *
 * This function traverses the linked list to find the nodes with the specified
 * values and creates a cycle if both nodes are found. If either node is not found,
 * the list remains unchanged.
 *
 * @param {number} start - The value of the node to be the start of the cycle.
 * @param {number} end - The value of the node to be the end of the cycle.
 * @param {ITreeNode | null | undefined} head - The head of the linked list.
 * @returns {ITreeNode | null} The head of the modified linked list, or null if the head is not defined.
 */
export const createACycleMethod = (
  start: number,
  end: number,
  head: ITreeNode | null | undefined
): ITreeNode | null => {
  if (!head) return null;

  let startNode: ITreeNode | null = null;
  let endNode: ITreeNode | null = null;

  // Traverse the linked list to find the start and end nodes
  let currentNode: ITreeNode | null = head; // Keep original node references

  while (currentNode) {
    if (currentNode.value === start) {
      startNode = currentNode; // Set the start node
    }
    if (currentNode.value === end) {
      endNode = currentNode; // Set the end node
    }
    currentNode = currentNode.next as ITreeNode; // Move to the next node
  }

  // If both startNode and endNode are found, create the cycle
  if (endNode && startNode) {
    endNode.next = startNode; // Create a cycle
  }

  return head; // Return the head
};

/**
 * Finds the starting node of a cycle in a linked list.
 *
 * This function takes the head of the linked list and a meeting point (where
 * two pointers meet) to determine the start of the cycle. It iterates
 * through the list until the start node and the meeting point converge.
 *
 * @param {ITreeNode} head - The head of the linked list.
 * @param {ITreeNode | null | undefined} meetingPoint - A node where two pointers meet in the cycle.
 * @returns {ITreeNode} The starting node of the cycle in the linked list.
 */
export const findCycleStart = (head: ITreeNode, meetingPoint: ITreeNode | null | undefined): ITreeNode => {
  let startNode: ITreeNode | null = head;
  while (startNode !== meetingPoint) {
    startNode = startNode!.next;
    meetingPoint = meetingPoint!.next;
  }
  return startNode as ITreeNode;
};

/**
 * Finds the end node of a cycle in a linked list.
 *
 * This function takes the starting node of the cycle and traverses the linked list
 * until it finds the last node that points back to the starting node.
 *
 * @param {ITreeNode} startNode - The starting node of the cycle.
 * @returns {ITreeNode} The end node of the cycle in the linked list.
 */
export const findCycleEnd = (startNode: ITreeNode): ITreeNode => {
  let endNode: ITreeNode | null = startNode;
  while (endNode!.next !== startNode) {
    endNode = endNode!.next;
  }
  return endNode as ITreeNode;
};
