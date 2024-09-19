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
  /** initialize start or root node cx value */
  initialize_cx: number;

  /**
   * Creates an instance of the `LinkedList` class.
   *
   * @param {number | null[]} arr - An array of node values, where `null` represents no node.
   * @param {number | undefined} initialize_cx - the initial staring cx position of node.
   */
  constructor(arr: (number | null)[], initialize_cx: number = 20) {
    this.head = null;
    this.arr = arr;
    this.initialize_cx = initialize_cx;
  }

  /**
   * Creates a linked list from the provided array and sets up a cycle if specified.
   * The cycle is created by connecting the node at `cycle2Index` to the node at `cycle1Index`.
   *
   * @returns {void}
   */
  createLinkedList(): void {
    if (this.arr.length === 0) return;

    // Insert the first node into the head
    const temp = new TreeNode(this.arr[0]);
    temp.cx = this.initialize_cx;
    temp.cy = 20;
    this.head = temp;

    // Create a pseudo copy of the head
    let current = this.head;

    for (let i = 1; i < this.arr.length; i++) {
      const newNode = new TreeNode(this.arr[i]);
      newNode.cx = this.initialize_cx + 25;
      newNode.cy = 20;

      current.next = newNode;
      current = newNode;

      // Update CX value for positioning
      this.initialize_cx += 25;
    }
  }
}
