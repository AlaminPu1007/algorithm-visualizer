import Link from 'next/link';
import React from 'react';

const FooterComponent = () => (
  <footer id='footer-widget'>
    <div className='container duration-200 md:mt-[80px]'>
      <div className='my-[25px] flex items-center'>
        <Link
          target='_blank'
          href='https://showcase-alamin.vercel.app'
          className='pr-2 text-2xl text-theme-secondary sm:pr-4 sm:text-4xl md:pr-0 dark:text-theme-dark-primary'
          data-umami-event={`visits-personal-portfolio`}
        >
          Alamin
        </Link>

        <div className='ms-auto flex items-center duration-200'>
          <Link
            href='mailto:alamin66.sit@gmail.com'
            className='after-hover-animation relative mb-[2px] me-[40px] hidden text-base text-theme-secondary duration-200 md:inline-block lg:text-lg dark:text-theme-dark-secondary'
            data-umami-event-email={`clicks-on-my-personal-email`}
          >
            alamin66.sit@gmail.com
          </Link>

          <Link href='mailto:alamin66.sit@gmail.com' className='group me-[25px] block cursor-pointer md:hidden'>
            <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M26 13C26 20.1796 20.1796 26 13 26C5.82029 26 0 20.1796 0 13C0 5.82029 5.82029 0 13 0C20.1796 0 26 5.82029 26 13ZM6.5065 9.1C6.5065 8.385 7.085 7.8 7.8 7.8H18.2C18.915 7.8 19.5 8.385 19.5 9.1V16.9C19.5 17.615 18.915 18.2 18.2 18.2H7.8C7.085 18.2 6.5 17.615 6.5 16.9L6.5065 9.1ZM13 13.65L7.80001 10.4V16.9H18.2V10.4L13 13.65ZM13 12.35L7.80001 9.10001H18.2L13 12.35Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className='block h-[0.5px] bg-[#E2E1E5] opacity-80 duration-200 dark:bg-theme-dark-primary dark:opacity-50' />

      <div className='flex flex-col items-center justify-center'>
        <p className='my-[25px] pb-1 text-center text-sm text-theme-primary dark:text-theme-dark-primary'>
          Designed and built by{' '}
          <Link
            target='_blank'
            href='https://showcase-alamin.vercel.app'
            className='footer-txt-gradient'
            data-umami-event={`visits-personal-portfolio`}
          >
            Alamin
          </Link>
          &nbsp;with&nbsp;
          <span className='footer-txt-gradient'>Love </span> & <span className='footer-txt-gradient'>Coffee</span>
        </p>
      </div>
    </div>
  </footer>
);

export default FooterComponent;
