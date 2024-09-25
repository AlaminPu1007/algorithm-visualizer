/* eslint-disable indent */
'use client';
import { findShortestPathUsingDijkstra } from '@/app/algorithm/dijkstraShortestPath';
import { dijkstraColorsPlate } from '@/app/data/mockData';
import { generateEdges, generateEdgesForASearch, graphData } from '@/app/data/shortestPathData';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { IGraphEdge, IGraphNode } from '@/app/types/shortestPathProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// define component Props
interface PageProps {
  useRandomKey: string;
  speedRange: number;
}
// initialized a list of possible ending or destination node for graph-2
const graphTwoDestinationNodes: number[] = [16, 11, 4, 5, 15];

const DijkstraComponent: React.FC<PageProps> = ({ speedRange, useRandomKey }) => {
  // define component memory
  const [nodes, setNodes] = useState<IGraphNode[]>([]);
  const [edges, setEdges] = useState<IGraphEdge[]>([]);
  const [shortestPathEdges, setShortestPathEdges] = useState<IGraphEdge[]>([]);
  const [isReadyToPerformOperation, setIsReadyToPerformOperation] = useState<boolean>(false);
  const [initialNodes, setInitialNodes] = useState<{ source: number; destination: number; nodeSizes: number }>({
    source: -1,
    destination: -1,
    nodeSizes: -1,
  });

  // Trigger for component mount as well as dependency changes
  useEffect(() => {
    clearAllTimeouts();

    const graphRandomPosition = Math.floor(Math.random() * 2) % 2;
    const getGraph = JSON.parse(JSON.stringify(graphData[graphRandomPosition]));
    const tempNodes = JSON.parse(JSON.stringify(getGraph.nodes));

    const sourceNode = getGraph.source;
    const destinationNode =
      graphRandomPosition === 1
        ? graphTwoDestinationNodes[
            Math.floor(Math.random() * graphTwoDestinationNodes?.length + 1) % graphTwoDestinationNodes?.length
          ]
        : getGraph.destination;

    // modify graph for source and destination
    const modifyGraph = tempNodes.map((i: IGraphNode) => {
      if (i.id === sourceNode) {
        return {
          ...i,
          isSource: true,
        };
      } else if (i.id === destinationNode) {
        return {
          ...i,
          isDestination: true,
        };
      } else return i;
    });

    // get source & destination node
    setInitialNodes({ source: sourceNode, destination: destinationNode, nodeSizes: getGraph.nodeSizes });
    setNodes(modifyGraph);
    setEdges(JSON.parse(JSON.stringify(graphRandomPosition === 0 ? generateEdges() : generateEdgesForASearch())));
    setShortestPathEdges([]);
    setIsReadyToPerformOperation(true);

    // clear all timeout after component un-mount
    return () => {
      clearAllTimeouts();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useRandomKey]);

  // Trigger for component mount as well as dependency changes
  useEffect(() => {
    if (isReadyToPerformOperation) {
      const { source, destination, nodeSizes } = initialNodes;
      handleDijkstra({ source, destination, nodeSizes });
      setIsReadyToPerformOperation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadyToPerformOperation, useRandomKey, edges, initialNodes]);

  /**
   * Handles the execution of Dijkstra's algorithm to find the shortest path between a source and destination node.
   * This function sets default values for the source, destination, and node sizes, and invokes the shortest path finding logic.
   * It also handles any errors that might occur during execution and logs them in development mode.
   *
   * @param {Object} options - Options for configuring the Dijkstra algorithm.
   * @param {number} [options.source=0] - The ID of the source node (default is 0).
   * @param {number} [options.destination=4] - The ID of the destination node (default is 4).
   * @param {number} [options.nodeSizes=10] - The total number of nodes in the graph (default is 10).
   *
   * @returns {Promise<void>} A promise that resolves when Dijkstra's algorithm completes.
   */
  const handleDijkstra = async ({ source = 0, destination = 4, nodeSizes = 10 }): Promise<void> => {
    try {
      findShortestPathUsingDijkstra(source, destination, nodeSizes, speedRange, setNodes, edges, setShortestPathEdges);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='pb-1 pt-3'>
        <StatusColorsPlate data={dijkstraColorsPlate} />
      </div>
      <div>
        {edges?.length && nodes?.length ? (
          <svg viewBox='10 10 400 150' xmlns='http://www.w3.org/2000/svg'>
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
                    x={edge?.weightPosition?.x !== -1 ? 0 : (sourceNode.x + targetNode.x) / 2 + 3}
                    y={edge?.weightPosition?.y !== -1 ? edge?.weightPosition?.y : (sourceNode.y + targetNode.y) / 2}
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
                  fill={
                    node.isSource
                      ? '#fb7c06'
                      : node.isDestination
                        ? '#9458ff'
                        : node.isShortestPath
                          ? 'green'
                          : node.isCurrentNode
                            ? 'blue'
                            : 'white'
                  }
                  stroke={
                    node.isShortestPath || node.isCurrentNode || node.isDestination || node.isSource ? 'white' : 'black'
                  }
                  strokeWidth={'0.5'}
                />
                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor='middle'
                  dy='3'
                  fontSize='7'
                  fill={
                    node.isDestination || node.isSource || node.isCurrentNode || node.isShortestPath ? 'white' : 'black'
                  }
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
