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

/**
 * A array of object to render bubble sort component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const bubbleSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Current Item',
    bg_color: 'bg-red-600',
  },
  {
    id: 2,
    title: ' Sorted',
    bg_color: 'bg-green-600',
  },
];

/**
 * A array of object to render merge sort component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const mergeSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Completed Sorting',
    bg_color: 'bg-green-600',
  },
  {
    id: 2,
    title: 'Current Left Index',
    bg_color: 'bg-red-600',
  },
  {
    id: 3,
    title: 'Current Right Index',
    bg_color: 'bg-blue-600',
  },
  {
    id: 4,
    title: 'Current Left Half',
    bg_color: 'bg-orange-600',
  },
  {
    id: 5,
    title: 'Current Right Half',
    bg_color: 'bg-purple-600',
  },
];

/**
 * A array of object to render quick sort component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const quickSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Pivot',
    bg_color: 'bg-red-600',
  },
  {
    id: 2,
    title: 'Less than pivot',
    bg_color: 'bg-purple-600',
  },
  {
    id: 3,
    title: 'Greater than pivot',
    bg_color: 'bg-orange-600',
  },
  {
    id: 4,
    title: ' Sorted',
    bg_color: 'bg-green-600',
  },
];

/**
 * A array of object to render heap sort component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const heapSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Will be sorted',
    bg_color: 'bg-red-600',
  },
  {
    id: 2,
    title: 'Swap',
    bg_color: 'bg-purple-600',
  },
  {
    id: 3,
    title: 'Sorted',
    bg_color: 'bg-green-600',
  },
];

/**
 * A array of object to render selection sort component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const selectionSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Current Item',
    bg_color: 'bg-red-600',
  },
  {
    id: 2,
    title: 'Candidate',
    bg_color: 'bg-purple-600',
  },
  {
    id: 3,
    title: 'Current Comparable Item',
    bg_color: 'bg-orange-600',
  },
  {
    id: 4,
    title: 'Sorted',
    bg_color: 'bg-green-600',
  },
];

/**
 * A array of object to render unique-path finding component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const uniquePathFindingSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Bricks',
    bg_color: 'bg-[#575C6B]',
  },
  {
    id: 2,
    title: 'Valid path',
    bg_color: 'bg-black border-[1px]',
  },
  {
    id: 3,
    title: 'Current Item',
    bg_color: 'bg-blue-600',
  },
  {
    id: 4,
    title: 'valid island',
    bg_color: 'bg-green-600',
  },
];

/**
 * A array of object to render No-of-islands finding component color-status
 *
 * @type {StatusColorsDataProps[]}
 */
export const noOfIslandsSortColorsData: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Water',
    bg_color: 'bg-[#1ca3ec]',
  },
  {
    id: 2,
    title: 'Island',
    bg_color: 'bg-[#E99F0C]',
  },
];

/**
 * A list of colors plate for islands
 *
 * @type {string[]}
 */
export const islandColorsPlate: string[] = [
  'bg-[#8A2BE2] text-white', // BlueViolet (dark, white text)
  'bg-[#5F9EA0] text-white', // CadetBlue (muted, white text)
  'bg-[#D2691E] text-white', // Chocolate (earthy brown, white text)
  'bg-[#8B008B] text-white', // DarkMagenta (dark purple, white text)
  'bg-[#556B2F] text-white', // DarkOliveGreen (dark green, white text)
  'bg-[#FF8C00] text-black', // DarkOrange (bright, black text)
  'bg-[#9932CC] text-white', // DarkOrchid (dark purple, white text)
  'bg-[#8B4513] text-white', // SaddleBrown (dark brown, white text)
  'bg-[#2E8B57] text-white', // SeaGreen (dark green, white text)
  'bg-[#FFD700] text-black', // Gold (bright gold, black text)
  'bg-[#DAA520] text-black', // GoldenRod (muted gold, black text)
  'bg-[#4B0082] text-white', // Indigo (dark, white text)
  'bg-[#696969] text-white', // DimGray (dark gray, white text)
  'bg-[#708090] text-white', // SlateGray (muted gray, white text)
  'bg-[#B8860B] text-white', // DarkGoldenRod (rich gold-brown, white text)
  'bg-[#A52A2A] text-white', // Brown (dark brown, white text)
  'bg-[#6A5ACD] text-white', // SlateBlue (dark blue-purple, white text)
  'bg-[#483D8B] text-white', // DarkSlateBlue (dark, white text)
  'bg-[#7FFF00] text-black', // Chartreuse (bright, black text)
  'bg-[#DDA0DD] text-black', // Plum (light purple, black text)
];

/**
 * Linked list visualization basic, inserted/delete/search color plates
 *
 * @type {StatusColorsDataProps[]}
 */
export const basicLinkedListColorsPlate: StatusColorsDataProps[] = [
  {
    id: 1,
    title: 'Inserted/Delete Position',
    bg_color: 'bg-red-600',
  },
  {
    id: 2,
    title: 'Current Item',
    bg_color: 'bg-blue-600',
  },
  {
    id: 3,
    title: 'Target',
    bg_color: 'bg-green-600',
  },
];

/**
 * Linked list visualization basic, inserted/delete/search color plates
 *
 * @type {StatusColorsDataProps[]}
 */
export const reverseListColorsPlate: StatusColorsDataProps[] = [
  {
    id: 2,
    title: 'Target Node',
    bg_color: 'bg-red-600',
  },
  {
    id: 3,
    title: 'Reversed successfully',
    bg_color: 'bg-green-600',
  },
];

/**
 * Linked list visualization merge two sort list
 *
 * @type {StatusColorsDataProps[]}
 */
export const mergeTwoListColorsPlate: StatusColorsDataProps[] = [
  {
    id: 2,
    title: 'Target Node',
    bg_color: 'bg-red-600',
  },
  {
    id: 3,
    title: 'Merged successfully',
    bg_color: 'bg-green-600',
  },
];
