'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const HeaderComponent = () => {
  const ref = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();

  // define local state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // This module is for to detect user outside click of the given id
  // It will help us to close our open navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: Event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          if (isDrawerOpen) setIsDrawerOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
  }, [isDrawerOpen]);

  /**
   * description :- This method will trigger/open drawer navigation
   * @created_by :- {Al-Amin}
   * @created_at :- 8/08/2024
   */
  const openDrawerNav = () => setIsDrawerOpen((prv) => !prv);

  /**
   * description :- In mobile view if drawer is already opened, then need to close it
   * @created_by :- {Al-Amin}
   * @created_at :- 8/08/2024
   */
  const onCloseDrawerNav = () => (isDrawerOpen ? setIsDrawerOpen(false) : null);

  return (
    <nav className='pt-[5px] lg:pt-[20px]'>
      {/* for drawer navigation only lg: 1024 screen size */}
      <div className='container relative py-[20px]'>
        <div className='nav-wrapper flex'>
          <Link
            href='/'
            // className='bg-custom-gradient bg-clip-text pr-4 text-4xl font-bold tracking-wider text-transparent md:pr-0'
            className='m-0 flex items-center p-0 pr-4 text-center text-3xl font-semibold tracking-wider text-theme-secondary sm:text-4xl md:pr-0 dark:text-white'
          >
            HOME
          </Link>
          <ul
            className={`navbar z-50 ${isDrawerOpen ? 'max-[1023px]:translate-x-[0]' : 'max-[1023px]:translate-x-[-100%]'}`}
            id='drawer-navigation'
            ref={ref}
          >
            <li className='flex items-center justify-between lg:hidden'>
              <Link
                href='/'
                className={`mb-3 pr-4 text-3xl font-semibold tracking-wider text-theme-secondary sm:text-4xl md:pr-0 dark:text-white`}
                onClick={onCloseDrawerNav}
              >
                ALAMIN
              </Link>
              <div className='absolute right-3 top-9 block lg:hidden'>
                <button
                  onClick={openDrawerNav}
                  className={`relative mt-2 flex h-[18px] w-[26px] cursor-pointer flex-col justify-between duration-300 ease-in`}
                >
                  <span
                    className={`delay-400 absolute top-0 inline h-[2px] w-full bg-theme-primary duration-300 ease-in dark:bg-white dark:opacity-70 ${isDrawerOpen ? 'rotate-[45deg]' : 'rotate-[0deg]'}`}
                  ></span>
                  <span
                    className={`delay-400 inline h-[2px] w-full bg-theme-primary duration-300 ease-in dark:bg-white dark:opacity-70 ${isDrawerOpen ? 'rotate-[-45deg]' : 'rotate-[0deg]'}`}
                  ></span>
                </button>
              </div>
            </li>
            <li>
              <Link
                href='/tree'
                className={`nav-list-item-link dark:hover:bg-initial text-center dark:hover:text-theme-dark-primary ${pathname === '/tree' ? 'after:w-full' : ''}`}
                onClick={onCloseDrawerNav}
              >
                Tree
              </Link>
            </li>
            <li className='lg:lg:mx-2'>
              <Link
                href='/n-queens'
                className={`nav-list-item-link ${pathname === '/n-queens' ? 'after:w-full' : ''}`}
                onClick={onCloseDrawerNav}
              >
                N-Queens
              </Link>
            </li>
            <li className='lg:mx-2'>
              <Link
                href='/sorting'
                className={`nav-list-item-link ${pathname === '/sorting' ? 'after:w-full' : ''}`}
                onClick={onCloseDrawerNav}
              >
                Sorting
              </Link>
            </li>

            <li className='lg:mx-2'>
              <Link
                href='/path-finding'
                className={`nav-list-item-link ${pathname === '/path-finding' ? 'after:w-full' : ''}`}
                onClick={onCloseDrawerNav}
              >
                Path finding
              </Link>
            </li>

            <li className='lg:mx-2'>
              <Link
                href='/searching'
                className={`nav-list-item-link ${pathname === '/searching' ? 'after:w-full' : ''}`}
                onClick={onCloseDrawerNav}
              >
                Searching
              </Link>
            </li>
            <li className='lg:mx-2'>
              <Link
                href='/linked-list'
                className={`nav-list-item-link ${pathname === '/linked-list' ? 'after:w-full' : ''}`}
                onClick={onCloseDrawerNav}
              >
                Linked list
              </Link>
            </li>

            <li className='mt-2 flex lg:mx-2 lg:mt-0'>
              <Link
                href='https://github.com/AlaminPu1007/algorithm-visualizer'
                target='_blank'
                className='group me-4 cursor-pointer sm:me-5'
                data-testid='github-link-item'
                data-umami-event={`nav-github-repo`}
                onClick={onCloseDrawerNav}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-[95%] w-[95%]'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12 0C5.37 0 0 5.50583 0 12.3035C0 17.7478 3.435 22.3463 8.205 23.9765C8.805 24.0842 9.03 23.715 9.03 23.3921C9.03 23.0999 9.015 22.131 9.015 21.1005C6 21.6696 5.22 20.347 4.98 19.6549C4.845 19.3012 4.26 18.2092 3.75 17.917C3.33 17.6863 2.73 17.1173 3.735 17.1019C4.68 17.0865 5.355 17.9939 5.58 18.363C6.66 20.2239 8.385 19.701 9.075 19.3781C9.18 18.5783 9.495 18.04 9.84 17.7325C7.17 17.4249 4.38 16.3637 4.38 11.6576C4.38 10.3196 4.845 9.21227 5.61 8.35102C5.49 8.04343 5.07 6.78232 5.73 5.09058C5.73 5.09058 6.735 4.76762 9.03 6.3517C9.99 6.07487 11.01 5.93645 12.03 5.93645C13.05 5.93645 14.07 6.07487 15.03 6.3517C17.325 4.75224 18.33 5.09058 18.33 5.09058C18.99 6.78232 18.57 8.04343 18.45 8.35102C19.215 9.21227 19.68 10.3042 19.68 11.6576C19.68 16.3791 16.875 17.4249 14.205 17.7325C14.64 18.1169 15.015 18.8552 15.015 20.0086C15.015 21.6542 15 22.9768 15 23.3921C15 23.715 15.225 24.0995 15.825 23.9765C18.2072 23.1519 20.2772 21.5821 21.7437 19.4881C23.2101 17.3942 23.9993 14.8814 24 12.3035C24 5.50583 18.63 0 12 0Z'
                    fill='#42446E'
                    className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        {!isDrawerOpen ? (
          <div className='absolute right-[2%] top-[30px] flex duration-200 ease-in lg:hidden'>
            <button className='relative flex h-[18px] w-[26px] flex-col justify-between' onClick={openDrawerNav}>
              <span className='inline h-[2px] w-full bg-theme-primary dark:bg-white dark:opacity-70'></span>
              <span className='inline h-[2px] w-full bg-theme-primary dark:bg-white dark:opacity-70'></span>
              <span className='inline h-[2px] w-full bg-theme-primary dark:bg-white dark:opacity-70'></span>
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default HeaderComponent;
