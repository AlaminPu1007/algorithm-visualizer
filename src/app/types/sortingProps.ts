/**
 * Interface representing the structure of each item in the merge sort data array.
 * @interface
 */
export interface mergeSortDataProps {
  /**
   * Unique identifier for the data item.
   * @type {number | string}
   */
  id: number | string;

  /**
   * The data value associated with the item.
   * @type {number | string}
   */
  data: number | string;
}

/**
 * current item index interface
 *
 * @export
 * @interface currentIndicesProps
 * @typedef {currentIndicesProps}
 */
export interface currentIndicesProps {
  leftIndex: number | null;
  rightIndex: number | null;
}
