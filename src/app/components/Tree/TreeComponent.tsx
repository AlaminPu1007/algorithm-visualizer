/**
 * A Root tree structure is defined here. This will return a svg after create a Tree structure.
 * @component - A React component
 */
'use client';

import React, { useState } from 'react';
import TreeDFSTraversal from '@/app/utils/TreeDFSTraversal';
import TreeBFSTraversal from '@/app/utils/TreeBFSTraversal';
import { uid } from '@/app/lib/uidGenerator';

const TreeComponent = () => {
  // define a component local memory
  const [activeRootBtnType, setActiveRootBtnType] = useState<string>('dfs');
  const [childBtnActiveType, setChildBtnActiveType] = useState<string>('pre-order');
  const [randomKey, setRandomKey] = useState<string>('1');
  const [speedRange, setSpeedRange] = useState<number>(200);

  /**
   * Performs an In-Order Depth First Search (DFS) traversal of the tree.
   *
   * This method sets the child button type to 'in-order', clears any timeouts,
   * and resets states. It then performs the in-order traversal and resets the states
   * after traversal is complete.
   *
   * @async
   * @function inOrderTechniqueBtnMethod
   * @returns {void}
   */
  const inOrderTechniqueBtnMethod = async () => {
    // Set the button type to 'in-order'
    setChildBtnActiveType('in-order');
  };

  /**
   * Performs a Post-Order Depth First Search (DFS) traversal of the tree.
   *
   * This method sets the child button type to 'post-order', clears any timeouts,
   * and resets states. It performs the post-order traversal and resets the states
   * once traversal is complete.
   *
   * @async
   * @function postOrderTechniqueBtnMethod
   * @returns {void}
   */
  const postOrderTechniqueBtnMethod = () => {
    // Set the button type to 'post-order'
    setChildBtnActiveType('post-order');
  };

  /**
   * Performs a pre-Order Depth First Search (DFS) traversal of the tree.
   *
   * This method sets the child button type to 'pre-order', clears any timeouts,
   * and resets states. It performs the post-order traversal and resets the states
   * once traversal is complete.
   *
   * @async
   * @function preOrderTechniqueBtnMethod
   * @returns {void}
   */
  const preOrderTechniqueBtnMethod = () => {
    // Set the button type to 'pre-order'
    setChildBtnActiveType('pre-order');
  };

  /** submit method to perform current task from start */
  const submitMethod = () => {
    setRandomKey(uid());
  };

  /**
   * onChange method of select
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setActiveRootBtnType(value);
  };

  /**
   * input type range method
   *
   * @param {*} e
   */
  const inputRangeMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedRange(Number(e.target.value));
  };

  return (
    <div>
      <div className='items-end justify-between md:flex'>
        <div>
          {activeRootBtnType === 'dfs' ? (
            <div className='flex justify-between sm:block'>
              <button
                onClick={preOrderTechniqueBtnMethod}
                className={`child-btn ${childBtnActiveType === 'pre-order' ? 'active-child-btn' : ''}`}
              >
                Pre Order
              </button>
              <button
                onClick={inOrderTechniqueBtnMethod}
                className={`child-btn mx-2 ${childBtnActiveType === 'in-order' ? 'active-child-btn' : ''}`}
              >
                In Order
              </button>
              <button
                onClick={postOrderTechniqueBtnMethod}
                className={`child-btn ${childBtnActiveType === 'post-order' ? 'active-child-btn' : ''}`}
              >
                Post Order
              </button>
            </div>
          ) : null}
        </div>
        <div className='mt-4 justify-between min-[455px]:flex md:mt-0 md:justify-start'>
          <div className='me-6 flex w-[160px] flex-col justify-end'>
            <p className='m-0 mb-1 p-0 text-sm'>Speed: {speedRange} (0 to 1500)</p>
            <input
              value={speedRange}
              onChange={inputRangeMethod}
              type='range'
              id='points'
              name='points'
              min='0'
              max='1500'
            />
          </div>
          <div className='max-[455px]:my-3'>
            <p className='text-md m-0 p-0 font-medium'>Select type</p>
            <select
              onChange={handleSelectChange}
              value={activeRootBtnType}
              className='text-md cursor-pointer rounded-sm border-[1px] border-theme-primary px-[5px] py-[4px] outline-none transition-all duration-200 hover:border-theme-btn-secondary'
            >
              <option data-umami-event='selection-from-tree-dfs-traversal' value='dfs'>
                DFS Traversal
              </option>
              <option data-umami-event='selection-from-tree-bfs-traversal' value='bfs'>
                BFS Traversal
              </option>
            </select>

            <button
              onClick={submitMethod}
              className={`ms-3 rounded-sm bg-theme-btn-secondary p-[8px] px-4 text-sm text-white transition-all duration-300`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div>
        {activeRootBtnType === 'dfs' ? (
          <TreeDFSTraversal speedRange={speedRange} key={randomKey} childBtnActiveType={childBtnActiveType} />
        ) : activeRootBtnType === 'bfs' ? (
          <TreeBFSTraversal key={randomKey} speedRange={speedRange} />
        ) : null}
      </div>
    </div>
  );
};

export default TreeComponent;
