import { SVG_VIEW_BOX_WIDTH } from '@/app/constant';
import { TreeNode } from './Node';
import { ITreeNode } from '@/app/types/TreeTypeProps';

// // Define the Tree interface
export interface ITree {
  head: ITreeNode | null;
  arr: (number | null)[];
  linearArr: ITreeNode[];
  insertIntoList(value: number | undefined): void;
}

/**
 * @param {*} value
 * @return {LinkedList}
 */

export class Tree implements ITree {
  head: ITreeNode | null = null;
  arr: (number | null)[] = [];
  linearArr: ITreeNode[] = [];

  constructor(arr: (number | null)[]) {
    this.head = null;
    this.arr = arr;
    // initiate the method
    this.insertIntoList();
  }

  insertIntoList(): void {
    if (this.arr?.length === 0) return;

    this.head = new TreeNode(this.arr[0]);

    const queue: TreeNode[] = [this.head];

    this.linearArr.push(this.head);

    // initialize a pointer to traverse the array from 1 to n
    // eslint-disable-next-line prefer-const
    let i = 1;

    const maxHeight = 3; // Maximum allowed height of the tree
    let currentLevel = 0; // Track the current level of nodes being processed

    while (i < this.arr.length && currentLevel <= maxHeight) {
      // Number of nodes at the current level
      const levelSize = queue.length;

      for (let j = 0; j < levelSize; j++) {
        // Get the current node from the queue
        const currentNode = queue.shift();

        if (currentNode) {
          // Insert left child if available
          if (i < this.arr.length && this.arr[i] !== null) {
            const left = new TreeNode(this.arr[i++]);
            left.parent = currentNode;
            currentNode.left = left;
            // Insert into queue, and it will become the next level parent
            queue.push(currentNode.left);

            // Add current node to linear array
            this.linearArr.push(currentNode.left);
          } else {
            // Skip the current null item
            i++;
          }

          // Insert right child if available
          if (i < this.arr.length && this.arr[i] !== null) {
            const right = new TreeNode(this.arr[i++]);
            right.parent = currentNode;
            currentNode.right = right;
            // Insert into queue, and it will become the next level parent
            queue.push(currentNode.right);

            // Add current node to linear array
            this.linearArr.push(currentNode.right);
          } else {
            // Skip the current null item
            i++;
          }
        }
      }

      currentLevel++; // Move to the next level
    }

    // Set a current node (example: setting the head as current)
    // if (this.head) {
    //   this.head.isCurrent = false;
    // }

    // Adjust this to control the vertical spacing
    const LEVEL_HEIGHT = 30;

    // invoked the calculation method
    this.calculatePositions(this.head, SVG_VIEW_BOX_WIDTH / 2, LEVEL_HEIGHT, SVG_VIEW_BOX_WIDTH / 4);
  }

  /**
   * Update each node x-axis, y-axis position within the given linked-list
   *
   * @param {node} initially will be the root node
   * @param {x} current x-axis value
   * @param {y} current y-axis value
   * @param {offset} distance from x-axis
   *
   * @return {LinkedList}
   */

  calculatePositions(node: ITreeNode | null, x: number, y: number, offset: number): void {
    if (!node) return;
    node.cx = x;
    node.cy = y;

    if (node.left) {
      this.calculatePositions(node.left, x - offset, y + 30, offset / 2); // Adjust the y increment to control vertical spacing
    }
    if (node.right) {
      this.calculatePositions(node.right, x + offset, y + 30, offset / 2);
    }
  }
}
