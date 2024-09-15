import { ITreeNode } from '@/app/types/TreeTypeProps';
import { TreeNode } from '../Tree/Node';

// // Define the Tree interface
export interface ITree {
  head: ITreeNode | null;
  arr: (number | null)[];
}

/**
 * Represents a linked list with optional cyclic references.
 * Implements the `ITree` interface.
 */
export class LinkedList implements ITree {
  /** The head node of the linked list. */
  head: ITreeNode | null = null;

  /** An array representing the node values. */
  arr: (number | null)[] = [];

  /**
   * Creates an instance of the `LinkedList` class.
   *
   * @param {number | null[]} arr - An array of node values, where `null` represents no node.
   * @param {number} cycle1_idx - The index of the first node to create a cycle.
   * @param {number} cycle2_idx - The index of the second node to create a cycle.
   */
  constructor(arr: (number | null)[]) {
    this.head = null;
    this.arr = arr;
  }

  /**
   * Creates a linked list from the provided array and sets up a cycle if specified.
   * The cycle is created by connecting the node at `cycle2Index` to the node at `cycle1Index`.
   *
   * @returns {void}
   */
  createLinkedList(): void {
    if (this.arr.length === 0) return;

    let CX = 20;

    // Insert the first node into the head
    const temp = new TreeNode(this.arr[0]);
    temp.cx = CX;
    temp.cy = 20;
    this.head = temp;

    // Create a pseudo copy of the head
    let current = this.head;

    for (let i = 1; i < this.arr.length; i++) {
      const newNode = new TreeNode(this.arr[i]);
      newNode.cx = CX + 25;
      newNode.cy = 20;

      current.next = newNode;
      current = newNode;

      // Update CX value for positioning
      CX += 25;
    }
  }

  // have to calculate new x, y position
  insertNodeAtLast(value: number): void {
    if (!this.head) {
      this.head = new TreeNode(value);
      return;
    }

    const newNode = new TreeNode(value);
    let current = this.head;

    // Traverse to the last node
    while (current.next) {
      current = current.next;
    }

    newNode.cx = (current.cx || 0) + 25;
    newNode.cy = 20;

    // Insert the new node at the end
    current.next = newNode;
  }
}
