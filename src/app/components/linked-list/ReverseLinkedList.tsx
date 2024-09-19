'use client';

import { traverseLinkedListRecursively, reverseLinkedListWithPositions } from '@/app/algorithm/linked-list/reverseList';
import { getRandomTreeData, LINKED_LIST_NODE_START_CX } from '@/app/constant';
import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { reverseListColorsPlate } from '@/app/data/mockData';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

const NODE_LENGTH = 11;

const ReverseLinkedList: React.FC<PageProps> = ({ speedRange, updateComponentWithKey }) => {
  // define component local state
  const [rootNode, setRootNode] = useState<ITreeNode | null>();
  const [root, setRoot] = useState<ITreeNode | null>();
  const [reverseNodes, setReverseNodes] = useState<ITreeNode | null>();
  const [isPerformReverseOperation, setIsPerformReverseOperation] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    // create a new linked list with default cx value
    const newList = new LinkedList(getRandomTreeData(NODE_LENGTH), LINKED_LIST_NODE_START_CX);
    newList.createLinkedList();
    const head = newList.head;
    if (head) {
      // before initialize new list, if already some macro task are holding, need to removed them first
      clearAllTimeouts();
      setRoot(head);
      setRootNode(head);
      setIsPerformReverseOperation(true);
    }

    return () => {
      clearAllTimeouts();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComponentWithKey]);

  useEffect(() => {
    if (isPerformReverseOperation) {
      handleReverseLinkedList();
      setIsPerformReverseOperation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPerformReverseOperation, updateComponentWithKey]);

  /**
   * Handles the process of traversing, reversing a linked list, and updating node positions.
   *
   * This function performs the following:
   * 1. Traverses the linked list recursively for visual highlighting.
   * 2. Reverses the linked list and updates the positions of each node.
   * 3. Updates the state of the root and reversed list to trigger re-renders.
   *
   * @returns {Promise<void>} - A promise that resolves when the reversal and state updates are complete.
   */
  const handleReverseLinkedList = async (): Promise<void> => {
    try {
      setBtnLoading(true);
      clearAllTimeouts();

      // Traverse the list recursively for visualizing node traversal
      traverseLinkedListRecursively(
        JSON.parse(JSON.stringify(rootNode)), // Deep clone of rootNode to avoid direct mutations
        setRoot,
        speedRange
      );

      // Reverse the list and update node positions
      const reversedRoot = await reverseLinkedListWithPositions(
        JSON.parse(JSON.stringify(rootNode)), // Deep clone of rootNode for the reversal operation
        NODE_LENGTH, // The total number of nodes in the linked list
        setReverseNodes, // Function to update the reversed nodes' state
        speedRange // Delay duration for visual effects
      );

      // Update the state of the reversed root node to trigger a re-render
      setReverseNodes({ ...(reversedRoot as TreeNode) });
    } catch (error) {
      // Log the error in development mode for debugging purposes
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className='mt-3 flex items-center justify-between sm:justify-start'>
          <div className='me-3'>
            <StatusColorsPlate data={reverseListColorsPlate} />
          </div>
          <button
            className={`rounded-sm border px-4 py-1 text-[15px] text-white transition-all duration-300 ${btnLoading ? 'cursor-no-drop bg-gray-600' : 'bg-blue-500 hover:bg-theme-btn-secondary'}`}
            onClick={handleReverseLinkedList}
            disabled={btnLoading}
          >
            Revisualize
          </button>
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
              <h1 className='text-center text-4xl font-medium'>Loading...</h1>
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
