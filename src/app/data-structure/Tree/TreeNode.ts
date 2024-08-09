import { SVG_VIEW_BOX_WIDTH } from '@/app/constant';
import { TreeNode } from './Node';
import { ITreeNode } from '@/app/types/TreeTypeProps';

// // Define the Tree interface
export interface ITree {
  head: ITreeNode | null;
  arr: (number | null)[];
  insertIntoList(value: number | undefined): void;
}

/**
 * @param {*} value
 * @return {LinkedList}
 */

export class Tree implements ITree {
  head: ITreeNode | null = null;
  arr: (number | null)[] = [];

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
          } else {
            // Skip the current null item
            i++;
          }
        }
      }

      currentLevel++; // Move to the next level
    }

    /*
    // Initialize the head node
    this.head = new TreeNode(50); // root

    // Insert nodes at level 1
    this.head.left = new TreeNode(40);
    this.head.right = new TreeNode(60);
    this.head.left.parent = this.head;
    this.head.right.parent = this.head;

    // Insert nodes at level 2
    this.head.left.left = new TreeNode(30);
    this.head.left.right = new TreeNode(35);
    this.head.right.left = new TreeNode(65);
    this.head.right.right = new TreeNode(70);
    this.head.left.left.parent = this.head.left;
    this.head.left.right.parent = this.head.left;
    this.head.right.left.parent = this.head.right;
    this.head.right.right.parent = this.head.right;

    // Insert nodes at level 3
    this.head.left.left.left = new TreeNode(25);
    this.head.left.left.right = new TreeNode(28);
    this.head.left.right.left = new TreeNode(33);
    this.head.left.right.right = new TreeNode(37);
    this.head.right.left.left = new TreeNode(63);
    this.head.right.left.right = new TreeNode(68);
    this.head.right.right.left = new TreeNode(75);
    this.head.right.right.right = new TreeNode(80);
    this.head.left.left.left.parent = this.head.left.left;
    this.head.left.left.right.parent = this.head.left.left;
    this.head.left.right.left.parent = this.head.left.right;
    this.head.left.right.right.parent = this.head.left.right;
    this.head.right.left.left.parent = this.head.right.left;
    this.head.right.left.right.parent = this.head.right.left;
    this.head.right.right.left.parent = this.head.right.right;
    this.head.right.right.right.parent = this.head.right.right;

    // Insert nodes at level 4
    this.head.left.left.left.left = new TreeNode(20);
    this.head.left.left.left.right = new TreeNode(22);
    this.head.left.left.right.left = new TreeNode(26);
    this.head.left.left.right.right = new TreeNode(29);
    this.head.left.right.left.left = new TreeNode(31);
    this.head.left.right.left.right = new TreeNode(34);
    this.head.left.right.right.left = new TreeNode(36);
    this.head.left.right.right.right = new TreeNode(38);
    this.head.right.left.left.left = new TreeNode(61);
    this.head.right.left.left.right = new TreeNode(64);
    this.head.right.left.right.left = new TreeNode(66);
    this.head.right.left.right.right = new TreeNode(69);
    this.head.right.right.left.left = new TreeNode(72);
    this.head.right.right.left.right = new TreeNode(76);
    this.head.right.right.right.left = new TreeNode(78);
    this.head.right.right.right.right = new TreeNode(82);
    this.head.left.left.left.left.parent = this.head.left.left.left;
    this.head.left.left.left.right.parent = this.head.left.left.left;
    this.head.left.left.right.left.parent = this.head.left.left.right;
    this.head.left.left.right.right.parent = this.head.left.left.right;
    this.head.left.right.left.left.parent = this.head.left.right.left;
    this.head.left.right.left.right.parent = this.head.left.right.left;
    this.head.left.right.right.left.parent = this.head.left.right.right;
    this.head.left.right.right.right.parent = this.head.left.right.right;
    this.head.right.left.left.left.parent = this.head.right.left.left;
    this.head.right.left.left.right.parent = this.head.right.left.left;
    this.head.right.left.right.left.parent = this.head.right.left.right;
    this.head.right.left.right.right.parent = this.head.right.left.right;
    this.head.right.right.left.left.parent = this.head.right.right.left;
    this.head.right.right.left.right.parent = this.head.right.right.left;
    this.head.right.right.right.left.parent = this.head.right.right.right;
    this.head.right.right.right.right.parent = this.head.right.right.right;
    */

    // Set a current node (example: setting the head as current)
    if (this.head) {
      this.head.isCurrent = true;
    }

    // Adjust this to control the vertical spacing
    const LEVEL_HEIGHT = 30;

    // invoked the calculation method
    this.calculatePositions(
      this.head,
      SVG_VIEW_BOX_WIDTH / 2,
      LEVEL_HEIGHT,
      SVG_VIEW_BOX_WIDTH / 4
    );
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

  calculatePositions(
    node: ITreeNode | null,
    x: number,
    y: number,
    offset: number
  ): void {
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
