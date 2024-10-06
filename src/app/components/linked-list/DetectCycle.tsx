'use client';

import {
  createACycleMethod,
  findCycleEnd,
  findCycleStart,
  markCycleInList,
  resetNodeFlags,
  resetNodes,
  updatePointersInList,
} from '@/app/algorithm/linked-list/detectCycle';
import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { CYCLE_NODE_DATA } from '@/app/data/linkedListData';
import { detectCycleFromGivenLinkedList } from '@/app/data/mockData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// Create a new type by picking only speedRange
type SpeedRangeProps = Pick<PageProps, 'speedRange'>;
const PEAK_START_NODES = [2, 3, 4, 5];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DetectCycle: React.FC<SpeedRangeProps> = ({ speedRange }) => {
  // define component local state
  const [lists, setLists] = useState<ITreeNode | null>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [rootVisitedNodes, setRootVisitedNodes] = useState<Map<number, number>>(new Map());
  const [isPerformOperation, setIsPerformOperation] = useState<boolean>(false);
  const [cycleNode] = useState<{ start: number; end: number }>({
    start: PEAK_START_NODES[Math.floor(Math.random() * PEAK_START_NODES.length) % PEAK_START_NODES.length],
    end: 7,
  });

  useEffect(() => {
    resetVisitedMap();
  }, [speedRange]);

  useEffect(() => {
    insertIntoList();

    return () => {
      clearAllTimeouts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isPerformOperation) {
      handleIsCyclePresent();
      setIsPerformOperation(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPerformOperation]);

  /**
   * Inserts nodes into the linked list from a predefined data array.
   */
  const insertIntoList = () => {
    const linkedList = new LinkedList([], 0);

    // initialized a list by nodes
    CYCLE_NODE_DATA.forEach((item) => {
      linkedList.insertIntoListWithGivenPositionXY(item.x, item.y, item.node);
    });

    if (linkedList.head) {
      const head = linkedList.head;
      setLists(head);
      createACycle(head);
      setIsPerformOperation(true);
    }
  };

  /**
   * Creates a cycle in the linked list.
   */
  const createACycle = (rootLists: ITreeNode) => {
    resetVisitedMap();
    const head = createACycleMethod(cycleNode.start, 7, resetNodes(JSON.parse(JSON.stringify(rootLists))));
    setLists(head);
  };

  const handleIsCyclePresent = async () => {
    try {
      setBtnLoading(true);

      const sudoHead = lists as ITreeNode;

      let fast: ITreeNode | null | undefined = sudoHead;
      let slow: ITreeNode | null | undefined = sudoHead;

      // Helper function to update pointers and sleep
      const updateAndSleep = async (slow: ITreeNode, fast: ITreeNode) => {
        resetVisitedMap();
        setLists(() =>
          updatePointersInList(sudoHead, slow, fast, {
            slowPointer: true,
            firstPointer: true,
          })
        );
        await Sleep(speedRange);
        resetVisitedMap();
      };

      while (slow && fast && fast.next) {
        await updateAndSleep(slow, fast);

        slow = slow?.next || null; // Use null as a fallback if slow is undefined
        fast = fast.next.next || null; // Use null as a fallback if fast.next.next is undefined

        if (slow === fast) {
          // Step 2: Identify the start of the cycle
          const startNode = findCycleStart(sudoHead, slow!);

          // Step 3: Identify the end of the cycle
          const endNode = findCycleEnd(startNode);

          // Mark nodes within the cycle
          await markAndSleepCycle(sudoHead, startNode, endNode);
          break;
        }
      }

      // Step 4: Reset all previous colors and pointers
      await resetColorsAndPointers(sudoHead);

      /** restored all previous color */
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
   * Resets the visited nodes map by initializing it with a new empty Map.
   * This function is typically used to clear the current state of visited nodes
   * before starting a new traversal or operation on the data structure.
   */
  const resetVisitedMap = () => setRootVisitedNodes(new Map());

  /**
   * Marks the nodes in a cycle within a linked list and pauses execution for a specified duration.
   *
   * This function first resets the visited nodes map, marks the start and end points of the cycle,
   * and then pauses execution for a brief period to allow for visualization or processing.
   * After the pause, it resets the visited nodes map again.
   *
   * @param head - The head of the linked list.
   * @param startNode - The node where the cycle starts.
   * @param endNode - The node where the cycle ends.
   * @returns A promise that resolves after the sleep duration.
   */
  const markAndSleepCycle = async (head: ITreeNode, startNode: ITreeNode, endNode: ITreeNode) => {
    resetVisitedMap();

    // Mark the cycle in the linked list
    setLists(() =>
      markCycleInList(head, startNode, endNode, {
        isCycleStartPoint: true,
        isCycleEndPoint: true,
        isCycle: true,
      })
    );

    // Pause execution for the specified duration
    await Sleep(speedRange);

    // Reset the visited nodes map after the pause
    resetVisitedMap();
  };

  /**
   * Resets the color flags and pointer states of the nodes in a linked list.
   *
   * This function resets the visited nodes map, updates the state of each node to clear
   * the slow and first pointer flags, pauses execution for a specified duration,
   * and resets the visited nodes map again after the pause.
   *
   * @param head - The head of the linked list.
   * @returns A promise that resolves after the sleep duration.
   */
  const resetColorsAndPointers = async (head: ITreeNode) => {
    // Reset the visited nodes map
    resetVisitedMap();

    // Clear the slow and first pointer flags for all nodes in the linked list
    setLists(() =>
      resetNodeFlags(head, (node: ITreeNode) => {
        node.slowPointer = false;
        node.firstPointer = false;
      })
    );

    // Pause execution for the specified duration
    await Sleep(speedRange);

    // Reset the visited nodes map again after the pause
    resetVisitedMap();
  };

  return (
    <>
      <div>
        <div className='top-5 mt-3 flex items-center justify-between sm:justify-start md:absolute'>
          <div className='me-3'>
            <StatusColorsPlate data={detectCycleFromGivenLinkedList} />
          </div>
          <button
            className={`rounded-sm border px-4 py-1 text-[15px] text-white transition-all duration-300 ${btnLoading ? 'cursor-no-drop bg-gray-600' : 'bg-blue-500 hover:bg-theme-btn-secondary'}`}
            disabled={btnLoading}
            onClick={insertIntoList}
          >
            Revisualize
          </button>
        </div>

        {lists ? (
          <div className='bg-white'>
            <svg viewBox='10 10 280 100'>
              <RenderNodeRecursively node={lists} visited={rootVisitedNodes} />
            </svg>
          </div>
        ) : (
          <div className='flex min-h-[250px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

const radius = 5; // Circle radius

const RenderNodeRecursively: React.FC<{ node: ITreeNode | null; visited: Map<number, number> }> = ({
  node,
  visited,
}) => {
  // Base case: If node is null or already visited, stop rendering
  if (!node || visited.has(Number(node.id))) return null;

  visited.set(Number(node.id), 1);

  let cycle_fill_color = 'white';
  let text_fill_color = 'black';

  if (node.slowPointer) {
    cycle_fill_color = `red`;
    text_fill_color = `white`;
  }

  if (node.firstPointer) {
    cycle_fill_color = `blue`;
    text_fill_color = `white`;
  }

  if (node.isCycle || node.isCycleStartPoint || node.isCycleEndPoint) {
    cycle_fill_color = `green`;
    text_fill_color = `white`;
  }

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
          fill={cycle_fill_color}
          stroke={
            node.isCycle || node.isCycleStartPoint || node.isCycleEndPoint || node.firstPointer || node.slowPointer
              ? 'white'
              : 'black'
          }
          strokeWidth='0.3'
        ></circle>

        {/* Render the text */}
        <text
          x={node.cx!}
          y={node.cy!}
          dy={2}
          textAnchor='middle'
          className='text-center text-[4px]'
          fill={text_fill_color}
        >
          {node?.value}
        </text>
      </g>

      {/* Recursively render the next node */}
      {node.next ? <RenderNodeRecursively node={node.next} visited={visited} /> : null}
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

export default DetectCycle;
