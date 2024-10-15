import { GraphNodesProps } from '../types/sortingProps';

/**
 * Resets the properties of each node in the graph to their initial state.
 * This is useful for preparing the nodes for a new graph algorithm execution
 * by clearing previous statuses and setting default values.
 *
 * @param {GraphNodesProps[]} nodes - An array of graph nodes that need to be reset.
 * Each node should have properties like `isVisited`, `isCurrentNode`, `isShortestPath`,
 * `isInvalidPath`, `isDestination`, `isSource`, `distance`, and `isTargetNode`.
 *
 * @returns {GraphNodesProps[]} - A new array of graph nodes with reset properties.
 */
export const handleResetDataForShortestPath = (nodes: GraphNodesProps[]): GraphNodesProps[] => {
  return nodes.map((node) => ({
    ...node,
    isVisited: false,
    isCurrentNode: false,
    isShortestPath: false,
    isInvalidPath: false,
    isDestination: false,
    isSource: false,
    distance: Number.MAX_SAFE_INTEGER,
    isTargetNode: false,
  }));
};
