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
          data-umami-event={`personal-portfolio`}
        >
          Alamin
        </Link>

        <div className='ms-auto flex items-center duration-200'>
          <Link
            href='mailto:alamin66.sit@gmail.com'
            className='after-hover-animation relative mb-[2px] me-[40px] hidden text-base text-theme-secondary duration-200 md:inline-block lg:text-lg dark:text-theme-dark-secondary'
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

          <Link
            href='https://github.com/AlaminPu1007'
            target='_blank'
            className='group me-4 cursor-pointer sm:me-5'
            data-testid='github-link-item'
            data-umami-event={`button-github-from-footer-section`}
          >
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className=''>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12 0C5.37 0 0 5.50583 0 12.3035C0 17.7478 3.435 22.3463 8.205 23.9765C8.805 24.0842 9.03 23.715 9.03 23.3921C9.03 23.0999 9.015 22.131 9.015 21.1005C6 21.6696 5.22 20.347 4.98 19.6549C4.845 19.3012 4.26 18.2092 3.75 17.917C3.33 17.6863 2.73 17.1173 3.735 17.1019C4.68 17.0865 5.355 17.9939 5.58 18.363C6.66 20.2239 8.385 19.701 9.075 19.3781C9.18 18.5783 9.495 18.04 9.84 17.7325C7.17 17.4249 4.38 16.3637 4.38 11.6576C4.38 10.3196 4.845 9.21227 5.61 8.35102C5.49 8.04343 5.07 6.78232 5.73 5.09058C5.73 5.09058 6.735 4.76762 9.03 6.3517C9.99 6.07487 11.01 5.93645 12.03 5.93645C13.05 5.93645 14.07 6.07487 15.03 6.3517C17.325 4.75224 18.33 5.09058 18.33 5.09058C18.99 6.78232 18.57 8.04343 18.45 8.35102C19.215 9.21227 19.68 10.3042 19.68 11.6576C19.68 16.3791 16.875 17.4249 14.205 17.7325C14.64 18.1169 15.015 18.8552 15.015 20.0086C15.015 21.6542 15 22.9768 15 23.3921C15 23.715 15.225 24.0995 15.825 23.9765C18.2072 23.1519 20.2772 21.5821 21.7437 19.4881C23.2101 17.3942 23.9993 14.8814 24 12.3035C24 5.50583 18.63 0 12 0Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
            </svg>
          </Link>
          <Link
            href='https://stackoverflow.com/users/9572927/md-al-amin'
            target='_blank'
            className='group me-3 cursor-pointer sm:me-4'
          >
            <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M15 25C17.6522 25 20.1957 23.9464 22.0711 22.0711C23.9464 20.1957 25 17.6522 25 15C25 12.3478 23.9464 9.80429 22.0711 7.92893C20.1957 6.05357 17.6522 5 15 5C12.3478 5 9.80429 6.05357 7.92893 7.92893C6.05357 9.80429 5 12.3478 5 15C5 17.6522 6.05357 20.1957 7.92893 22.0711C9.80429 23.9464 12.3478 25 15 25ZM15 27.5C8.09625 27.5 2.5 21.9037 2.5 15C2.5 8.09625 8.09625 2.5 15 2.5C21.9037 2.5 27.5 8.09625 27.5 15C27.5 21.9037 21.9037 27.5 15 27.5Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
              <path
                d='M18.4325 20.085V16.79H19.4725V21.1787H10.0812V16.79H11.1212V20.085H18.4325Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
              <path
                d='M12.27 16.4775L17.3788 17.6L17.595 16.52L12.4863 15.3975L12.27 16.4775ZM12.945 13.92L17.6763 16.2363L18.1075 15.2413L13.3788 12.9125L12.9463 13.92H12.945ZM14.2575 11.4775L18.27 14.9863L18.9325 14.1488L14.92 10.6388L14.2575 11.4775ZM16.8513 8.8775L16.0138 9.53125L19.1213 13.935L19.9588 13.2813L16.8513 8.8775ZM12.1625 18.9775H17.3788V17.8838H12.1625V18.9775Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
            </svg>
          </Link>

          <Link href={'https://twitter.com/Alamin66Sit'} target='_blank' className='group me-4 cursor-pointer sm:me-5'>
            <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12.875 0.875C6.24821 0.875 0.875 6.24821 0.875 12.875C0.875 19.5018 6.24821 24.875 12.875 24.875C19.5018 24.875 24.875 19.5018 24.875 12.875C24.875 6.24821 19.5018 0.875 12.875 0.875ZM18.642 9.92054C18.65 10.0464 18.65 10.1777 18.65 10.3063C18.65 14.2384 15.6554 18.7679 10.183 18.7679C8.49554 18.7679 6.93125 18.2777 5.61339 17.4339C5.85446 17.4607 6.08482 17.4714 6.33125 17.4714C7.72411 17.4714 9.00446 17 10.025 16.2018C8.71786 16.175 7.61964 15.3179 7.24464 14.1393C7.70268 14.2063 8.11518 14.2063 8.58661 14.0857C7.91355 13.949 7.30859 13.5834 6.87451 13.0512C6.44042 12.519 6.20398 11.8529 6.20536 11.1661V11.1286C6.59911 11.3509 7.0625 11.4875 7.54732 11.5062C7.13976 11.2346 6.80551 10.8666 6.57423 10.4349C6.34294 10.0032 6.22176 9.52103 6.22143 9.03125C6.22143 8.47679 6.36607 7.97054 6.62589 7.53125C7.37295 8.4509 8.30517 9.20306 9.36196 9.73884C10.4187 10.2746 11.5764 10.582 12.7598 10.6411C12.3393 8.61875 13.85 6.98214 15.6661 6.98214C16.5232 6.98214 17.2946 7.34107 17.8384 7.91964C18.5107 7.79375 19.1536 7.54196 19.7268 7.20446C19.5045 7.89286 19.0384 8.47411 18.4196 8.84107C19.0196 8.77679 19.5982 8.61071 20.1339 8.37768C19.7295 8.97232 19.2232 9.5 18.642 9.92054V9.92054Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
            </svg>
          </Link>
          <Link href={'https://www.linkedin.com/in/md-alamin66/'} target='_blank' className='group cursor-pointer'>
            <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12.6 0.599976C5.97251 0.599976 0.600006 5.97248 0.600006 12.6C0.600006 19.2275 5.97251 24.6 12.6 24.6C19.2275 24.6 24.6 19.2275 24.6 12.6C24.6 5.97248 19.2275 0.599976 12.6 0.599976ZM9.66251 17.5737H7.23251V9.75373H9.66251V17.5737ZM8.43251 8.79373C7.66501 8.79373 7.16876 8.24998 7.16876 7.57748C7.16876 6.89123 7.68001 6.36373 8.46376 6.36373C9.24751 6.36373 9.72751 6.89123 9.74251 7.57748C9.74251 8.24998 9.24751 8.79373 8.43251 8.79373ZM18.5375 17.5737H16.1075V13.24C16.1075 12.2312 15.755 11.5462 14.8763 11.5462C14.205 11.5462 13.8063 12.01 13.63 12.4562C13.565 12.615 13.5488 12.84 13.5488 13.0637V17.5725H11.1175V12.2475C11.1175 11.2712 11.0863 10.455 11.0538 9.75248H13.165L13.2763 10.8387H13.325C13.645 10.3287 14.4288 9.57623 15.74 9.57623C17.3388 9.57623 18.5375 10.6475 18.5375 12.95V17.5737V17.5737Z'
                fill='#42446E'
                className='duration-200 group-hover:fill-theme-btn dark:fill-theme-btn dark:group-hover:fill-white'
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className='block h-[0.5px] bg-[#E2E1E5] opacity-80 duration-200 dark:bg-theme-dark-primary dark:opacity-50' />

      <div className='my-[25px] flex flex-col items-center justify-between lg:flex-row'>
        <ul className='flex w-full flex-wrap items-center justify-center lg:w-auto lg:justify-start'>
          <li>
            <Link href={'/'} className='footer-nav-link me-4'>
              Home
            </Link>
          </li>
          <li>
            <Link href={'/tree'} className='footer-nav-link mx-4'>
              Tree
            </Link>
          </li>
          <li>
            <Link href={'/n-queens'} className='footer-nav-link mx-4'>
              N-Queens
            </Link>
          </li>
          <li>
            <Link href={'/sorting'} className='footer-nav-link mx-4'>
              Sorting
            </Link>
          </li>
        </ul>

        <p className='mt-[25px] pb-1 text-center text-sm text-theme-primary lg:mt-0 dark:text-theme-dark-primary'>
          Designed and built by{' '}
          <Link
            target='_blank'
            href='https://showcase-alamin.vercel.app'
            className='footer-txt-gradient'
            data-umami-event={`personal-portfolio`}
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
