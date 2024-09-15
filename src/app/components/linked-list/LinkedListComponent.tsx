'use client';

import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { Sleep } from '@/app/lib/sleepMethod';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const speedRange = 150;

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
    insertAtLast: String(Math.floor(Math.random() * 99 + 1)),
    insertAtAnyPosition: '',
    deleteFromAnyPosition: '',
  });

  useEffect(() => {
    const newList = new LinkedList([15]);
    newList.createLinkedList();

    if (newList.head) {
      setRoot(newList.head);
      // update setInsertData as well
      setInsertedData((prv) => [...prv, 15]);
    }
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

  const insertNewItem = async () => {
    if (!root) return;

    if (insertedData?.length > 11) {
      toast.error('Max limit exceed. You can add at most 11 items');
      return;
    } else if (!inputData.insertAtLast) {
      toast.error('Input field can not be empty');
      return;
    }

    setButtonLoading((prv) => !prv);

    const value = Number(inputData.insertAtLast);

    // Starting at depth 20 and position 0 for the new node
    const updatedRoot = await updateTree({ ...root }, Number(root.cx), Number(root.cy), value);

    // mark is inserted position
    setRoot({ ...updatedRoot });
    await Sleep(300);

    // update setInsertData as well
    setInsertedData((prv) => [...prv, value]);

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

  return (
    <>
      <div className='container'>
        <div>
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
            onClick={insertNewItem}
            className={`p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'}`}
          >
            Insert at last
          </button>
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
          fill={node.isCurrent ? 'blue' : node.isTarget ? 'green' : 'white'}
          stroke={'black'}
          strokeWidth={'0.2'}
        ></circle>
        <text
          x={node.cx!}
          y={node.cy!}
          dy={2}
          textAnchor='middle'
          className='text-center text-[4px]'
          fill={node.isCurrent || node.isTarget ? 'white' : 'black'}
        >
          {node?.value}
        </text>
      </g>
      {node.next ? <RenderNodeRecursively node={node.next} /> : null}
    </>
  );
};

export default LinkedListComponent;
