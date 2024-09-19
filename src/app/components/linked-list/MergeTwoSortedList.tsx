'use client';
import {
  processRemainingNodes,
  resetNodeStatus,
  visualizeCurrentNode,
} from '@/app/algorithm/linked-list/mergeTwoSortedList';
import { getRandomTreeData, LINKED_LIST_NODE_START_CX, LINKED_LIST_NODE_START_CY } from '@/app/constant';
import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { mergeTwoListColorsPlate } from '@/app/data/mockData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

const NODE_LENGTH = 5;

const MergeTwoSortedList: React.FC<PageProps> = ({ speedRange, updateComponentWithKey }) => {
  // define component local state
  const [listOne, setListOne] = useState<ITreeNode | null>();
  const [listTwo, setListTwo] = useState<ITreeNode | null>();
  const [reverseNodes, setReverseNodes] = useState<ITreeNode | null>();
  const [isPerformReverseOperation, setIsPerformReverseOperation] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    // before initialize new list, if already some macro task are holding, need to removed them first
    clearAllTimeouts();
    // create a random array with fixed length, then sort the data
    const listOneArr = getRandomTreeData(NODE_LENGTH, 50).sort((a, b) => a - b);
    // create a random array with fixed length, then sort the data
    const listTwoArr = getRandomTreeData(NODE_LENGTH + 1, 100).sort((a, b) => a - b);

    // create a sorted list one
    const ObjOne = new LinkedList(listOneArr, LINKED_LIST_NODE_START_CX);
    ObjOne.createLinkedList();
    const head1 = ObjOne.head;

    // create a sorted list one
    const ObjTwo = new LinkedList(listTwoArr, LINKED_LIST_NODE_START_CX);
    ObjTwo.createLinkedList();
    const head2 = ObjTwo.head;

    if (head1) {
      setListOne(head1);
    }
    if (head2) {
      setListTwo(head2);
    }
    setIsPerformReverseOperation(true);
    // clear the previously stored node
    if (reverseNodes) {
      setReverseNodes(null);
    }

    return () => {
      clearAllTimeouts();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComponentWithKey]);

  useEffect(() => {
    if (isPerformReverseOperation) {
      handleMergeTwoListMethod();
      setIsPerformReverseOperation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPerformReverseOperation, updateComponentWithKey]);

  /**
   * Handles the merge of two linked lists with visualization.
   * It updates the node positions and status to indicate the current step of the merge.
   * @async
   * @function handleMergeTwoListMethod
   * @returns {Promise<void>}
   */
  const handleMergeTwoListMethod = async (): Promise<void> => {
    try {
      // clear before all time-out
      clearAllTimeouts();

      // start the loader
      setBtnLoading(true);

      const dummyHeadNode = new TreeNode(0); // Temporary dummy node to act as the head of the merged list.
      let mergedListTail: TreeNode | null = dummyHeadNode;

      let list1 = JSON.parse(JSON.stringify(listOne)); // Deep clone listOne to avoid mutation
      let list2 = JSON.parse(JSON.stringify(listTwo)); // Deep clone listTwo to avoid mutation

      let currentXPosition = LINKED_LIST_NODE_START_CX; // Initial horizontal position for nodes

      // Iterate over both lists until one of them is exhausted
      while (list1 && list2) {
        if (Number(list1.value) < Number(list2.value)) {
          await visualizeCurrentNode(list1, setListOne, speedRange); // Visualize the current node of list1
          list1.cx = currentXPosition;
          list1.cy = LINKED_LIST_NODE_START_CY;

          mergedListTail!.next = { ...list1, next: null }; // Safely assign the next node
          list1 = list1.next; // Move to the next node in list1
        } else {
          await visualizeCurrentNode(list2, setListTwo, speedRange); // Visualize the current node of list2
          list2.cx = currentXPosition;
          list2.cy = LINKED_LIST_NODE_START_CY;

          mergedListTail!.next = { ...list2, next: null }; // Safely assign the next node
          list2 = list2.next; // Move to the next node in list2
        }

        mergedListTail = mergedListTail!.next; // Advance the merged list tail
        currentXPosition += 25; // Increment the horizontal position for the next node

        if (mergedListTail) {
          mergedListTail.isTarget = true; // Mark the current merged node as the target for visualization
        }

        // Update the state to visualize the merged list
        setReverseNodes(() => ({ ...(dummyHeadNode.next as TreeNode) }));

        await Sleep(speedRange); // Add delay to visualize the current step
      }

      // Handle any remaining nodes in list1
      await processRemainingNodes(
        list1,
        setListOne,
        mergedListTail,
        currentXPosition,
        dummyHeadNode,
        speedRange,
        setReverseNodes
      );

      // Handle any remaining nodes in list2
      await processRemainingNodes(
        list2,
        setListTwo,
        mergedListTail,
        currentXPosition,
        dummyHeadNode,
        speedRange,
        setReverseNodes
      );

      // Restore the original state of both lists by resetting isCurrent flags
      resetNodeStatus(setListOne);
      resetNodeStatus(setListTwo);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error); // Log errors only in development mode
      }
    } finally {
      // start the loader
      setBtnLoading((prv) => !prv);
    }
  };

  return (
    <>
      <div>
        <div className='mt-3 flex items-center justify-between sm:justify-start'>
          <div className='me-3'>
            <StatusColorsPlate data={mergeTwoListColorsPlate} />
          </div>
          <button
            className={`rounded-sm border px-4 py-1 text-[15px] text-white transition-all duration-300 ${btnLoading ? 'cursor-no-drop bg-gray-600' : 'bg-blue-500 hover:bg-theme-btn-secondary'}`}
            onClick={handleMergeTwoListMethod}
            disabled={btnLoading}
          >
            Revisualize
          </button>
        </div>
        <div className='min-h-[200px] w-full'>
          {listOne && listTwo ? (
            <div className='mt-8 justify-between md:flex'>
              <div className='md:w-[50%]'>
                <h1 className='text-2xl font-medium md:text-3xl'>LIST ONE:</h1>
                <svg viewBox='13 10 140 30'>
                  <RenderNodeRecursively node={listOne} />
                </svg>
              </div>
              <div className='md:w-[50%]'>
                <h1 className='text-2xl font-medium md:text-3xl'>LIST TWO:</h1>
                <svg viewBox='13 10 140 30'>
                  <RenderNodeRecursively node={listTwo} />
                </svg>
              </div>
            </div>
          ) : (
            <div className='flex min-h-[200px] w-full items-center justify-center'>
              <h1 className='text-center text-4xl font-medium'>Loading...</h1>
            </div>
          )}

          {reverseNodes ? (
            <div className='w-[100%]'>
              <h1 className='text-2xl font-medium md:text-3xl'>MERGE NODES:</h1>
              <svg viewBox='13 10 280 30'>
                <RenderNodeRecursively node={reverseNodes as TreeNode} />
              </svg>
            </div>
          ) : null}
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

export default MergeTwoSortedList;
