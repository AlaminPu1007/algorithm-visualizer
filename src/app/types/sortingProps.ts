/**
 * Interface representing the structure of each item in the merge sort data array.
 *
 * @export
 * @interface SortingDataProps
 * @typedef {SortingDataProps}
 */
export interface SortingDataProps {
  id: number | string;
  data: number | string;
  isSorted: boolean;
  currentItem: boolean;
  isSwapped: boolean;
  isFinished: boolean;
  isCurrentCompareAbleItem: boolean;
  isCandidate: boolean;
  isActive: boolean;
  xPosition: number;
  isLeft: boolean;
  isRight: boolean;
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

/**
 * a interface for heap-sorted items after perform a heapify operation
 *
 * @export
 * @interface HeapSortedItemProps
 * @typedef {HeapSortedItemProps}
 */

export interface HeapSortedItemProps {
  data: number;
  id: number;
}
