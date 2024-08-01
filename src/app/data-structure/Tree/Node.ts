/**
 * Initialized a tree-node with some predefined value
 * @return {treeNode}
 */

// Define the TreeNode interface
export interface ITreeNode {
  left: ITreeNode | null;
  right: ITreeNode | null;
  parent: ITreeNode | null;
  value: number | null;
  id: number | null;
  cx: number | null;
  cy: number | null;
  isVisited: boolean;
  isCurrent: boolean;
}

/**
 * @param {value} this is current node data
 * @param {cx} current node x-axis position
 * @param {cy} current node y-axis position
 * @param {isVisited} the sign of node visited or not
 * @param {isCurrent} the sign of current node from given list of tree node
 *
 * @return {node} objects with completed initial node
 */

export class TreeNode implements ITreeNode {
  left: ITreeNode | null = null;
  right: ITreeNode | null = null;
  parent: ITreeNode | null = null;
  value: number | null;
  id: number | null;
  cx: number | null;
  cy: number | null;
  isVisited: boolean;
  isCurrent: boolean;

  constructor(
    value: number | null = null,
    id: number | null = null,
    cx: number | null = null,
    cy: number | null = null
  ) {
    this.value = value;
    this.id = id || Math.floor(Math.random() * 9999);
    this.cx = cx || 0;
    this.cy = cy || 0;
    this.isVisited = false;
    this.isCurrent = false;
  }
}
