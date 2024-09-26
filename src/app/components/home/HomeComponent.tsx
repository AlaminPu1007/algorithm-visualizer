/* eslint-disable indent */
'use client';

import { projectsData } from '@/app/data/dashboardSchemaData';
import { ProjectSchema } from '@/app/types/commonProps';
import Link from 'next/link';
import { ReactNode } from 'react';

const HomeComponent = (): ReactNode => {
  return (
    <div className='container'>
      <div>
        {projectsData ? (
          <div className='mt-[40px] grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
            {projectsData.map((item: ProjectSchema) => {
              return (
                <Link
                  key={item.id}
                  className='group relative min-h-[250px] overflow-hidden rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-300 hover:border-theme-btn-secondary hover:shadow-lg'
                  href={item.navigate}
                >
                  <div className='flex h-full items-center justify-start p-4'>
                    <div className='w-full'>
                      <h2 className='m-0 w-full p-0 pb-2 text-center text-3xl font-medium uppercase'>{item.name}</h2>
                      <div className='flex flex-wrap items-center justify-center'>
                        {item.lists?.length
                          ? item.lists.map((i) => (
                              <p
                                key={i.id}
                                className='p me-2 mt-2 break-words rounded-full border bg-gray-100 px-4 py-1 text-sm transition-all duration-300 group-hover:border-theme-btn-secondary'
                              >
                                {i.name}
                              </p>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className='flex min-h-[250px] w-full items-center justify-center'>
            <h1 className='text-center text-4xl font-medium'>Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
