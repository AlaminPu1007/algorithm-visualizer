import React from 'react';
import { MinHeap } from '../../data-structure/minHeap/MinHeap';
import { Sleep } from '../../lib/sleepMethod';
import { IGraphEdge, IGraphNode } from '../../types/shortestPathProps';

/**
 * Finds the shortest path between a source and a destination node using Dijkstra's algorithm.
 * This function visualizes the algorithm's progress by updating the state of the nodes and edges.
 *
 * @param {number} source - The ID of the source node.
 * @param {number} destination - The ID of the destination node.
 * @param {number} nodeSizes - The total number of nodes in the graph.
 * @param {number} speedRange - The delay time for animations (in milliseconds).
 * @param {React.Dispatch<React.SetStateAction<IGraphNode[]>>} setNodes - A state setter function for updating the node states.
 * @param {IGraphEdge[]} edges - An array of edges representing the graph.
 * @param {React.Dispatch<React.SetStateAction<IGraphEdge[]>>} setShortestPathEdges - A state setter function for tracking the edges that are part of the shortest path.
 *
 * @returns {Promise<void>} A promise that resolves when the shortest path has been found and visualized.
 */
export const findShortestPathUsingDijkstra = async (
  source: number,
  destination: number,
  nodeSizes: number,
  speedRange: number,
  setNodes: React.Dispatch<React.SetStateAction<IGraphNode[]>>,
  edges: IGraphEdge[],
  setShortestPathEdges: React.Dispatch<React.SetStateAction<IGraphEdge[]>>
): Promise<void> => {
  // initialized a minHeap
  const pq = new MinHeap();
  const distances = Array(nodeSizes).fill(Infinity);
  const predecessors = Array(nodeSizes).fill(null); // To track the shortest path

  // Put source node into queue
  pq.insert(source, 0);
  distances[source] = 0;

  // Visualize the current node being processed
  setNodes((prev) =>
    prev.map((node) =>
      node.id === source
        ? { ...node, isCurrentNode: true, isSource: true }
        : node.id === destination
          ? { ...node, isDestination: true }
          : node
    )
  );
  // Animation delay
  await Sleep(speedRange);
  // Reset isCurrentNode after processing
  setNodes((prev) => prev.map((node) => (node.id === source ? { ...node, isCurrentNode: false } : node)));

  while (!pq.isEmpty()) {
    const { node: currentNodeId } = pq.extractMin()!;

    // If we reached the destination, break the loop
    if (currentNodeId === destination) {
      break;
    }

    // Iterate through neighbors (edges connected to the current node)
    const currentEdges = edges.filter((edge) => edge.source === currentNodeId || edge.target === currentNodeId);

    // iterate over the edges using a for loop to handle async properly
    for (const edge of currentEdges) {
      const targetNodeId = edge.source === currentNodeId ? edge.target : edge.source;
      const newDistance = Math.round(distances[currentNodeId] + edge.weight);

      // If a shorter path to the target node is found
      if (newDistance < distances[targetNodeId]) {
        // Visualize the current node update
        setNodes((prev) => {
          return prev.map((node) => (node.id === targetNodeId ? { ...node, isCurrentNode: true } : node));
        });

        // Wait for some time to simulate animation/visualization delay
        await Sleep(speedRange);

        // Optionally reset the node highlight
        setNodes((prev) => {
          return prev.map((node) => (node.id === targetNodeId ? { ...node, isCurrentNode: false } : node));
        });

        // Update the distances and insert the new node into the priority queue
        distances[targetNodeId] = newDistance;
        pq.insert(targetNodeId, newDistance);
        // Track the predecessor of the target node
        // or keep track of parent node
        predecessors[targetNodeId] = currentNodeId;
      }
    }
  }

  // Backtrack to mark the shortest path and edges
  let currentNode = destination;
  while (currentNode !== null && currentNode !== source) {
    const prevNode = predecessors[currentNode];
    if (prevNode !== null) {
      // Find the edge that connects currentNode and prevNode
      const edge = edges.find(
        (e) =>
          (e.source === currentNode && e.target === prevNode) || (e.source === prevNode && e.target === currentNode)
      );
      if (edge) {
        setShortestPathEdges((prev) => [...prev, edge]); // Track the edge
      }
    }
    setNodes((prev) =>
      prev.map((node) => (node.id === currentNode ? { ...node, isShortestPath: true, isDestination: false } : node))
    );
    await Sleep(speedRange);
    currentNode = predecessors[currentNode];
  }
  setNodes((prev) =>
    prev.map((node) => (node.id === source ? { ...node, isShortestPath: true, isSource: false } : node))
  );
};
