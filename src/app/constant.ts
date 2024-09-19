import { ICell } from './types/NQueensProps';

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

/**
 * Get random data to create a tree
 *
 * @param {number} [size=31]
 * @returns {*}
 */
export const getRandomTreeData = (size: number = 31, range: number = 500) =>
  Array.from({ length: size }).map(() => Math.floor(Math.random() * range + 1));

// fill the check board according to the grid size
export const fillGridArray = (size: number, defaultValue: number = 0): ICell[][] => {
  let id = 1;
  return Array(size)
    .fill(0)
    .map(() =>
      Array(size)
        .fill(0)
        .map(() => ({ id: id++, value: defaultValue }))
    );
};

export const GRID_SIZE = 4;

/* merge sort board size and other content goes here */
export const MERGE_SORT_SVG_WIDTH = 2000;
export const MERGE_SORT_SVG_HEIGHT = 400;
// merge data sleep time
export const MERGE_SLEEP_DELAY = 0;

/** PATH FINDING CONSTANT THING DEFINE HERE */
// Directions for moving in the maze
export const del_row = [+1, 0, 0, -1]; // Down, Left, Right, Up
export const del_col = [0, -1, +1, 0];
// To identify a valid path
export const directions = ['D', 'L', 'R', 'U']; // Direction string for consistency
export const UNIQUE_PATH_SVG_ICON_SIZE = `w-[80%] min-[600px]:h-[20px] min-[600px]:w-[20px]`;
export const UNIQUE_PATH_GRID_SIZE = `h-[50px] w-[50px]`;

// Linked list component necessary constant thing
export const LINKED_LIST_NODE_START_CX = 20;
export const LINKED_LIST_NODE_START_CY = 20;
