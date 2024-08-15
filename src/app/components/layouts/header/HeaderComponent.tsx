'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const HeaderComponent = () => {
  // define local state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const ref = useRef<HTMLUListElement | null>(null);

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
                className={`nav-list-item-link dark:hover:bg-initial text-center dark:hover:text-theme-dark-primary`}
                onClick={onCloseDrawerNav}
              >
                Tree
              </Link>
            </li>
            <li className='lg:lg:mx-2'>
              <Link
                href='/n-queens'
                className='nav-list-item-link'
                onClick={onCloseDrawerNav}
              >
                N-Queens
              </Link>
            </li>
            <li className='lg:mx-2'>
              <Link
                href='/sorting'
                className='nav-list-item-link'
                onClick={onCloseDrawerNav}
              >
                Sorting
              </Link>
            </li>
            <li className='lg:mx-2'>
              <Link
                href='/#my-personal-projects'
                className='nav-list-item-link'
                onClick={onCloseDrawerNav}
              >
                Projects
              </Link>
            </li>
            <li className='lg:mx-2'>
              <Link
                href='/blog'
                className='nav-list-item-link'
                onClick={onCloseDrawerNav}
                data-umami-event={`button-blog-link`}
              >
                Blog
              </Link>
            </li>
            <li className='lg:mx-2'>
              <Link
                href='/#footer-widget'
                className='nav-list-item-link'
                onClick={onCloseDrawerNav}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {!isDrawerOpen ? (
          <div className='absolute right-[2%] top-[30px] flex duration-200 ease-in lg:hidden'>
            <button
              className='relative flex h-[18px] w-[26px] flex-col justify-between'
              onClick={openDrawerNav}
            >
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
