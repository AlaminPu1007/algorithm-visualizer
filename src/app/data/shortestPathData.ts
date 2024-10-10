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
  const directedEdges = [
    { source: 0, target: 1, weight: generateRandomWeight(), weightPosition: { x: -1, y: 45 } },
    { source: 0, target: 7, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 1, target: 2, weight: generateRandomWeight(), weightPosition: { x: -1, y: 18 } },
    { source: 1, target: 7, weight: generateRandomWeight(5), weightPosition: { x: -1, y: -1 } },
    { source: 2, target: 3, weight: generateRandomWeight(), weightPosition: { x: -1, y: 18 } },
    { source: 2, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: 45 } },
    { source: 2, target: 5, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 4, weight: generateRandomWeight(5), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 5, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 4, target: 5, weight: generateRandomWeight(9), weightPosition: { x: -1, y: 85 } },
    { source: 5, target: 6, weight: generateRandomWeight(), weightPosition: { x: -1, y: 108 } },
    { source: 6, target: 7, weight: generateRandomWeight(5), weightPosition: { x: -1, y: 108 } },
    { source: 6, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 7, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: 75 } },
  ];

  // Create undirected edges by duplicating each directed edge
  const undirectedEdges: IGraphEdge[] = [];

  directedEdges.forEach((edge) => {
    // Add the original directed edge
    undirectedEdges.push(edge);

    // Add the reverse directed edge to make it undirected
    undirectedEdges.push({
      source: edge.target,
      target: edge.source,
      weight: edge.weight,
      weightPosition: edge.weightPosition, // Optionally adjust weight position for visualization
    });
  });

  return undirectedEdges;
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
  const directedEdges = [
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
    { source: 12, target: 6, weight: generateRandomWeight(), weightPosition: { x: -1, y: 148 } },
    { source: 6, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 3, target: 8, weight: generateRandomWeight(), weightPosition: { x: -1, y: 18 } },
    { source: 1, target: 8, weight: generateRandomWeight(5), weightPosition: { x: -1, y: 18 } },
    { source: 2, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 10, target: 9, weight: generateRandomWeight(), weightPosition: { x: -1, y: 127 } },
    { source: 3, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: 45 } },
    { source: 5, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 5, target: 12, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 6, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: -1 } },
    { source: 13, target: 11, weight: generateRandomWeight(), weightPosition: { x: -1, y: 58 } },
  ];

  // Create undirected edges by duplicating each directed edge
  const undirectedEdges: IGraphEdge[] = [];

  directedEdges.forEach((edge) => {
    // Add the original directed edge
    undirectedEdges.push(edge);

    // Add the reverse directed edge to make it undirected
    undirectedEdges.push({
      source: edge.target,
      target: edge.source,
      weight: edge.weight,
      weightPosition: edge.weightPosition, // Optionally adjust weight position for visualization
    });
  });

  return undirectedEdges;
};

/**
 * Root data of graph data
 */
// Define the common properties for nodes
const nodeProperties = {
  isVisited: false,
  isCurrentNode: false,
  isShortestPath: false,
  isInvalidPath: false,
  isDestination: false,
  isSource: false,
  distance: Number.MAX_SAFE_INTEGER,
  isTargetNode: false,
};

// Updated graphData using the spread operator
export const graphData = [
  {
    nodes: [
      {
        id: 0,
        x: 50,
        y: 60,
        ...nodeProperties,
      },
      {
        id: 1,
        x: 100,
        y: 20,
        ...nodeProperties,
      },
      {
        id: 2,
        x: 200,
        y: 20,
        ...nodeProperties,
      },
      {
        id: 3,
        x: 300,
        y: 20,
        ...nodeProperties,
      },
      {
        id: 4,
        x: 350,
        y: 60,
        ...nodeProperties,
      },
      {
        id: 5,
        x: 300,
        y: 100,
        ...nodeProperties,
      },
      {
        id: 6,
        x: 200,
        y: 100,
        ...nodeProperties,
      },
      {
        id: 7,
        x: 100,
        y: 100,
        ...nodeProperties,
      },
      {
        id: 8,
        x: 200,
        y: 60,
        ...nodeProperties,
      },
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
        ...nodeProperties,
      },
      {
        id: 1,
        x: 100,
        y: 20,
        ...nodeProperties,
      },
      {
        id: 2,
        x: 100,
        y: 60,
        ...nodeProperties,
      },
      {
        id: 3,
        x: 300,
        y: 20,
        ...nodeProperties,
      },
      {
        id: 4,
        x: 350,
        y: 60,
        ...nodeProperties,
      },
      {
        id: 5,
        x: 300,
        y: 100,
        ...nodeProperties,
      },
      {
        id: 6,
        x: 200,
        y: 150,
        ...nodeProperties,
      },
      {
        id: 7,
        x: 70,
        y: 100,
        ...nodeProperties,
      },
      {
        id: 8,
        x: 200,
        y: 20,
        ...nodeProperties,
      },
      {
        id: 9,
        x: 130,
        y: 100,
        ...nodeProperties,
      },
      {
        id: 10,
        x: 100,
        y: 150,
        ...nodeProperties,
      },
      {
        id: 11,
        x: 250,
        y: 60,
        ...nodeProperties,
      },
      {
        id: 12,
        x: 350,
        y: 150,
        ...nodeProperties,
      },
      {
        id: 13,
        x: 180,
        y: 60,
        ...nodeProperties,
      },
    ],
    edges: [...generateEdgesForASearch()],
    source: 0,
    destination: 13,
    nodeSizes: 14,
  },
];
