'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';

const TreeIcon = (
  <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 2C9.243 2 7 4.243 7 7c0 1.54.765 2.946 2 3.757V12H7v3h2v2H7v3h3v-5h4v5h3v-3h-2v-2h2v-3h-2v-1.243C16.235 9.946 17 8.54 17 7c0-2.757-2.243-5-5-5zm0 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z' />
  </svg>
);

const SortIcon = (
  <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M3 3h18v2H3V3zm2 6h14v2H5V9zm4 6h10v2H9v-2z' />
  </svg>
);

const PathFindingIcon = (
  <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M11 2v4h2V4h5v5h-2v2h4V2H11zM6 6h2v2H6V6zm-4 4h2v10h10v2H2V10zm8 8h2v2h-2v-2zm6-6v2H6v-2h10z' />
  </svg>
);

const SearchIcon = (
  <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M21.71 20.29l-3.39-3.39A8.47 8.47 0 1 0 18 14.47l3.39 3.39a1 1 0 0 0 1.41-1.41l-3.39-3.39A10.5 10.5 0 1 1 22 14.47a10.5 10.5 0 0 1-0.29 5.82zM11 17a6 6 0 1 0-6-6 6 6 0 0 0 6 6z' />
  </svg>
);

const algorithmCategories = [
  {
    title: 'Tree Algorithms',
    description: 'Explore tree traversal algorithms like BFS and DFS.',
    link: '/tree',
    icon: TreeIcon,
  },
  {
    title: 'Sorting Algorithms',
    description: 'Visualize sorting algorithms like Merge, Quick, Heap, etc.',
    link: '/sorting',
    icon: SortIcon,
  },
  {
    title: 'Path-Finding Algorithms',
    description: 'Discover path-finding algorithms like A*, Dijkstra.',
    link: '/path-finding',
    icon: PathFindingIcon,
  },
  {
    title: 'Searching Algorithms',
    description: 'Search algorithms including Binary Search, Linear Search.',
    link: '/searching',
    icon: SearchIcon,
  },
];

const HomeComponent = () => {
  return (
    <div className='container'>
      <div className='py-8'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {algorithmCategories.map((category, index) => (
              <AlgorithmCard
                key={index}
                title={category.title}
                description={category.description}
                link={category.link}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;

interface AlgorithmCardProps {
  title: string;
  description: string;
  link: string;
  icon: ReactNode;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ title, description, link, icon }) => {
  return (
    <Link href={link}>
      <div className='flex transform cursor-pointer flex-col items-center rounded-lg bg-[#F5F7FE] p-6 shadow-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl'>
        <div className='mb-4 h-12 w-12 text-indigo-500'>{icon}</div>
        <h3 className='mb-2 text-center text-2xl font-semibold'>{title}</h3>
        <p className='text-center text-gray-600'>{description}</p>
      </div>
    </Link>
  );
};
