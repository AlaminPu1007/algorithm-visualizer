/**
 * Represents an edge in a graph.
 *
 * @interface IGraphEdge
 * @property {number} source - The starting node of the edge.
 * @property {number} target - The ending node of the edge.
 * @property {number} weight - The weight or cost associated with the edge.
 */
export interface IGraphEdge {
  source: number;
  target: number;
  weight: number;
}

/**
 * Represents a node in a graph with various properties to indicate its state.
 *
 * @interface IGraphNode
 * @property {number} id - The unique identifier of the node.
 * @property {number} x - The x-coordinate of the node's position.
 * @property {number} y - The y-coordinate of the node's position.
 * @property {boolean} isVisited - Indicates if the node has been visited in a traversal.
 * @property {boolean} isCurrentNode - Indicates if the node is the currently processing node.
 * @property {boolean} isShortestPath - Indicates if the node is part of the shortest path.
 * @property {boolean} isInvalidPath - Indicates if the node is part of an invalid path.
 * @property {boolean} isDestination - Indicates if the node is the destination.
 * @property {boolean} isSource - Indicates if the node is the source.
 */
export interface IGraphNode {
  id: number;
  x: number;
  y: number;
  isVisited: boolean;
  isCurrentNode: boolean;
  isShortestPath: boolean;
  isInvalidPath: boolean;
  isDestination: boolean;
  isSource: boolean;
}
