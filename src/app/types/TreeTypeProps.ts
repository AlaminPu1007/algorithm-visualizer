import { TreeNode } from '../data-structure/Tree/Node';

/**
 * interface representing an Tree node
 *
 * @interface ITreeNode
 * @param {left} ITreeNode - the node of root left child
 * @param {right} ITreeNode - the node of root right child
 * @param {left} ITreeNode - the node of root itself
 * @param {value} number - the data of node
 * @param {id} number - the unique identifier of node
 * @param {cx} number - the x-axis position of node
 * @param {cy} number - the y-axis position of node
 * @param {isVisited} boolean - the identifier if node is visited/unvisited
 * @param {isCurrent} boolean - the identifier if node is current node
 */
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
  isSwap: boolean;
  isSorted: boolean;
  isTarget: boolean;
  isInvalid: boolean;
  next: ITreeNode | null;
  isCycle: boolean;
  isInsertedPosition: boolean;
}

/**
 * interface representing DFS traversal component Props
 *
 * @interface TreeDFSTraversalProps
 * @param {root} ITreeNode - the root node or parent node
 * @param {steps} ITreeNode[] - array of tree-node is DFS manner
 * @param {visitedNodes} Set<id> - identifier of visited node
 */
export interface TreeDFSTraversalProps {
  root: ITreeNode | null;
  steps: ITreeNode[];
  currentStep: number;
  visitedNodes: Set<number>;
}

/**
 * Description placeholder
 *
 * @export
 * @interface TreeBFSTraversalProps
 */
export interface TreeBFSTraversalProps {
  root: TreeNode | null;
}
