import { SVG_VIEW_BOX_WIDTH } from '@/app/constant';
import { TreeNode } from './Node';
import { ITreeNode } from '@/app/types/TreeTypeProps';

// Adjust this to control the vertical spacing
const LEVEL_HEIGHT = 30;

// // Define the Tree interface
export interface ITree {
  head: ITreeNode | null;
  arr: (number | null)[];
  linearArr: ITreeNode[];
}

/**
 * Represents a binary tree data structure.
 * Implements the ITree interface.
 *
 * @param {*} value
 * @return {LinkedList}
 */

export class Tree implements ITree {
  head: ITreeNode | null = null;
  arr: (number | null)[] = [];
  linearArr: ITreeNode[] = [];

  /**
   * Initializes a Tree instance with the provided array.
   *
   * @param {number | null[]} arr - An array representing the nodes of the tree in level order.
   */
  constructor(arr: (number | null)[]) {
    this.head = null;
    this.arr = arr;
  }

  /**
   * Creates a balanced binary search tree from the current array of data.
   *
   * Sorts the array to ensure balance, then recursively builds the tree.
   * Calculates and sets positions for all nodes in the tree.
   *
   * @returns {void}
   */
  createBalancedBST(): void {
    if (this.arr?.length === 0) return;

    // Sort the array before inserting into the tree to ensure balance
    const sortedArr = [...this.arr].sort((a, b) => Number(a) - Number(b));

    if (!sortedArr?.length) return;

    // Recursively build a balanced BST
    this.head = this.buildBalancedBST(sortedArr, 0, sortedArr.length - 1);

    // Calculate positions for all nodes
    this.calculatePositions(this.head, SVG_VIEW_BOX_WIDTH / 2, LEVEL_HEIGHT, SVG_VIEW_BOX_WIDTH / 4);
  }

  /**
   * Recursively builds a balanced binary search tree from a sorted array.
   *
   * Finds the middle element as the root, and recursively builds left and right subtrees.
   * Sets the parent reference for each node.
   *
   * @param {number[] | null[]} arr - The sorted array of data.
   * @param {number} low - The lower index of the array segment.
   * @param {number} high - The higher index of the array segment.
   * @param {TreeNode | null} parent - The parent node of the current node.
   * @returns {TreeNode | null} - The root node of the built subtree.
   */
  private buildBalancedBST(
    arr: (number | null)[],
    low: number,
    high: number,
    parent: TreeNode | null = null
  ): TreeNode | null {
    // Base case
    if (low > high) return null;

    // Find the middle element and make it the root
    const mid = Math.floor((low + high) / 2);
    const node = new TreeNode(arr[mid]);

    // Set parent reference
    node.parent = parent;

    // Recursively construct the left subtree and make it the left child of the root
    node.left = this.buildBalancedBST(arr, low, mid - 1, node);

    // Recursively construct the right subtree and make it the right child of the root
    node.right = this.buildBalancedBST(arr, mid + 1, high, node);

    return node; // Return the root node of this subtree
  }

  /**
   * Constructs a binary tree from the array.
   * - Creates the root node and adds it to a queue.
   * - Iterates through the array to build the tree level-wise.
   * - Limits the height of the tree to a maximum allowed level.
   * - Updates the `linearArr` with nodes in level order.
   *
   * @return {void}
   */
  insertIntoList(): void {
    if (this.arr?.length === 0) return;

    // Initialize the root node
    this.head = new TreeNode(this.arr[0]);
    const queue: TreeNode[] = [this.head];
    this.linearArr.push(this.head);

    let i = 1; // Index for the array
    const maxHeight = 3; // Maximum allowed height of the tree
    let currentLevel = 0; // Current level of the tree being processed

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

    // invoked the calculation method
    this.calculatePositions(this.head, SVG_VIEW_BOX_WIDTH / 2, LEVEL_HEIGHT, SVG_VIEW_BOX_WIDTH / 4);
  }

  /**
   * Recursively updates the position (cx, cy) of each node in the tree.
   *
   * @param {ITreeNode | null} node - The current node whose position is to be updated.
   * @param {number} x - The x-axis position for the current node.
   * @param {number} y - The y-axis position for the current node.
   * @param {number} offset - The distance from the x-axis for child nodes.
   *
   * @return {void}
   */

  calculatePositions(node: ITreeNode | null, x: number, y: number, offset: number): void {
    if (!node) return;
    node.cx = x;
    node.cy = y;

    // Recursively update positions for left and right children
    if (node.left) {
      this.calculatePositions(node.left, x - offset, y + 30, offset / 2); // Adjust the y increment to control vertical spacing
    }
    if (node.right) {
      this.calculatePositions(node.right, x + offset, y + 30, offset / 2);
    }
  }
}
