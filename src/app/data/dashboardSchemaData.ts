/*
 * A dummy json data for home component.
 */

import { uid } from '../lib/uidGenerator';
import { ProjectSchema } from '../types/commonProps';

export const projectsData: ProjectSchema[] = [
  {
    id: uid(),
    name: 'Sudoku Solver',
    navigate: '/sudoku-solver',
    lists: [
      {
        id: uid(),
        name: 'DFS',
      },
    ],
  },
  {
    id: uid(),
    name: 'Tree',
    navigate: '/tree',
    lists: [
      {
        id: uid(),
        name: 'DFS (in-order, pre-order, post-order)',
      },
      {
        id: uid(),
        name: 'BFS',
      },
    ],
  },
  {
    id: uid(),
    name: 'N Queens',
    lists: [],
    navigate: '/n-queens',
  },
  {
    id: uid(),
    name: 'Sorting',
    lists: [
      {
        id: uid(),
        name: 'Merge',
      },
      {
        id: uid(),
        name: 'Quick',
      },
      {
        id: uid(),
        name: 'Heap',
      },
      {
        id: uid(),
        name: 'Bubble',
      },
      {
        id: uid(),
        name: 'Selection',
      },
    ],
    navigate: '/sorting',
  },
  {
    id: uid(),
    name: 'Path Finding',
    lists: [
      {
        id: uid(),
        name: 'Dijkstra',
      },
      {
        id: uid(),
        name: 'Rat in maze',
      },
      {
        id: uid(),
        name: 'No of Island',
      },
    ],
    navigate: '/path-finding',
  },
  {
    id: uid(),
    name: 'Searching',
    lists: [
      {
        id: uid(),
        name: 'Binary Search',
      },
    ],
    navigate: '/searching',
  },
  {
    id: uid(),
    name: 'Linked List',
    lists: [
      {
        id: uid(),
        name: 'Reverse list',
      },
      {
        id: uid(),
        name: 'Merge two list',
      },
      {
        id: uid(),
        name: 'Basic (CRUD)',
      },
      {
        id: uid(),
        name: 'Detect Cycle',
      },
    ],
    navigate: '/linked-list',
  },
];
