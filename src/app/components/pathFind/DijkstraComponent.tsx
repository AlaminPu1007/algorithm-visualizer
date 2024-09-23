'use client';
import { MinHeap } from '@/app/data-structure/minHeap/MinHeap';
import { generateEdges, nodesData } from '@/app/data/shortestPathData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { IGraphEdge, IGraphNode } from '@/app/types/shortestPathProps';
import React, { useEffect, useState } from 'react';

// define component Props
interface PageProps {
  useRandomKey: string;
  speedRange: number;
}

const DijkstraComponent: React.FC<PageProps> = ({ speedRange, useRandomKey }) => {
  const [nodes, setNodes] = useState<IGraphNode[]>([]);
  const [edges, setEdges] = useState<IGraphEdge[]>([]);
  const [shortestPathEdges, setShortestPathEdges] = useState<IGraphEdge[]>([]);
  const [isReadyToPerformOperation, setIsReadyToPerformOperation] = useState<boolean>(false);

  useEffect(() => {
    clearAllTimeouts();
    setNodes(JSON.parse(JSON.stringify(nodesData)));
    setEdges(JSON.parse(JSON.stringify(generateEdges())));
    setShortestPathEdges([]);
    setIsReadyToPerformOperation(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useRandomKey]);

  useEffect(() => {
    if (isReadyToPerformOperation) {
      handleDijkstra({ source: 0, destination: 4 });
      setIsReadyToPerformOperation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyToPerformOperation, useRandomKey, edges]);

  /**
   * Executes Dijkstra's algorithm to find the shortest path in a graph.
   * The function visualizes the algorithm's steps, updating node states
   * and handling asynchronous animations during processing.
   *
   * @async
   * @function handleDijkstra
   * @returns {Promise<void>} A promise that resolves when the algorithm completes.
   *
   * @throws {Error} If any errors occur during the execution, they are logged in development mode.
   *
   * @example
   * // To use this function, ensure that nodes and edges are defined in the context:
   * await handleDijkstra();
   */
  const handleDijkstra = async ({ source = 0, destination = 4 }) => {
    try {
      const pq = new MinHeap();
      const distances = Array(10).fill(Infinity);
      const predecessors = Array(10).fill(null); // To track the shortest path

      // Put source node into queue
      pq.insert(source, 0);
      distances[source] = 0;

      // Visualize the current node being processed
      setNodes((prev) => prev.map((node) => (node.id === source ? { ...node, isCurrentNode: true } : node)));
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
          const newDistance = distances[currentNodeId] + edge.weight;

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
        setNodes((prev) => prev.map((node) => (node.id === currentNode ? { ...node, isShortestPath: true } : node)));
        await Sleep(500);
        currentNode = predecessors[currentNode];
      }

      setNodes((prev) => prev.map((node) => (node.id === source ? { ...node, isShortestPath: true } : node)));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <div className='container'>
      <div>
        {edges?.length ? (
          <svg viewBox='0 0 500 120' xmlns='http://www.w3.org/2000/svg'>
            {/* Render Edges */}
            {edges.map((edge, index) => {
              const sourceNode = nodes.find((n) => n.id === edge.source);
              const targetNode = nodes.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              // Check if the edge is part of the shortest path
              const isShortestPathEdge = shortestPathEdges.some(
                (e) =>
                  (e.source === edge.source && e.target === edge.target) ||
                  (e.source === edge.target && e.target === edge.source)
              );

              return (
                <g key={index}>
                  {/* Draw the edge */}
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    strokeWidth={'0.5'}
                    stroke={isShortestPathEdge ? 'green' : 'black'}
                  />
                  {/* Draw the weight */}
                  <text
                    x={(sourceNode.x + targetNode.x) / 2 + 3}
                    y={(sourceNode.y + targetNode.y) / 2 - 0}
                    fill='red'
                    fontSize='6'
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node) => (
              <g key={node.id}>
                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r='8'
                  fill={node.isShortestPath ? 'green' : node.isCurrentNode ? 'blue' : 'white'}
                  stroke={node.isShortestPath || node.isCurrentNode ? 'white' : 'black'}
                  strokeWidth={'0.5'}
                />
                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor='middle'
                  dy='3'
                  fontSize='7'
                  fill={node.isCurrentNode || node.isShortestPath ? 'white' : 'black'}
                >
                  {node.id}
                </text>
              </g>
            ))}
          </svg>
        ) : (
          <div className='flex min-h-[200px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DijkstraComponent;
