import { ITreeNode } from './TreeTypeProps';

/**
 * Represents a color configuration for status indicators.
 *
 * @interface StatusColorsDataProps
 * @property {number} id - A unique identifier for the status color entry.
 * @property {string} title - The descriptive title of the status.
 * @property {string} bg_color - The background color associated with the status, specified as a color string (e.g., hex, rgb, or color name).
 */
export interface StatusColorsDataProps {
  id: number;
  title: string;
  bg_color: string;
}

/**
 * N-Queens grid inline styles types props
 *
 * @interface ChessBoardGridInlineStyleProps
 * @property {string} display - css property
 * @property {string} gap - css grid property
 * @property {string} gridTemplateColumns - css grid property
 * @property {width} display - css to control the width property
 * @property {string} height - css to control the hight property
 */
export interface ChessBoardGridInlineStyleProps {
  display: string;
  gap: string;
  gridTemplateColumns: string;
  width: string;
  height: string;
}

/**
 * Represents a single list item with an ID and a name.
 *
 * @interface ListProps
 * @property {string} id - Unique identifier for the list item.
 * @property {string} name - Name of the list item.
 */
export interface ListProps {
  id: string;
  name: string;
}

/**
 * Represents a project schema containing details about the project, including its ID, name, associated lists, and navigation path.
 *
 * @interface ProjectSchema
 * @property {string} id - Unique identifier for the project.
 * @property {string} name - Name of the project.
 * @property {ListProps[]} lists - Array of lists associated with the project.
 * @property {string} navigate - Navigation path or route related to the project.
 */
export interface ProjectSchema {
  id: string;
  name: string;
  lists: ListProps[];
  navigate: string;
}

/**
 * Interface representing the data structure for each item in the linear search.
 * It extends from the `ITreeNode` interface and includes an additional `data` property
 * which is the numerical value being searched.
 *
 * @interface LinearSearchDataProps
 * @extends {ITreeNode}
 * @property {number} data - The value of the current node used in the linear search.
 */
export interface LinearSearchDataProps extends ITreeNode {
  data: number; // The numerical data value to be searched in the linear search algorithm
}
