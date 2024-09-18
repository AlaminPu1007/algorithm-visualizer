/**
 * LinkedListInputProps represents the input data structure for the linked list operations.
 * It holds the values related to insertion and deletion of nodes at specified positions.
 *
 * @interface LinkedListInputProps
 *
 * @property {string} searchItem - The value of the node to be searched from given list.
 * @property {string} insertAtAnyPosition - The position where the node should be inserted in the list.
 * @property {string} deleteFromAnyPosition - The position from which the node should be deleted in the list.
 */
export interface LinkedListInputProps {
  insertData: string;
  searchItem: string;
  insertAtAnyPosition: string;
  deleteFromAnyPosition: string;
}

/**
 * PageProps represents the properties for controlling the overall page's linked list visualization.
 *
 * @interface PageProps
 *
 * @property {number} speedRange - The speed range used to control the animation of the linked list operations.
 */
export interface PageProps {
  speedRange: number;
  updateComponentWithKey?: string;
}
