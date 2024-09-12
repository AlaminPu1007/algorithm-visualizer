'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { LinkedList } from '../data-structure/LinkedList/LinkedList';
import { ITreeNode } from '../types/TreeTypeProps';

const TEMP_DATA: number[] = [15, 20, 45, 87, 98, 10, 75, 68, 30, 75, 68];

const Page = () => {
  // define component local state
  const [data] = useState<number[]>(TEMP_DATA);
  const [node, setNode] = useState<ITreeNode | null>(null);

  useEffect(() => {
    const newList = new LinkedList(TEMP_DATA, 3, 6);
    newList.createLinkedList();

    if (newList.head) {
      setNode(newList.head);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderNode = (node: ITreeNode | null): ReactNode => {
    if (!node) return null;

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

  return (
    <>
      <div className='container'>
        {data?.length ? (
          <div className='md:flex md:items-center md:justify-end'>
            <p className='m-0 p-0 text-lg font-medium uppercase'>Insert Into List : </p>
            <div className='flex items-center justify-start'>
              {data.map((item, i) => {
                return (
                  <p
                    className='ms-1 flex h-10 w-10 items-center justify-center rounded-sm border text-center font-semibold text-green-600'
                    key={i}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
        {data ? <svg viewBox='10 0 280 40'>{renderNode(node)}</svg> : null}
      </div>
    </>
  );
};

export default Page;
