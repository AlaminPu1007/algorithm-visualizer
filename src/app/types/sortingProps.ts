/**
 * Interface representing the structure of each item in the merge sort data array.
 *
 * @export
 * @interface mergeSortDataProps
 * @typedef {mergeSortDataProps}
 */
export interface mergeSortDataProps {
  id: number | string;
  data: number | string;
  isSorted: boolean;
  currentItem: boolean;
  isSwapped: boolean;
  isFinished: boolean;
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
