'use client';

import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { appendToMapWithNewValue, hasKey } from '@/app/lib/mapUtils';
import { Sleep } from '@/app/lib/sleepMethod';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const speedRange = 300;

interface LinkedListInputProps {
  insertAtLast: string;
  insertAtAnyPosition: string;
  deleteFromAnyPosition: string;
}

const LinkedListComponent = () => {
  // define component local state
  const [insertedData, setInsertedData] = useState<number[]>([]);
  const [root, setRoot] = useState<ITreeNode | null>();
  const [btnLoading, setButtonLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<LinkedListInputProps>({
    insertAtLast: '',
    insertAtAnyPosition: '1',
    deleteFromAnyPosition: '',
  });
  const [dataMap, setDataMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const newList = new LinkedList([15]);
    newList.createLinkedList();

    if (newList.head) {
      setRoot(newList.head);
      // update setInsertData as well
      setInsertedData((prv) => [...prv, 15]);
      // insert into map
      setDataMap(appendToMapWithNewValue(dataMap, 15, 15));
      setInputData((prv) => ({ ...prv, insertAtLast: String(Math.floor(Math.random() * 99 + 1)) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * A recursive approach to insert new node at last position with given value.
   *
   * @param {TreeNode} currentNode
   * @param {number} cx
   * @param {number} cy
   * @param {number} value
   * @returns {TreeNode}
   */
  const updateTree = async (currentNode: TreeNode, cx: number, cy: number, value: number): Promise<TreeNode> => {
    const newNode = new TreeNode(value);
    let current = currentNode;

    current.isCurrent = true;
    setRoot({ ...currentNode });
    await Sleep(speedRange);

    current.isCurrent = false;

    // Traverse to the last node
    while (current.next) {
      current = current.next;

      current.isCurrent = true;
      setRoot({ ...currentNode });

      await Sleep(speedRange);

      current.isCurrent = false;
      setRoot({ ...currentNode });
    }

    // mark is inserted position
    current.isCurrent = true;
    setRoot({ ...currentNode });
    await Sleep(speedRange);
    current.isCurrent = false;

    newNode.cx = (current.cx || 0) + 25;
    newNode.cy = 20;
    newNode.isTarget = true;

    // Insert the new node at the end
    current.next = newNode;

    // Update the new node
    setRoot({ ...currentNode });
    await Sleep(speedRange);

    // Mark the new node as not the target
    newNode.isTarget = false;
    setRoot({ ...currentNode });

    return currentNode;
  };

  /**
   * Insert new data into tail of a linked list. Before inserted item need an recursive approach to get the positions.
   *
   * @returns {*}
   */
  const insertDataAtTail = async () => {
    // check some validation before insert at tail of given linked list
    if (!root) {
      toast.error('Invalid linked list.');
      return;
    }
    if (insertedData?.length > 11) {
      toast.error('Max limit exceed. You can add at most 11 items');
      return;
    } else if (!inputData.insertAtLast) {
      toast.error('Input field can not be empty');
      return;
    }

    const value = Number(inputData.insertAtLast);

    if (hasKey(dataMap, value)) {
      toast.error('This item is already exists');
      return;
    }

    setButtonLoading((prv) => !prv);

    // Starting at depth 20 and position 0 for the new node
    const updatedRoot = await updateTree({ ...root }, Number(root.cx), Number(root.cy), value);

    // mark is inserted position
    setRoot({ ...updatedRoot });
    await Sleep(300);

    // update setInsertData as well
    setInsertedData((prv) => [...prv, value]);

    // insert into map
    setDataMap(appendToMapWithNewValue(dataMap, value, value));

    setButtonLoading((prv) => !prv);
    // update input field with random value
    setInputData((prv) => ({ ...prv, insertAtLast: String(Math.floor(Math.random() * 499 + 1)) }));
  };

  /**
   * Handle input data for insert at last into linked-list
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const insertAtLastOnChangeMethod = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(parseInt(e.target.value));

    if (value > 999) {
      toast.error(`Number is too large.`);
    } else if (value < 0) {
      toast.error(`Number is too small.`);
    }

    setInputData((prv) => ({ ...prv, insertAtLast: String(value || '') }));
  };

  /**
   * Handle input change for insert item into any position of given linked list
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const insertAtAnyPositionOnChangeMethod = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(parseInt(e.target.value));
    console.log(dataMap.size);

    if (value > dataMap.size + 1 || value <= 0) {
      toast.error(`Invalid position`);
    }

    // const position = String(Math.floor(Math.random() + dataMap.size + 1));
    // console.log(position, 'position');

    setInputData((prv) => ({ ...prv, insertAtAnyPosition: String(value || 0) }));
  };

  const insertDataByPosition = async () => {
    // check some validation before insert at tail of given linked list
    if (!root) {
      toast.error('Invalid linked list.');
      return;
    } else if (Number(inputData.insertAtAnyPosition) > dataMap.size + 1 || Number(inputData.insertAtAnyPosition) <= 0) {
      toast.error(`Invalid position`);
      return;
    } else if (insertedData?.length > 11) {
      toast.error('Max limit exceed. You can add at most 11 items');
      return;
    } else if (!inputData.insertAtLast) {
      toast.error('Input field can not be empty');
      return;
    }

    const value = Number(inputData.insertAtLast);
    const position = Number(inputData.insertAtAnyPosition);

    if (dataMap.get(value)) {
      toast.error('This item is already exists');
      return;
    }

    const updateTreeToInsertData = async (root: TreeNode, value: number, position: number): Promise<TreeNode> => {
      let sudoHead: TreeNode | null = root;

      const newNode = new TreeNode(value);
      newNode.cx = 20;
      newNode.cy = 20;

      // insert into map
      setDataMap(appendToMapWithNewValue(dataMap, value, value));

      // If the position is for the head
      if (position === 1) {
        sudoHead.isInsertedPosition = true;
        setRoot({ ...sudoHead });

        await Sleep(speedRange);

        sudoHead.isInsertedPosition = false;
        setRoot({ ...sudoHead });

        newNode.next = sudoHead;
        sudoHead = newNode;

        // Shift cx values of the existing nodes
        let current: TreeNode | null = newNode.next;
        while (current) {
          current.cx = (current.cx || 0) + 25; // Shift cx value
          current = current.next; // Traverse to the next node
        }

        return sudoHead;
      } else {
        let prev: TreeNode | null = null;
        let current: TreeNode | null = sudoHead;
        let counter = position - 1;

        // Traverse to the node at the specified position
        while (counter-- && current) {
          current.isCurrent = true;
          setRoot({ ...root });

          await Sleep(speedRange);

          current.isCurrent = false;
          setRoot({ ...root });

          prev = current;
          current = current.next;
        }

        // Ensure valid position and insertion
        if (prev && counter < 0) {
          if (current) {
            current.isInsertedPosition = true;
            setRoot({ ...root });

            await Sleep(speedRange);

            current.isInsertedPosition = false;
            setRoot({ ...root });
          }

          // Insert the new node between `prev` and `current`
          newNode.next = current; // current could be null if it's the end of the list
          prev.next = newNode; // previous node now points to newNode

          // Adjust cx of the inserted node and all subsequent nodes
          if (current) {
            newNode.cx = current.cx || 25; // Inherit cx if not the last
            newNode.cy = current.cy || 20;
          } else {
            newNode.cx = (prev.cx || 0) + 25; // If inserting at the end
            newNode.cy = prev.cy || 20;
          }
          // Shift cx values of subsequent nodes
          let next: TreeNode | null = newNode.next;

          while (next) {
            next.cx = (next.cx || 0) + 25; // Shift cx value for each next node
            next = next.next; // Traverse to the next node
          }
        } else if (!current && position > 1) {
          // Append to the end if position exceeds the list size
          prev!.next = newNode;
          newNode.cx = (prev!.cx || 0) + 25; // Adjust cx for the new tail node
        }

        return root; // Return the original root node
      }
    };

    // Starting at depth 20 and position 0 for the new node
    const updatedRoot = await updateTreeToInsertData({ ...root }, value, position);

    // mark is inserted position
    setRoot({ ...updatedRoot });
    // update input field with random value
    setInputData((prv) => ({
      ...prv,
      insertAtLast: String(Math.floor(Math.random() * 499 + 1)),
      insertAtAnyPosition: String(Math.floor(Math.random() * dataMap.size + 1)),
    }));
    await Sleep(300);

    console.log(value, position);
  };

  return (
    <>
      <div className='container'>
        <div className='flex items-center'>
          <div className='me-4'>
            <input
              className='w-[50px] border-[1px] border-r-[0px] border-black p-[4px] text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              type='number'
              min={1}
              max={999}
              onChange={insertAtLastOnChangeMethod}
              value={inputData.insertAtLast}
              required
              disabled={btnLoading}
            />
            <button
              onClick={insertDataAtTail}
              className={`p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'}`}
            >
              Insert at last
            </button>
          </div>

          <div>
            <input
              className='w-[50px] border-[1px] border-r-[0px] border-black p-[4px] text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              type='number'
              min={1}
              max={999}
              onChange={insertAtAnyPositionOnChangeMethod}
              value={inputData.insertAtAnyPosition}
              required
              disabled={btnLoading}
            />
            <button
              onClick={insertDataByPosition}
              className={`p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'}`}
            >
              Insert by position
            </button>
          </div>
        </div>

        {root ? (
          <svg viewBox='10 0 280 40'>
            <RenderNodeRecursively node={root} />
          </svg>
        ) : null}
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
          <line
            x1={node.cx!}
            y1={node.cy!}
            x2={node.cx! + 25}
            y2={node.cy!}
            stroke={node.isTarget ? 'green' : 'black'}
            strokeWidth={'0.3'}
          />
        )}

        <circle
          cx={node.cx!}
          cy={node.cy!}
          r={6}
          fill={node.isInsertedPosition ? 'red' : node.isCurrent ? 'blue' : node.isTarget ? 'green' : 'white'}
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

export default LinkedListComponent;
