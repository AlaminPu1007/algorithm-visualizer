'use client';

import { updateTreeToInsertData } from '@/app/algorithm/linked-list/singlyLinkedList';
import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { appendToMapWithNewValue } from '@/app/lib/mapUtils';
import { LinkedListInputProps, PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SinglyLinkedList: React.FC<PageProps> = ({ speedRange }) => {
  // define component local state
  const [insertedData, setInsertedData] = useState<number[]>([]);
  const [root, setRoot] = useState<ITreeNode | null>();
  const [btnLoading, setButtonLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<LinkedListInputProps>({
    insertData: '',
    insertAtLast: '',
    insertAtAnyPosition: '1',
    deleteFromAnyPosition: '-1',
  });
  const [dataMap, setDataMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const rootValue = Math.floor(Math.random() + 100);
    const newList = new LinkedList([rootValue]);
    newList.createLinkedList();

    if (newList.head) {
      setRoot(newList.head);
      // update setInsertData as well
      setInsertedData((prv) => [...prv, rootValue]);
      // insert into map
      setDataMap(appendToMapWithNewValue(dataMap, rootValue, rootValue));
      setInputData((prv) => ({ ...prv, insertData: String(Math.floor(Math.random() * 99 + 1)) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle input data for insert at last into linked-list
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const insertDataOnChangeMethod = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(parseInt(e.target.value));

    if (value > 999) {
      toast.error(`Number is too large.`);
    } else if (value < 0) {
      toast.error(`Number is too small.`);
    }

    setInputData((prv) => ({ ...prv, insertData: String(value || '') }));
  };

  /**
   * Handle input change for insert item into any position of given linked list
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const insertAtAnyPositionOnChangeMethod = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(parseInt(e.target.value));

    if (value > dataMap.size + 1 || value <= 0) {
      toast.error(`Invalid position`);
    }
    setInputData((prv) => ({ ...prv, insertAtAnyPosition: String(value || 0) }));
  };

  /**
   * Inserts a new node into the tree/linked list at a specified position with validation.
   *
   * Validates the input position and ensures that the node can be inserted before proceeding
   * with the insertion. If the validation fails, it shows an error message using `toast`.
   * After a successful insertion, the root and input fields are updated, and the loading
   * state is toggled.
   *
   * @async
   * @function insertDataByPosition
   * @returns {Promise<void>} No return value, updates the tree structure and UI state.
   *
   * @throws Will show a toast error for the following cases:
   * - Invalid linked list (`root` is not defined)
   * - Invalid position (position is out of bounds or <= 0)
   * - Exceeding the maximum number of allowed items
   * - Empty input field for `insertData`
   * - Duplicate value insertion (if the item already exists in `dataMap`)
   */
  const insertDataByPosition = async () => {
    const { insertAtAnyPosition, insertData } = inputData;
    const maxItems = 11;

    // Validation checks
    const position = Number(insertAtAnyPosition);
    const value = Number(insertData);

    if (!root) {
      toast.error('Invalid linked list.');
      return;
    }

    if (position > dataMap.size + 1 || position <= 0) {
      toast.error('Invalid position');
      return;
    }

    if (insertedData?.length > maxItems) {
      toast.error(`Max limit exceeded. You can add at most ${maxItems} items.`);
      return;
    }

    if (!value) {
      toast.error('Input field cannot be empty');
      return;
    }

    if (dataMap.has(value)) {
      toast.error('This item already exists');
      return;
    }

    // Indicate loading state
    setButtonLoading((prev) => !prev);

    // Insert data at the specified position
    const updatedRoot = await updateTreeToInsertData(
      { ...root },
      value,
      position,
      speedRange,
      dataMap,
      setDataMap,
      setRoot
    );

    // Update the root with the new node
    setRoot({ ...updatedRoot });

    // Reset input fields with random values
    setInputData((prev) => ({
      ...prev,
      insertData: String(Math.floor(Math.random() * 499 + 1)),
      insertAtAnyPosition: String(Math.floor(Math.random() * dataMap.size + 1)),
    }));

    // Toggle loading state
    setButtonLoading((prev) => !prev);
  };

  return (
    <>
      <div>
        <div className='items-center sm:flex'>
          <div className='flex items-end'>
            <div className='me-4 flex flex-col'>
              <label htmlFor='input-data' className='text-md font-semibold'>
                Data
              </label>
              <input
                className='w-[50px] border-[1px] border-black p-[4px] text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                type='number'
                min={1}
                max={999}
                onChange={insertDataOnChangeMethod}
                value={inputData.insertData}
                required
                disabled={btnLoading}
                id='input-data'
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='insert-position' className='text-md font-semibold'>
                Position
              </label>
              <input
                className='w-[50px] border-[1px] border-black p-[4px] text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                type='number'
                min={1}
                max={999}
                onChange={insertAtAnyPositionOnChangeMethod}
                value={inputData.insertAtAnyPosition}
                required
                disabled={btnLoading}
                id='insert-position'
              />
            </div>
            <button
              onClick={insertDataByPosition}
              className={`ms-1 p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'}`}
            >
              Insert Node
            </button>
          </div>
          <div className='mt-3 flex items-end sm:ms-6 sm:mt-0'>
            <div className='flex flex-col'>
              <label htmlFor='insert-position' className='text-md font-semibold'>
                Delete by position
              </label>
              <div>
                <input
                  className='w-[50px] border-[1px] border-r-[0px] border-black p-[4px] text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  type='number'
                  min={1}
                  max={999}
                  onChange={insertAtAnyPositionOnChangeMethod}
                  value={inputData.deleteFromAnyPosition}
                  required
                  disabled={btnLoading}
                />
                <button
                  onClick={insertDataByPosition}
                  className={`p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-red-500 text-white'} `}
                >
                  Delete Node
                </button>
              </div>
            </div>
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

export default SinglyLinkedList;
