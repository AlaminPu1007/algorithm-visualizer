'use client';

import { getRandomTreeData } from '@/app/constant';
import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { reverseListColorsPlate } from '@/app/data/mockData';
import { Sleep } from '@/app/lib/sleepMethod';
import { PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

const NODE_LENGTH = 11;

const ReverseLinkedList: React.FC<PageProps> = ({ speedRange }) => {
  // define component local state
  const [rootNode, setRootNode] = useState<ITreeNode | null>();
  const [root, setRoot] = useState<ITreeNode | null>();
  const [reverseNodes, setReverseNodes] = useState<ITreeNode | null>();
  const [isPerformReverseOperation, setIsPerformReverseOperation] = useState<boolean>(false);

  useEffect(() => {
    const newList = new LinkedList(JSON.parse(JSON.stringify(getRandomTreeData(NODE_LENGTH))));
    newList.createLinkedList();

    if (newList.head) {
      setRoot(newList.head);
      setRootNode(JSON.parse(JSON.stringify(newList.head)));
      setIsPerformReverseOperation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (root && rootNode && isPerformReverseOperation) {
      reverseMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPerformReverseOperation]);

  const updateListInReverse = async (node: TreeNode | null, totalNodes: number): Promise<TreeNode | null> => {
    let prev: TreeNode | null = null;
    let index = 0; // To manage the position index
    const nodeSpacing = 25; // Horizontal spacing between nodes
    const startX = 20; // Starting x position for the first node

    // Reverse the linked list and update positions
    while (node) {
      const tempNode = node.next; // Save the next node before reversing
      // Reverse the next pointer
      node.next = prev;
      // Update the node's position (cx) based on its new position in the reversed list
      node.cx = startX + (totalNodes - index - 1) * nodeSpacing;
      prev = node;
      node = tempNode;

      prev.isTarget = true;
      setReverseNodes(JSON.parse(JSON.stringify(prev)));
      await Sleep(speedRange);
      prev.isTarget = false;
      setReverseNodes(JSON.parse(JSON.stringify(prev)));

      // Increment the index for position swapping
      index++;
    }

    // Return the new head of the reversed list
    return prev;
  };

  const recursiveApproachToTraverseList = async (node: TreeNode | null) => {
    if (!node) return;

    // Highlight the current node
    // node.isCurrent = true;
    setRoot((prevRoot) => {
      // Create a deep copy of the root node to trigger re-render
      const updatedRoot = JSON.parse(JSON.stringify(prevRoot));
      let currentNode: TreeNode | null = updatedRoot as TreeNode;

      while (currentNode) {
        if (currentNode.id === node.id) {
          currentNode.isCurrent = true;
        } else {
          currentNode.isCurrent = false;
        }
        currentNode = currentNode.next;
      }
      return updatedRoot;
    });

    // Delay to visualize the current node
    await Sleep(speedRange);

    // Reset the current node highlight
    node.isCurrent = false;
    setRoot((prevRoot) => {
      // Create a deep copy of the root node to trigger re-render
      const updatedRoot = JSON.parse(JSON.stringify(prevRoot));
      let currentNode: TreeNode | null = updatedRoot as TreeNode;
      while (currentNode) {
        if (currentNode.id === node.id) {
          currentNode.isCurrent = false;
        }
        currentNode = currentNode.next;
      }
      return updatedRoot;
    });

    // Recursively process the next node first
    await recursiveApproachToTraverseList(node.next);
  };

  const reverseMethod = async () => {
    try {
      recursiveApproachToTraverseList(JSON.parse(JSON.stringify(rootNode)));

      // // Reverse the list and update node positions
      const updatedRoot = await updateListInReverse(JSON.parse(JSON.stringify(rootNode)), NODE_LENGTH);
      // // Update the root of the reversed list to trigger a re-render
      setReverseNodes({ ...(updatedRoot as TreeNode) });
      setRootNode({ ...(updatedRoot as TreeNode) });

      // // update root node
      setRoot(JSON.parse(JSON.stringify(updatedRoot)));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        <div className='mt-3'>
          <StatusColorsPlate data={reverseListColorsPlate} />
        </div>
        <div className='min-h-[200px] w-full'>
          {root ? (
            <div className='mt-8'>
              <h1 className='text-3xl font-medium sm:text-4xl'>ACTUAL NODES:</h1>
              <svg viewBox='13 10 280 30'>
                <RenderNodeRecursively node={root} />
              </svg>
              {reverseNodes ? (
                <>
                  <h1 className='text-3xl font-medium sm:text-4xl'>REVERSE NODES:</h1>
                  <svg viewBox='13 10 280 30'>
                    <RenderNodeRecursively node={reverseNodes as TreeNode} />
                  </svg>
                </>
              ) : null}
            </div>
          ) : (
            <div className='flex min-h-[200px] w-full items-center justify-center'>
              <h1 className='text-center text-4xl font-medium'>Invalid Linked List</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const RenderNodeRecursively: React.FC<{ node: ITreeNode | null }> = ({ node }) => {
  if (!node) return;

  return (
    <>
      <g>
        {node?.next && (
          <>
            <defs>
              <marker
                id='arrow'
                viewBox='0 0 10 10'
                refX='5'
                refY='5'
                markerWidth='6'
                markerHeight='6'
                orient='auto-start-reverse'
                fill='black'
              >
                <path d='M 0 0 L 10 5 L 0 10 z' />
              </marker>
            </defs>
            <line
              x1={node.cx!}
              y1={node.cy!}
              x2={node.cx! + 18}
              y2={node.cy!}
              stroke={node.isTarget ? 'green' : 'black'}
              strokeWidth={'0.3'}
              markerEnd='url(#arrow)'
            />
          </>
        )}

        <circle
          cx={node.cx!}
          cy={node.cy!}
          r={6}
          fill={node.isCurrent ? 'red' : node.isTarget ? 'green' : 'white'}
          stroke={'black'}
          strokeWidth={'0.2'}
        ></circle>
        <text
          x={node.cx!}
          y={node.cy!}
          dy={2}
          textAnchor='middle'
          className='text-center text-[4px]'
          fill={node.isInsertedPosition || node.isCurrent || node.isTarget ? 'white' : 'black'}
        >
          {node?.value}
        </text>
      </g>
      {node.next ? <RenderNodeRecursively node={node.next} /> : null}
    </>
  );
};

export default ReverseLinkedList;
