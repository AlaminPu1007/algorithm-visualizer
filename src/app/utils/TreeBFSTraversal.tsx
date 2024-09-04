import React, { useEffect, useState } from 'react';
import { calculateLinePosition } from '@/app/lib/calculateSvgLinePosition';
import { BFS_DELAY, NODE_POSITION } from '@/app/constant';
import { TreeNode } from '../data-structure/Tree/Node';
import { Sleep } from '../lib/sleepMethod';
import { TreeBFSTraversalProps } from '../types/TreeTypeProps';

const TreeBFSTraversal: React.FC<TreeBFSTraversalProps> = ({ root }) => {
  const [currentNodes, setCurrentNodes] = useState<TreeNode[]>([]);
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!root) return;

    const traverseBFS = async () => {
      const queue = [root];
      const bfsNodes: TreeNode[] = [];

      while (queue.length > 0) {
        const currentNode = queue.shift()!;
        bfsNodes.push(currentNode);

        // Update the state to trigger a re-render
        setCurrentNode(currentNode);

        setVisitedNodes((prevVisitedNodes) => new Set(prevVisitedNodes).add(currentNode.id!));
        setCurrentNodes([...bfsNodes]);

        // Introduce a delay
        await Sleep(BFS_DELAY);

        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }

      // initialize a default state
      setCurrentNode(null);

      await Sleep(BFS_DELAY * 3);
      // initialized at default state
      setVisitedNodes(new Set());
    };

    traverseBFS();
  }, [root]);

  return (
    <>
      {currentNodes.map((node) => {
        const isCurrentNode = node === currentNode;
        const isVisited = visitedNodes.has(node.id!);
        return (
          <g key={node.id}>
            {node.parent &&
              (() => {
                const linePos = calculateLinePosition(
                  node.parent.cx!,
                  node.parent.cy!,
                  node.cx!,
                  node.cy!,
                  NODE_POSITION
                );
                return (
                  <line
                    x1={linePos.startX}
                    y1={linePos.startY}
                    x2={linePos.endX}
                    y2={linePos.endY}
                    stroke={isCurrentNode ? 'green' : isVisited ? 'red' : 'black'}
                    strokeWidth={'0.3'}
                  >
                    <animate
                      attributeName='stroke-dasharray'
                      attributeType='XML'
                      from='0 9.375'
                      to='79.375 0'
                      dur={'4s'}
                      fill='freeze'
                    />
                  </line>
                );
              })()}
            <circle
              cx={node.cx!}
              cy={node.cy!}
              r={NODE_POSITION}
              fill={isCurrentNode ? 'cyan' : isVisited ? '#3B9400' : 'white'}
              stroke={isCurrentNode ? 'white' : 'black'}
              strokeWidth={'0.2'}
            >
              <animate attributeName='r' from='4' to={5} dur='1s' begin={'0s'} />
            </circle>
            <text
              x={node.cx!}
              y={node.cy!}
              dy={2}
              textAnchor='middle'
              className='text-center text-[4px]'
              fill={`${isVisited ? 'white' : 'black'}`}
            >
              {node?.value || -1}
            </text>
          </g>
        );
      })}
    </>
  );
};

export default TreeBFSTraversal;
