/* custom tree node */
export const NODE_POSITION = 5;

// node radius
export const RADIUS: number = 8;

// Space between children
export const CHILD_SPACING: number = 45;

// Height of the line connecting nodes
export const LINE_HEIGHT: number = 45;

// Offset to shift the left child line
export const LEFT_LINE_OFFSET: number = 10;

// Offset to shift the right child line
export const RIGHT_LINE_OFFSET: number = 10;

// Svg view box with
export const SVG_VIEW_BOX_WIDTH = 240;

// delay time of each DFS traversal
export const DFS_DELAY = 600;

// delay time of each BFS traversal
export const BFS_DELAY = 600;

// create a dummy array of node value,
// using this array we will create a binary tree
export const TreeArrData: (number|null) [] = [
  50, 40, 60, 30, 35, 65, 70, 25, 78, 33, 37, 63, 68, 10, 80, 20, 22, 26, 29,
  31, 34, 36, 38, 61, 64, 66, 69, 72, 76, 78, 82,
];
