'use client';

import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { mergeTwoListColorsPlate } from '@/app/data/mockData';
import { clearAllTimeouts } from '@/app/lib/sleepMethod';
import { PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DetectCycle: React.FC<PageProps> = ({ speedRange, updateComponentWithKey }) => {
  // define component local state
  const [lists, setLists] = useState<ITreeNode | null>();
  const [rootLists, setRootLists] = useState<ITreeNode | null>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  useEffect(() => {
    insertIntoList();

    return () => {
      clearAllTimeouts();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateComponentWithKey]);

  const insertIntoList = () => {
    const data = [
      { x: 130, y: 20, node: 1 },
      { x: 180, y: 30, node: 2 },
      { x: 190, y: 60, node: 3 },
      { x: 160, y: 90, node: 4 },
      { x: 120, y: 80, node: 5 },
      { x: 110, y: 50, node: 6 },
    ];
    const Obj = new LinkedList([], 0);
    for (let i = 0; i < data?.length; i++) {
      Obj.insertIntoListWithGivenPositionXY(data[i].x, data[i].y, data[i].node);
    }
    if (Obj.head) {
      setLists(Obj.head);
      setRootLists(JSON.parse(JSON.stringify(Obj.head)));
    }
  };

  const createACycle = () => {
    const head = createACycleMethod(3, 6, resetVisitedNodes(JSON.parse(JSON.stringify(rootLists))));
    setLists(head);
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
            disabled={btnLoading}
          >
            Revisualize
          </button>
        </div>
        <h1>I am from detect cycle</h1>
        <button onClick={insertIntoList} className='root-btn'>
          Insert Into node
        </button>
        <button onClick={createACycle} className='root-btn'>
          Circle create
        </button>
        {lists ? (
          <div className='bg-white'>
            <svg viewBox='13 10 280 140'>
              <RenderNodeRecursively node={lists} />
            </svg>
          </div>
        ) : null}
      </div>
    </>
  );
};

const radius = 6; // Circle radius

const RenderNodeRecursively: React.FC<{ node: ITreeNode | null }> = ({ node }) => {
  // Base case: If node is null or already visited, stop rendering
  if (!node || node.isVisited) return null;
  node.isVisited = true;

  return (
    <>
      <g>
        {node?.next && (
          <>
            {/* Calculate the new positions to offset the line */}
            {(() => {
              const { newX1, newY1, newX2, newY2 } = calculateOffsetLine(
                node.cx!,
                node.cy!,
                node.next.cx!,
                node.next.cy!,
                radius
              );

              return (
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
                    x1={newX1}
                    y1={newY1}
                    x2={newX2}
                    y2={newY2}
                    stroke='black'
                    strokeWidth='0.3'
                    markerEnd='url(#arrow)'
                  />
                </>
              );
            })()}
          </>
        )}

        {/* Render the circle */}
        <circle
          cx={node.cx!}
          cy={node.cy!}
          r={radius}
          fill={node.isCurrent ? 'red' : node.isTarget ? 'green' : 'white'}
          stroke='black'
          strokeWidth='0.3'
        ></circle>

        {/* Render the text */}
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

      {/* Recursively render the next node */}
      {node.next ? <RenderNodeRecursively node={node.next} /> : null}
    </>
  );
};

const calculateOffsetLine = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const offsetX = (dx / distance) * radius;
  const offsetY = (dy / distance) * radius;
  return {
    newX1: x1 + offsetX,
    newY1: y1 + offsetY,
    newX2: x2 - offsetX,
    newY2: y2 - offsetY,
  };
};

const resetVisitedNodes = (head: ITreeNode | null): ITreeNode | null => {
  let currentNode = head; // Start from the head

  while (currentNode) {
    // Reset the property
    currentNode.isVisited = false;
    currentNode.isCurrent = false;
    currentNode.isSwap = false;
    currentNode.isSorted = false;
    currentNode.isTarget = false;
    currentNode.isInvalid = false;
    currentNode.isCycle = false;
    currentNode.isInsertedPosition = false;
    // Move to the next node
    currentNode = currentNode.next as ITreeNode;
  }
  return head;
};

const createACycleMethod = (start: number, end: number, head: ITreeNode | null | undefined): ITreeNode | null => {
  if (!head) return null;

  let startNode: ITreeNode | null = null;
  let endNode: ITreeNode | null = null;

  // Traverse the linked list to find the start and end nodes
  let currentNode: ITreeNode | null = head; // Keep original node references

  while (currentNode) {
    if (currentNode.value === start) {
      startNode = currentNode; // Set the start node
    }
    if (currentNode.value === end) {
      endNode = currentNode; // Set the end node
    }
    currentNode = currentNode.next as ITreeNode; // Move to the next node
  }

  // If both startNode and endNode are found, create the cycle
  if (endNode && startNode) {
    endNode.next = startNode; // Create a cycle
  }

  return head; // Return the head
};

export default DetectCycle;
