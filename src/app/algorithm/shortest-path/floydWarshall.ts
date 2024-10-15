import { handleResetDataForShortestPath } from '@/app/lib/graph';
import { Sleep } from '@/app/lib/sleepMethod';
import { IGraphEdge } from '@/app/types/shortestPathProps';
import { GraphNodesProps } from '@/app/types/sortingProps';
import React from 'react';

/**
 * Finds the shortest path between a source node and a destination node in a graph
 * using the Floyd-Warshall algorithm.
 *
 * @async
 * @param {number} [source=0] - The index of the source node (default is 0).
 * @param {number} [destination=4] - The index of the destination node (default is 4).
 * @param {number} [nodeSizes=10] - The total number of nodes in the graph (default is 10).
 * @param {GraphNodesProps[]} nodes - The array of graph nodes to be updated.
 * @param {number} speedRange - The speed range for visualization purposes, affecting delays.
 * @param {React.Dispatch<React.SetStateAction<GraphNodesProps[]>>} setNodes - State setter for updating the nodes in the graph.
 * @param {IGraphEdge[]} edges - The array of edges representing connections between nodes.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setBtnLoading - State setter for controlling the loading state of a button.
 * @param {React.Dispatch<React.SetStateAction<IGraphEdge[]>>} setShortestPathEdges - State setter for updating the shortest path edges.
 *
 * @returns {Promise<void>} A promise that resolves when the shortest path calculation is complete.
 */
export const findShortestPathUsingFloydWarshall = async (
  source = 0,
  destination: number = 4,
  nodeSizes: number = 9,
  nodes: GraphNodesProps[],
  speedRange: number,
  setNodes: React.Dispatch<React.SetStateAction<GraphNodesProps[]>>,
  edges: IGraphEdge[],
  setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShortestPathEdges: React.Dispatch<React.SetStateAction<IGraphEdge[]>>
): Promise<void> => {
  try {
    // Make a copy of the current nodes to update
    const tempNodes = handleResetDataForShortestPath(nodes);

    // Initialize the distance matrix as a 2D array of numbers
    const distance: number[][] = Array.from({ length: nodeSizes }, () =>
      Array.from({ length: nodeSizes }, () => Number.MAX_SAFE_INTEGER)
    );

    const predecessor: number[][] = Array.from({ length: nodeSizes }, () =>
      Array.from({ length: nodeSizes }, () => -1)
    );

    // Populate the distance matrix with edge weights and set direct predecessors
    edges.forEach((item) => {
      const s = item.source;
      const t = item.target;
      const w = item.weight;
      distance[s][t] = w;
      distance[t][s] = w;

      predecessor[s][t] = s; // Direct predecessor
      predecessor[t][s] = t; // Direct predecessor for undirected graph
    });

    // Set distance from each node to itself as 0 and initialize predecessors
    for (let i = 0; i < nodeSizes; i++) {
      distance[i][i] = 0;
      predecessor[i][i] = i; // Each node is its own predecessor
    }

    // Highlight the source and destination nodes in the UI
    setNodes(() =>
      tempNodes.map((node) =>
        node.id === source
          ? { ...node, isCurrentNode: true, isSource: true, distance: 0 }
          : node.id === destination
            ? { ...node, isDestination: true }
            : node
      )
    );
    await Sleep(speedRange); // Pause for visualization

    /**
     * Implementing the Floyd-Warshall algorithm to find shortest paths
     * between all pairs of nodes.
     */
    for (let k = 0; k < nodeSizes; k++) {
      for (let i = 0; i < nodeSizes; i++) {
        for (let j = 0; j < nodeSizes; j++) {
          // Skip if both distances are infinite
          if (distance[i][k] === Number.MAX_SAFE_INTEGER && distance[k][j] === Number.MAX_SAFE_INTEGER) {
            continue;
          }
          const cost = Number(distance[i][k] + distance[k][j]);

          // Update distance and predecessor if a shorter path is found
          if (distance[i][j] > cost) {
            distance[i][j] = cost;
            predecessor[i][j] = predecessor[k][j]; // Update predecessor
          }
        }
      }
    }

    /* Update cost from source to each node */
    for (let i = 0; i < nodeSizes; i++) {
      tempNodes[i].distance = distance[source][i]; // Set the computed distance
      tempNodes[i].isCurrentNode = true; // Highlight current node
      setNodes([...tempNodes]); // Update state to reflect changes

      await Sleep(speedRange); // Pause for visualization

      tempNodes[i].isCurrentNode = false; // Reset current node state
      setNodes([...tempNodes]); // Update state again
    }

    // Backtrack to determine the shortest path from source to destination
    await backtrackShortestPath(
      predecessor,
      source,
      destination,
      tempNodes,
      edges,
      setShortestPathEdges,
      setNodes,
      speedRange
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  } finally {
    setBtnLoading(false); // Reset button loading state
  }
};

/**
 * Backtracks to find the shortest path from the source node to the target node
 * using the predecessor matrix obtained from the Floyd-Warshall algorithm.
 *
 * @async
 * @param {number[][]} predecessor - A 2D array representing the predecessor of each node
 * in the shortest path tree.
 * @param {number} source - The index of the source node.
 * @param {number} target - The index of the target node.
 * @param {GraphNodesProps[]} tempNodes - The array of nodes to update in the UI.
 * @param {IGraphEdge[]} edges - The array of edges in the graph.
 * @param {React.Dispatch<React.SetStateAction<IGraphEdge[]>>} setShortestPathEdges -
 * State setter for updating the shortest path edges.
 * @param {React.Dispatch<React.SetStateAction<GraphNodesProps[]>>} setNodes -
 * State setter for updating the nodes in the graph.
 * @param {number} speedRange - The speed range for visualization purposes, affecting delays.
 *
 * @returns {Promise<void>} A promise that resolves when the backtracking process is complete.
 */
const backtrackShortestPath = async (
  predecessor: number[][],
  source: number,
  target: number,
  tempNodes: GraphNodesProps[],
  edges: IGraphEdge[],
  setShortestPathEdges: React.Dispatch<React.SetStateAction<IGraphEdge[]>>,
  setNodes: React.Dispatch<React.SetStateAction<GraphNodesProps[]>>,
  speedRange: number
) => {
  let currentNode = target; // Start from the target node

  // Backtrack through the predecessor array to find the path
  while (currentNode !== -1 && currentNode !== source) {
    const prevNode = currentNode; // Store the current node as the previous node
    if (prevNode !== null) {
      // Find the edge that connects the current node to its predecessor
      const edge = edges.find(
        (e) =>
          (e.source === currentNode && e.target === prevNode) || (e.source === prevNode && e.target === currentNode)
      );
      if (edge) {
        // Add the found edge to the shortest path edges
        setShortestPathEdges((prev) => [...prev, edge]);
      }
    }
    // Update the current node in the UI to indicate it's part of the shortest path
    setNodes((prev) =>
      prev.map((node) => (node.id === currentNode ? { ...node, isShortestPath: true, isDestination: false } : node))
    );
    await Sleep(speedRange); // Pause for visualization
    // Move to the predecessor of the current node
    currentNode = predecessor[source][currentNode];
  }

  // Mark the source node as part of the shortest path
  setNodes((prev) =>
    prev.map((node) => (node.id === source ? { ...node, isShortestPath: true, isSource: false } : node))
  );
};
