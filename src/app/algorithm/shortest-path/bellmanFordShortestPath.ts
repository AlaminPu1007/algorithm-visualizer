import { handleResetDataForShortestPath } from '@/app/lib/graph';
import { Sleep } from '@/app/lib/sleepMethod';
import { IGraphEdge } from '@/app/types/shortestPathProps';
import { GraphNodesProps } from '@/app/types/sortingProps';
import React from 'react';
import { toast } from 'react-toastify';

/**
 * Executes the Bellman-Ford algorithm to find the shortest path from a source node to a target node.
 *
 * @param {number} source - The starting node ID.
 * @param {number} target - The target node ID.
 * @param {number} nodeSizes - The total number of nodes.
 * @param {GraphNodesProps[]} nodes - Array of node objects representing the graph.
 * @param {number} speedRange - Speed range for visualization delay.
 * @param {React.Dispatch<React.SetStateAction<GraphNodesProps[]>>} setNodes - Function to update the node states.
 * @param {IGraphEdge[]} edges - Array of edges representing the graph.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setBtnLoading - Function to toggle loading state.
 * @param {React.Dispatch<React.SetStateAction<IGraphEdge[]>>} setShortestPathEdges - Function to track edges in the shortest path.
 *
 * @returns {Promise<void>} Resolves once the shortest path is found and visualized.
 */
export const findShortestPathUsingBellmanFord = async (
  source = 0,
  target: number = 4,
  nodeSizes = 10,
  nodes: GraphNodesProps[],
  speedRange: number,
  setNodes: React.Dispatch<React.SetStateAction<GraphNodesProps[]>>,
  edges: IGraphEdge[],
  setBtnLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setShortestPathEdges: React.Dispatch<React.SetStateAction<IGraphEdge[]>>
): Promise<void> => {
  try {
    // Initialize node distances and predecessors
    const tempNodes = handleResetDataForShortestPath(nodes);
    const predecessors = new Array(nodeSizes).fill(null);

    // Set initial nodes and add visualization delay
    setNodes(() =>
      tempNodes.map((node) =>
        node.id === source
          ? { ...node, isCurrentNode: true, isSource: true, distance: 0 }
          : node.id === target
            ? { ...node, isDestination: true }
            : node
      )
    );
    await Sleep(speedRange);

    // Set source node distance to 0 and visualize
    tempNodes[source].distance = 0;
    await visualizeNode(source, setNodes, speedRange);

    // Relax edges up to (nodes.length - 1) times
    for (let i = 1; i <= nodes.length - 1; i++) {
      let updated = false;

      for (const { source: u, target: v, weight: w } of edges) {
        const cost = tempNodes[u].distance + w;

        // Relax the edge if a shorter path is found
        if (tempNodes[u].distance !== Number.MAX_SAFE_INTEGER && cost < tempNodes[v].distance) {
          tempNodes[v].distance = cost;
          predecessors[v] = u;

          // Visualize the edge relaxation
          await visualizeEdge(u, v, cost, setNodes, speedRange);
          updated = true;
        }
      }

      // If no updates happen, terminate early
      if (!updated) {
        break;
      }
    }
    setNodes([...tempNodes]);

    // Check for negative weight cycles
    if (detectNegativeCycle(tempNodes, edges)) return;

    // Backtrack to mark the shortest path
    await backtrackShortestPath(
      predecessors,
      source,
      target,
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
    setBtnLoading(false);
  }
};

/**
 * Visualizes a node as the current node by updating its state,
 * then resets the node's state after a delay.
 *
 * @param {number} nodeId - The ID of the node to visualize.
 * @param {React.Dispatch<React.SetStateAction<GraphNodesProps[]>>} setNodes - Function to update the state of nodes.
 * @param {number} speedRange - The delay in milliseconds to pause between updates.
 * @returns {Promise<void>} A promise that resolves after the visualization is complete.
 */
const visualizeNode = async (
  nodeId: number,
  setNodes: React.Dispatch<React.SetStateAction<GraphNodesProps[]>>, // Correct type
  speedRange: number
) => {
  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes]; // Use prevNodes from state
    updatedNodes[nodeId].isCurrentNode = true;
    return updatedNodes;
  });
  await Sleep(speedRange);

  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes]; // Use prevNodes from state
    updatedNodes[nodeId].isCurrentNode = false;
    updatedNodes[nodeId].isSource = false;
    return updatedNodes;
  });
};

/**
 * Visualizes an edge by highlighting the source and target nodes, updating their states with a distance cost,
 * and then resets the states after a delay.
 *
 * @param {number} u - The ID of the source node.
 * @param {number} v - The ID of the target node.
 * @param {number} cost - The computed distance or cost from the source node to the target node.
 * @param {React.Dispatch<React.SetStateAction<GraphNodesProps[]>>} setNodes - Function to update the state of nodes.
 * @param {number} speedRange - The delay in milliseconds to pause between updates.
 * @returns {Promise<void>} A promise that resolves after the visualization is complete.
 */
const visualizeEdge = async (
  u: number,
  v: number,
  cost: number,
  setNodes: React.Dispatch<React.SetStateAction<GraphNodesProps[]>>, // Correct type
  speedRange: number
) => {
  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes]; // Use prevNodes from state
    return updatedNodes.map((node) =>
      node.id === u
        ? { ...node, isCurrentNode: true }
        : node.id === v
          ? { ...node, isCurrentNode: true, isTargetNode: true, distance: cost }
          : node
    );
  });
  await Sleep(speedRange);

  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes]; // Use prevNodes from state
    return updatedNodes.map((node) =>
      node.id === u || node.id === v ? { ...node, isCurrentNode: false, isTargetNode: false } : node
    );
  });
};

/**
 * Detects if a negative weight cycle exists in the graph.
 * A negative weight cycle occurs when a shorter path is found after all nodes have been processed.
 *
 * @param {GraphNodesProps[]} tempNodes - The array of graph nodes, where each node contains a `distance` property representing its current shortest distance from the source node.
 * @param {IGraphEdge[]} edges - The array of edges in the graph, where each edge has a source node, target node, and weight.
 * @returns {boolean} - Returns `true` if a negative weight cycle is detected, otherwise `false`.
 */
const detectNegativeCycle = (tempNodes: GraphNodesProps[], edges: IGraphEdge[]) => {
  for (const { source: u, target: v, weight: w } of edges) {
    if (tempNodes[u].distance !== Number.MAX_SAFE_INTEGER && tempNodes[u].distance + w < tempNodes[v].distance) {
      toast.error(`Graph contains a negative weight cycle`);
      return true;
    }
  }
  return false;
};

/**
 * Backtracks from the target node to the source node using the `predecessors` array to find and mark the shortest path.
 * This function highlights nodes and edges that are part of the shortest path and updates the state asynchronously.
 *
 * @param {number[]} predecessors - Array where each index represents a node, and its value represents the predecessor of that node in the shortest path.
 * @param {number} source - The starting node of the path (source node).
 * @param {number} target - The ending node of the path (target node).
 * @param {GraphNodesProps[]} tempNodes - Array of graph nodes where each node represents a point in the graph with properties like `isShortestPath` and `isDestination`.
 * @param {IGraphEdge[]} edges - Array of graph edges that connect nodes and have properties like source, target, and weight.
 * @param {React.Dispatch<React.SetStateAction<IGraphEdge[]>>} setShortestPathEdges - State updater function to set the edges that are part of the shortest path.
 * @param {React.Dispatch<React.SetStateAction<GraphNodesProps[]>>} setNodes - State updater function to update node properties in the graph.
 * @param {number} speedRange - The delay time between each step of the path visualization.
 *
 * @returns {Promise<void>} - Returns a promise that resolves after the entire shortest path has been visualized.
 */
const backtrackShortestPath = async (
  predecessors: number[],
  source: number,
  target: number,
  tempNodes: GraphNodesProps[],
  edges: IGraphEdge[],
  setShortestPathEdges: React.Dispatch<React.SetStateAction<IGraphEdge[]>>,
  setNodes: React.Dispatch<React.SetStateAction<GraphNodesProps[]>>,
  speedRange: number
) => {
  let currentNode = target;

  while (currentNode !== null && currentNode !== source) {
    const prevNode = predecessors[currentNode];
    if (prevNode !== null) {
      const edge = edges.find(
        (e) =>
          (e.source === currentNode && e.target === prevNode) || (e.source === prevNode && e.target === currentNode)
      );
      if (edge) {
        setShortestPathEdges((prev) => [...prev, edge]);
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
