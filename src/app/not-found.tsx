import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className='container flex min-h-[40vh] items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-5xl tracking-widest dark:text-white'>404</h1>
          <p className='py-4 pb-5 text-lg dark:text-white'>Could not find requested resource</p>
          <Link
            href='/'
            className='duration:500 inline-block rounded-full border-[0.5px] bg-theme-btn px-6 py-2 text-sm text-white shadow-sm dark:border-white dark:bg-transparent dark:text-white dark:hover:border-[transparent] dark:hover:bg-theme-btn'
          >
            Go to home
          </Link>
        </div>
      </div>
    </>
  );
}
