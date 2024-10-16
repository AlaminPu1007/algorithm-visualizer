/* eslint-disable indent */
'use client';
import { findShortestPathUsingBellmanFord } from '@/app/algorithm/shortest-path/bellmanFordShortestPath';
import { findShortestPathUsingDijkstra } from '@/app/algorithm/shortest-path/dijkstraShortestPath';
import { findShortestPathUsingFloydWarshall } from '@/app/algorithm/shortest-path/floydWarshall';
import { dijkstraColorsPlate } from '@/app/data/mockData';
import { generateEdges, generateEdgesForASearch, graphData } from '@/app/data/shortestPathData';
import { handleResetDataForShortestPath } from '@/app/lib/graph';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { IGraphEdge, IGraphNode } from '@/app/types/shortestPathProps';
import { GraphNodesProps } from '@/app/types/sortingProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// define component Props
interface PageProps {
  useRandomKey: string;
  speedRange: number;
}

// initialized a list of possible ending or destination node for graph-2
const graphTwoDestinationNodes: number[] = [13, 11, 4, 5, 12];

const ShortestPath: React.FC<PageProps> = ({ speedRange, useRandomKey }) => {
  // define component memory
  const [nodes, setNodes] = useState<GraphNodesProps[]>([]);
  const [edges, setEdges] = useState<IGraphEdge[]>([]);
  const [shortestPathEdges, setShortestPathEdges] = useState<IGraphEdge[]>([]);
  const [isReadyToPerformOperation, setIsReadyToPerformOperation] = useState<boolean>(false);
  const [initialNodes, setInitialNodes] = useState<{ source: number; destination: number; nodeSizes: number }>({
    source: -1,
    destination: -1,
    nodeSizes: -1,
  });
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [variationOfShortestPath, setVariationOfShortestPath] = useState<string>('dijkstra');

  // Trigger for component mount as well as dependency changes
  useEffect(() => {
    clearAllTimeouts();

    const graphRandomPosition = Math.floor(Math.random() * 2) % 2;
    const getGraph = JSON.parse(JSON.stringify(graphData[graphRandomPosition]));
    const tempNodes = JSON.parse(JSON.stringify(getGraph.nodes));

    const sourceNode = getGraph.source;
    const idx = Math.floor(Math.random() * graphTwoDestinationNodes?.length + 1) % graphTwoDestinationNodes?.length;
    const destinationNode = graphRandomPosition === 1 ? graphTwoDestinationNodes[idx] : getGraph.destination;

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
      handleReVisualized(variationOfShortestPath);
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
      setBtnLoading(true);
      await findShortestPathUsingDijkstra(
        source,
        destination,
        nodeSizes,
        speedRange,
        setNodes,
        edges,
        setShortestPathEdges
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
   * Executes the Bellman-Ford algorithm to find the shortest path in a graph.
   * This function sets loading state during the operation and handles any errors
   * that may occur during the execution of the algorithm.
   *
   * @param {Object} params - The parameters for the Bellman-Ford algorithm.
   * @param {number} [params.source=0] - The starting node for the shortest path search.
   * @param {number} [params.destination=4] - The target node for the shortest path search.
   * @param {number} [params.nodeSizes=10] - The number of nodes in the graph.
   *
   * @returns {Promise<void>} A promise that resolves when the algorithm has completed.
   */
  const handleBellmanFord = async ({ source = 0, destination = 4, nodeSizes = 10 }): Promise<void> => {
    try {
      setBtnLoading(true);
      await findShortestPathUsingBellmanFord(
        source,
        destination,
        nodeSizes,
        nodes,
        speedRange,
        setNodes,
        edges,
        setBtnLoading,
        setShortestPathEdges
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
   * Handles the execution of the Floyd-Warshall algorithm to find the shortest path
   * from the source to the destination node.
   *
   * This function sets the loading state before initiating the algorithm, handles any
   * errors that may occur during execution, and resets the loading state afterward.
   *
   * @async
   * @param {Object} params - Parameters for the function.
   * @param {number} [params.source=0] - The index of the source node (default is 0).
   * @param {number} [params.destination=4] - The index of the destination node (default is 4).
   * @param {number} [params.nodeSizes=10] - The number of nodes in the graph (default is 10).
   *
   * @returns {Promise<void>} A promise that resolves when the function completes.
   */
  const handleFloydWarshall = async ({ source = 0, destination = 4, nodeSizes = 9 }): Promise<void> => {
    try {
      setBtnLoading(true); // Set loading state to true while processing
      await findShortestPathUsingFloydWarshall(
        source, // Pass the source node
        destination, // Pass the destination node
        nodeSizes, // Pass the number of nodes
        nodes, // Current nodes state
        speedRange, // Speed range for visualization
        setNodes, // Setter for updating nodes state
        edges, // Current edges in the graph
        setBtnLoading, // Setter for loading state
        setShortestPathEdges // Setter for updating the shortest path edges
      );
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // Log errors in development mode
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } finally {
      setBtnLoading(false); // Reset loading state to false after processing
    }
  };

  /**
   * Re-visualizes the graph based on the selected algorithm type.
   * Resets the graph to its initial state and calculates the shortest path
   * using either Dijkstra's algorithm or the Bellman-Ford algorithm.
   *
   * @param {string} type - The type of algorithm to use for finding the shortest path.
   *                        Accepted values are 'dijkstra' or 'bellman-ford'.
   *
   * @returns {Promise<void>} A promise that resolves when the visualization is updated.
   */

  const handleReVisualized = async (type: string) => {
    const { source, destination, nodeSizes } = initialNodes;
    // initialized all at initial state
    setNodes(handleResetDataForShortestPath(nodes));
    setShortestPathEdges([]);

    if (type === 'dijkstra') {
      await handleDijkstra({ source, destination, nodeSizes });
    } else if (type === 'bellman-ford') {
      await handleBellmanFord({ source, destination, nodeSizes });
    } else {
      await handleFloydWarshall({ source, destination, nodeSizes });
    }
  };

  /**
   * Handles the selection of an algorithm type for visualizing the shortest path.
   * Updates the state to reflect the selected algorithm type and triggers
   * the re-visualization of the graph based on the selected type.
   *
   * @param {string} type - The type of algorithm to use for the shortest path.
   *                        This could be "Dijkstra", "Bellman-Ford", etc.
   */
  const handleAlgorithmType = (type: string) => {
    setVariationOfShortestPath(type);
    handleReVisualized(type);
  };

  return (
    <div>
      <div className='top-4 items-center justify-start sm:flex lg:absolute'>
        <div className='mt-3 flex items-center justify-start pb-1'>
          <div className='me-3'>
            <StatusColorsPlate data={dijkstraColorsPlate} />
          </div>
        </div>
        <div className='mt-2 flex flex-wrap items-center justify-start'>
          <button
            className={`me-2 rounded-sm border px-4 py-1 text-[15px] transition-all duration-300 ${btnLoading ? 'cursor-no-drop bg-gray-600 text-white' : variationOfShortestPath === 'dijkstra' ? 'bg-theme-btn-secondary text-white' : 'bg-white text-black hover:bg-theme-btn-secondary hover:text-white'}`}
            onClick={() => handleAlgorithmType('dijkstra')}
            disabled={btnLoading}
          >
            Dijkstra
          </button>
          <button
            className={`me-2 rounded-sm border px-4 py-1 text-[15px] transition-all duration-300 ${btnLoading ? 'cursor-no-drop bg-gray-600 text-white' : variationOfShortestPath === 'bellman-ford' ? 'bg-theme-btn-secondary text-white' : 'bg-white text-black hover:bg-theme-btn-secondary hover:text-white'}`}
            onClick={() => handleAlgorithmType('bellman-ford')}
            disabled={btnLoading}
          >
            Bellman
          </button>
          <button
            className={`rounded-sm border px-4 py-1 text-[15px] transition-all duration-300 max-[380px]:mt-2 ${btnLoading ? 'cursor-no-drop bg-gray-600 text-white' : variationOfShortestPath === 'floyd-warshall' ? 'bg-theme-btn-secondary text-white' : 'bg-white text-black hover:bg-theme-btn-secondary hover:text-white'}`}
            onClick={() => handleAlgorithmType('floyd-warshall')}
            disabled={btnLoading}
          >
            Floyd Warshall
          </button>
        </div>
      </div>

      <div>
        {edges?.length && nodes?.length ? (
          <svg viewBox='10 5 400 155' xmlns='http://www.w3.org/2000/svg'>
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
                    strokeWidth={'0.4'}
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
                  y={node.y - 5}
                  textAnchor='middle'
                  dy='3'
                  fontSize='6'
                  fill={
                    node.isDestination || node.isSource || node.isCurrentNode || node.isShortestPath ? 'white' : 'black'
                  }
                >
                  {node.id}
                </text>
                <text
                  x={node.x}
                  y={node.y + 0}
                  textAnchor='middle'
                  dy='3'
                  fontSize={node.distance === Number.MAX_SAFE_INTEGER ? '5.5' : '5'}
                  fill={
                    node.isDestination || node.isSource || node.isCurrentNode || node.isShortestPath ? 'white' : 'black'
                  }
                >
                  {`(`}
                  {node.distance === Number.MAX_SAFE_INTEGER ? '∞' : node.distance}
                  {`)`}
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

export default ShortestPath;
