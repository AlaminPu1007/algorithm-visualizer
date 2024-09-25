import { generateRandomWeight } from '../lib/helpers';
import { IGraphEdge } from '../types/shortestPathProps';

/**
 * Generates an array of edges for a graph-1.
 * Each edge connects two nodes and has a randomly assigned weight.
 *
 * @function generateEdges
 * @returns {IGraphEdge[]} An array of edges, where each edge is represented by an object
 * containing the source node, target node, and weight.
 */

export const generateEdges = (): IGraphEdge[] => {
  return [
    { source: 0, target: 1, weight: generateRandomWeight(), weightPosition: { x: -1, y: 45 } },
    { source: 0, target: 7, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 1, target: 2, weight: generateRandomWeight(), weightPosition: { x: -1, y: 18 } },
    { source: 1, target: 7, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 2, target: 3, weight: generateRandomWeight(), weightPosition: { x: -1, y: 18 } },
    { source: 2, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: 45 } },
    { source: 2, target: 5, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 4, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 5, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 4, target: 5, weight: generateRandomWeight(), weightPosition: { x: -1, y: 85 } },
    { source: 5, target: 6, weight: generateRandomWeight(), weightPosition: { x: -1, y: 108 } },
    { source: 6, target: 7, weight: generateRandomWeight(), weightPosition: { x: -1, y: 108 } },
    { source: 6, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 7, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: 75 } },
  ];
};

/**
 * Generates an array of edges for a graph-2.
 * Each edge connects two nodes and has a randomly assigned weight.
 *
 * @function generateEdgesForASearch
 * @returns {IGraphEdge[]} An array of edges, where each edge is represented by an object
 * containing the source node, target node, and weight.
 */
export const generateEdgesForASearch = (): IGraphEdge[] => {
  return [
    { source: 0, target: 1, weight: generateRandomWeight(), weightPosition: { x: -1, y: 32 } },
    { source: 0, target: 7, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 1, target: 2, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 2, target: 0, weight: generateRandomWeight(), weightPosition: { x: -1, y: 58 } },
    { source: 2, target: 7, weight: generateRandomWeight(), weightPosition: { x: -1, y: 82 } },
    { source: 7, target: 10, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 9, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 4, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 11, target: 4, weight: generateRandomWeight(), weightPosition: { x: -1, y: 57 } },
    { source: 4, target: 5, weight: generateRandomWeight(), weightPosition: { x: -1, y: 85 } },
    { source: 15, target: 6, weight: generateRandomWeight(), weightPosition: { x: -1, y: 148 } },
    { source: 6, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: 18 } },
    { source: 1, target: 8, weight: generateRandomWeight(5), weightPosition: { x: -1, y: 18 } },
    { source: 2, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 10, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: 127 } },
    { source: 3, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: 45 } },
    { source: 5, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 5, target: 15, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 6, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 16, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: 58 } },
  ];
};

/**
 * Root data of graph data
 */
export const graphData = [
  {
    nodes: [
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
    ],
    edges: [...generateEdges()],
    source: 0,
    destination: 4,
    nodeSizes: 10,
  },
  {
    nodes: [
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
        x: 100,
        y: 60,
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
      },
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
        y: 150,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      }, // Middle (below node 2)
      {
        id: 7,
        x: 70,
        y: 100,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
      {
        id: 8,
        x: 200,
        y: 20,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
      {
        id: 9,
        x: 130,
        y: 100,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
      {
        id: 10,
        x: 100,
        y: 150,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
      {
        id: 11,
        x: 250,
        y: 60,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
      {
        id: 15,
        x: 350,
        y: 150,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
      {
        id: 16,
        x: 180,
        y: 60,
        isVisited: false,
        isCurrentNode: false,
        isShortestPath: false,
        isInvalidPath: false,
        isDestination: false,
        isSource: false,
      },
    ],
    edges: [...generateEdgesForASearch()],
    source: 0,
    destination: 16,
    nodeSizes: 17,
  },
];
