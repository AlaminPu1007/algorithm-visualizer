/**
 * A class representing a Min Heap data structure.
 * This implementation is used to efficiently retrieve the node
 * with the smallest distance.
 */
export class MinHeap {
  heap: { node: number; distance: number }[];

  /**
   * Initializes an empty Min Heap.
   */
  constructor() {
    this.heap = [];
  }

  /**
   * Inserts a new node with its associated distance into the heap.
   * This method maintains the heap property by bubbling up the new node.
   *
   * @param {number} node - The identifier of the node to insert.
   * @param {number} distance - The distance associated with the node.
   */
  insert(node: number, distance: number) {
    this.heap.push({ node, distance });
    this.bubbleUp();
  }

  /**
   * Extracts the node with the smallest distance from the heap.
   * The root node is removed, and the last node is moved to the root
   * followed by bubbling down to maintain the heap property.
   *
   * @returns {{ node: number; distance: number } | undefined} - The node with the smallest distance or undefined if the heap is empty.
   */
  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown();
    return min;
  }

  /**
   * Gets the parent index of a given node index.
   *
   * @param {number} index - The index of the current node.
   * @returns {number} - The index of the parent node.
   */
  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  /**
   * Swaps two elements in the heap.
   *
   * @param {number} index1 - The index of the first element.
   * @param {number} index2 - The index of the second element.
   */
  swap(index1: number, index2: number) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  /**
   * Bubbles up the last element in the heap to maintain the heap property.
   */
  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[index].distance >= this.heap[parentIndex].distance) break;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  /**
   * Bubbles down the root element to maintain the heap property.
   * This method ensures that the smallest element moves to the root position.
   */
  bubbleDown() {
    let index = 0;
    const length = this.heap.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < length && this.heap[leftChild].distance < this.heap[smallest].distance) {
        smallest = leftChild;
      }

      if (rightChild < length && this.heap[rightChild].distance < this.heap[smallest].distance) {
        smallest = rightChild;
      }

      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  /**
   * Checks if the heap is empty.
   *
   * @returns {boolean} - True if the heap is empty, false otherwise.
   */
  isEmpty() {
    return this.heap.length === 0;
  }
}
