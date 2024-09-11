import { StatusColorsDataProps } from '../types/commonProps';

/**
 * A array of object to render binary-search-tree component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const bstSearchColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Target',
    bg_color: 'bg-green-600',
  },
  {
    id: 2,
    title: 'Invalid tree',
    bg_color: 'bg-red-600',
  },
  {
    id: 3,
    title: 'Current node',
    bg_color: 'bg-blue-600',
  },
];
