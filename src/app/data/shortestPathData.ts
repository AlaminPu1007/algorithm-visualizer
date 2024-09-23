import { IGraphEdge, IGraphNode } from '../types/shortestPathProps';

/**
 * An array of nodes representing the graph's nodes.
 * Each node contains information about its position and state.
 *
 * @constant {IGraphNode[]} nodesData
 * @type {IGraphNode[]}
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
export const nodesData: IGraphNode[] = [
  {
    id: 0,
    x: 50,
    y: 60,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Closer to the top-left
  {
    id: 1,
    x: 100,
    y: 20,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Top-middle-left
  {
    id: 2,
    x: 200,
    y: 20,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Top-middle-right
  {
    id: 3,
    x: 300,
    y: 20,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Top-right
  {
    id: 4,
    x: 350,
    y: 60,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Middle-right
  {
    id: 5,
    x: 300,
    y: 100,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Middle-right (above node 6)
  {
    id: 6,
    x: 200,
    y: 100,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Middle (below node 2)
  {
    id: 7,
    x: 100,
    y: 100,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Middle-left
  {
    id: 8,
    x: 200,
    y: 60,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
  }, // Center
];

/**
 * Generates an array of edges for a graph.
 * Each edge connects two nodes and has a randomly assigned weight.
 *
 * @function generateEdges
 * @returns {IGraphEdge[]} An array of edges, where each edge is represented by an object
 * containing the source node, target node, and weight.
 */
export const generateEdges = (): IGraphEdge[] => {
  return [
    { source: 0, target: 1, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 45 } },
    { source: 0, target: 7, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: -1 } },
    { source: 1, target: 2, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 18 } },
    { source: 1, target: 7, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: -1 } },
    { source: 2, target: 3, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 18 } },
    { source: 2, target: 8, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 45 } },
    { source: 2, target: 5, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 4, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 5, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: -1 } },
    { source: 4, target: 5, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 85 } },
    { source: 5, target: 6, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 108 } },
    { source: 6, target: 7, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 108 } },
    { source: 6, target: 8, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: -1 } },
    { source: 7, target: 8, weight: Math.floor(Math.random() * 15 + 1), weightPosition: { x: -1, y: 75 } },
  ];
};
