/**
 * Represents a single cell in the grid for path finding visualization.
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
 * @property {boolean} islandColor - Indicates each valid islands with different color
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
  islandColor?: string;
}

/**
 * Represents an entry in the queue for path finding algorithms.
 * This entry contains the row and column indices of the current position in the grid.
 *
 * @export
 * @interface PathFindingQueueProps
 * @property {number} rowIdx - The row index of the current position in the grid.
 * @property {number} colIdx - The column index of the current position in the grid.
 */
export interface PathFindingQueueProps {
  rowIdx: number;
  colIdx: number;
}

/**
 * Interface representing the props for the Unique Path page component.
 *
 * @interface UniquePathPageProps
 * @property {string} useRandomKey - A unique key used to trigger re-rendering or other component behavior.
 * @property {number} speedRange - The speed at which animations or algorithms should run, typically in milliseconds.
 * @property {{ rowSize: number; colSize: number }} gridSize - An object representing the dimensions of the grid.
 * @property {number} gridSize.rowSize - The number of rows in the grid.
 * @property {number} gridSize.colSize - The number of columns in the grid.
 */
export interface UniquePathPageProps {
  useRandomKey: string;
  speedRange: number;
  gridSize: { rowSize: number; colSize: number };
}
