'use client';

import {
  updateTreeToDeleteData,
  updateTreeToInsertData,
  updateTreeToSearchNodeData,
} from '@/app/algorithm/linked-list/singlyLinkedListBasics';
import { LINKED_LIST_NODE_START_CX, LINKED_LIST_NODE_START_CY } from '@/app/constant';
import { LinkedList } from '@/app/data-structure/LinkedList/LinkedList';
import { TreeNode } from '@/app/data-structure/Tree/Node';
import { basicLinkedListColorsPlate } from '@/app/data/mockData';
import { appendToMapWithNewValue, hasKey } from '@/app/lib/mapUtils';
import { LinkedListInputProps, PageProps } from '@/app/types/linkedListProps';
import { ITreeNode } from '@/app/types/TreeTypeProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LinkedListBasics: React.FC<PageProps> = ({ speedRange }) => {
  // define component local state
  const [insertedData, setInsertedData] = useState<number[]>([]);
  const [root, setRoot] = useState<ITreeNode | null>();
  const [btnLoading, setButtonLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState<LinkedListInputProps>({
    insertData: '',
    searchItem: '-1',
    insertAtAnyPosition: '1',
    deleteFromAnyPosition: '1',
  });
  const [dataMap, setDataMap] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const rootValue = Math.floor(Math.floor(Math.random() * 99));
    const newList = new LinkedList([rootValue], LINKED_LIST_NODE_START_CX);
    newList.createLinkedList();

    if (newList.head) {
      setRoot(newList.head);
      // update setInsertData as well
      setInsertedData([rootValue]);
      // insert into map
      setDataMap(appendToMapWithNewValue(dataMap, rootValue, rootValue));
      setInputData((prv) => ({
        ...prv,
        insertData: String(Math.floor(Math.floor(Math.random() * 99))),
        searchItem: String(rootValue),
      }));
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
   * get delete node position from users
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const deleteItemFromAnyPositionOnChangeMethod = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(parseInt(e.target.value));

    if (value > dataMap.size || value <= 0) {
      toast.error(`Invalid position`);
    }
    setInputData((prv) => ({ ...prv, deleteFromAnyPosition: String(value || 0) }));
  };

  /**
   * Get search node value from users
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const searchNodeOnChangeMethod = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(parseInt(e.target.value));
    setInputData((prv) => ({ ...prv, searchItem: String(value || 0) }));
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

    if (position > dataMap.size + 1 || position <= 0) {
      toast.error('Invalid position');
      return;
    }

    if (insertedData?.length + 1 > maxItems) {
      toast.error(`Max limit exceeded. You can add at most ${maxItems} items.`);
      return;
    }

    if (!value) {
      toast.error('Input field cannot be empty');
      return;
    }

    if (hasKey(dataMap, value)) {
      toast.error('This item already exists');
      return;
    }

    // if any linked is not present, then created it
    if (!root) {
      const newNode = new TreeNode(value);
      newNode.cx = LINKED_LIST_NODE_START_CX;
      newNode.cy = LINKED_LIST_NODE_START_CY;
      setRoot(newNode);
      setInsertedData((prv) => [...prv, value]);
      // Insert the new value into the map
      setDataMap(appendToMapWithNewValue(dataMap, value, value));
      return;
    }

    // Indicate loading state
    setButtonLoading(true);

    // clearAllTimeouts();

    // Insert data at the specified position
    const updatedRoot = await updateTreeToInsertData(
      { ...root },
      value,
      position,
      speedRange,
      dataMap,
      // setDataMap,
      setRoot
    );

    // Update the root with the new node
    setRoot({ ...updatedRoot });
    setInsertedData((prv) => [...prv, value]);
    // Insert the new value into the map
    setDataMap(appendToMapWithNewValue(dataMap, value, value));
    // Reset input fields with random values
    setInputData((prev) => ({
      ...prev,
      insertData: String(Math.floor(Math.random() * 499 + 1)),
      insertAtAnyPosition: String(Math.floor(Math.random() * dataMap.size + 1)),
    }));

    // Toggle loading state
    setButtonLoading(false);
  };

  /**
   * Asynchronously deletes a node from a linked list at the specified position.
   * The function validates the position, updates the linked list by removing the node at that position, and manages loading states.
   * It also handles errors and displays appropriate messages to the user.
   *
   * @async
   * @function deleteNodeFromGivenList
   * @returns {Promise<void>} A promise that resolves when the deletion process is complete.
   *
   * @throws {Error} Throws an error if the position is invalid or if there's an issue with updating the tree.
   *
   * @description
   * - Retrieves the position to delete from `inputData` (defaults to -1 if not provided).
   * - Validates if the `root` of the linked list is valid and if the position is within bounds.
   * - Sets a loading state while performing the deletion.
   * - Calls `updateTreeToDeleteData` to handle the actual deletion process.
   * - Updates the linked list root and state management hooks (`setRoot`, `setDataMap`, `setInsertedData`).
   * - Catches and logs errors during the process, with development-only error logging.
   */
  const deleteNodeFromGivenList = async () => {
    try {
      const { deleteFromAnyPosition = -1 } = inputData;

      // Validation checks
      const position = Number(deleteFromAnyPosition);

      if (!root) {
        toast.error('Invalid linked list.');
        return;
      }

      if (position > dataMap.size || position <= 0) {
        toast.error('Invalid position');
        return;
      }

      // Indicate loading state
      setButtonLoading((prev) => !prev);

      const updateRoot: ITreeNode | null = await updateTreeToDeleteData(
        { ...root },
        position,
        speedRange,
        setRoot,
        dataMap,
        setDataMap,
        setInsertedData
      );

      setRoot(updateRoot);
      // Indicate loading state
      setButtonLoading((prev) => !prev);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  /**
   * Searches for a node in the linked list based on the input search item.
   * This function updates the state to reflect the search process, including
   * indicating the loading state and handling errors.
   *
   * The function performs the following tasks:
   * 1. Validates the linked list and the existence of the node to search for.
   * 2. Sets a loading state to indicate that the search operation is in progress.
   * 3. Calls `updateTreeToSearchNodeData` to visually search for the node in the list.
   * 4. Updates the input data with a new random search item.
   * 5. Handles potential errors and logs them in development mode.
   *
   * @async
   * @function
   * @name searchNodeFromGivenList
   * @returns {Promise<void>} - Returns a promise that resolves when the search operation is complete.
   *
   * @throws {Error} - Throws an error if the search process encounters issues not handled by the function.
   */
  const searchNodeFromGivenList = async () => {
    try {
      const { searchItem = -1 } = inputData;

      if (!root) {
        toast.error('Invalid linked list.');
        return;
      }

      if (!hasKey(dataMap, Number(searchItem))) {
        toast.error('Invalid node');
        return;
      }

      // Indicate loading state
      setButtonLoading((prev) => !prev);

      await updateTreeToSearchNodeData({ ...root }, Number(searchItem), speedRange, setRoot);
      const targetItem = String(insertedData[Math.floor(Math.random() + insertedData.length - 1) || 0]);
      setInputData((prv) => ({
        ...prv,
        searchItem: targetItem,
      }));
      // setRoot(updateRoot);
      // Indicate loading state
      setButtonLoading((prev) => !prev);
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
        <div className='flex flex-col justify-between md:flex-row md:items-center'>
          <div className='items-center sm:flex'>
            <div className='flex items-end'>
              <div className='me-2 flex flex-col'>
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
                  disabled={btnLoading}
                  id='insert-position'
                />
              </div>
              <button
                onClick={insertDataByPosition}
                className={`ms-1 p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'}`}
                disabled={btnLoading}
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
                    onChange={deleteItemFromAnyPositionOnChangeMethod}
                    value={inputData.deleteFromAnyPosition}
                    disabled={btnLoading}
                  />
                  <button
                    onClick={deleteNodeFromGivenList}
                    className={`p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-red-500 text-white'} `}
                    disabled={btnLoading}
                  >
                    Delete Node
                  </button>
                </div>
              </div>
            </div>

            <div className='mt-3 flex items-end sm:ms-6 sm:mt-0'>
              <div className='flex flex-col'>
                <label htmlFor='insert-position' className='text-md font-semibold'>
                  Search node
                </label>
                <div>
                  <input
                    className='w-[50px] border-[1px] border-r-[0px] border-black p-[4px] text-center outline-none transition-all duration-300 [appearance:textfield] hover:border-theme-btn-secondary focus:border-theme-btn-secondary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    type='number'
                    min={1}
                    max={999}
                    onChange={searchNodeOnChangeMethod}
                    value={inputData.searchItem}
                    disabled={btnLoading}
                  />
                  <button
                    onClick={searchNodeFromGivenList}
                    className={`p-[7px] px-2 text-sm transition-all duration-300 ${btnLoading ? 'bg-gray-500 text-gray-300' : 'bg-theme-btn-secondary text-white'} `}
                    disabled={btnLoading}
                  >
                    Search Node
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-3 md:mt-0'>
            <StatusColorsPlate data={basicLinkedListColorsPlate} />
          </div>
        </div>

        {root ? (
          <svg viewBox='13 0 280 40'>
            <RenderNodeRecursively node={root} />
          </svg>
        ) : (
          <div className='flex min-h-[200px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Invalid Linked List</h1>
          </div>
        )}
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

export default LinkedListBasics;
