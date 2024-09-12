'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { LinkedList } from '../data-structure/LinkedList/LinkedList';
import { ITreeNode } from '../types/TreeTypeProps';

const TEMP_DATA: number[] = [15, 20];

const Page = () => {
  // define component local state
  const [data] = useState<number[]>(TEMP_DATA);
  const [node, setNode] = useState<LinkedList | null>();
  const [root, setRoot] = useState<ITreeNode | null>();

  useEffect(() => {
    const newList = new LinkedList(TEMP_DATA, 3, 6);
    newList.createLinkedList();

    if (newList) {
      setNode(newList);
      if (newList.head) {
        setRoot(newList.head);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNode = (node: ITreeNode | null): ReactNode => {
    if (!node) return;

    return (
      <>
        <g>
          {node?.next && (
            <line x1={node.cx!} y1={node.cy!} x2={node.cx! + 25} y2={node.cy!} stroke={'black'} strokeWidth={'0.3'} />
          )}

          <circle cx={node.cx!} cy={node.cy!} r={6} fill={'white'} stroke={'black'} strokeWidth={'0.2'}></circle>
          <text x={node.cx!} y={node.cy!} dy={2} textAnchor='middle' className='text-center text-[4px]' fill={'black'}>
            {node?.value}
          </text>
        </g>
        {node.next ? renderNode(node.next) : null}
      </>
    );
  };

  const insertNewItem = () => {
    if (!node) return;

    // Insert the new node
    node.insertNodeAtLast(10);

    console.log(node);
    setRoot(node.head);

    // Update state with the new linked list instance
    setNode(node);
  };

  return (
    <>
      <div className='container'>
        <button onClick={insertNewItem}>Insert</button>
        {data?.length ? (
          <div className='md:flex md:items-center md:justify-end'>
            <p className='text-md m-0 p-0 font-medium uppercase md:text-lg'>Insert Into List : </p>
            <div className='flex flex-wrap items-center justify-start'>
              {data.map((item, i) => {
                return (
                  <p
                    className='ms-1 flex h-10 w-10 items-center justify-center rounded-sm border text-center text-sm font-semibold text-green-600'
                    key={i}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
        {root ? <svg viewBox='10 0 280 40'>{renderNode(root)}</svg> : null}
      </div>
    </>
  );
};

export default Page;
