/**
 * Represents a single cell in the grid for pathfinding visualization.
 *
 * @interface GridProps
 * @property {number} id - A unique identifier for the cell.
 * @property {number} data - Indicates whether the cell is walkable (1) or not (0).
 * @property {boolean} isVisit - Indicates if the cell has been visited during path finding.
 * @property {boolean} isCurrent - Indicates if the cell is currently being evaluated.
 * @property {boolean} isActive - Indicates if the cell is part of the current path or active in the path finding process.
 * @property {boolean} isAdjacent - Indicates if the cell is adjacent to the currently active cell.
 * @property {boolean} isReachAble - Indicates if the cell is reachable from the start point.
 * @property {boolean} isInvalid - Indicates if the cell is invalid or blocked.
 * @property {boolean} isMarked - Indicates if the cell is marked in the visualization.
 * @property {PathFindingQueueProps} parent - The parent cell's coordinates from which this cell was reached.
 * @property {boolean} isValidPath - Indicates if the cell is part of a valid path from the start to the end.
 */

/**
 * Represents the coordinates of a cell in the grid for path finding operations.
 *
 * @interface PathFindingQueueProps
 * @property {number} rowIdx - The row index of the cell in the grid.
 * @property {number} colIdx - The column index of the cell in the grid.
 */
export interface GridProps {
  id: number;
  data: number;
  isVisit: boolean;
  isCurrent: boolean;
  isActive: boolean;
  isAdjacent: boolean;
  isReachAble: boolean;
  isInvalid: boolean;
  isMarked: boolean;
  parent: PathFindingQueueProps;
  isValidPath: boolean;
}

export interface PathFindingQueueProps {
  rowIdx: number;
  colIdx: number;
}
