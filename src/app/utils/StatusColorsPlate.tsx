import React from 'react';
import { StatusColorsDataProps } from '../types/commonProps';

interface StatusColorsPlateProps {
  data: StatusColorsDataProps[];
}

const StatusColorsPlate: React.FC<StatusColorsPlateProps> = ({ data = [] }) => {
  if (!data?.length) {
    return (
      <div>
        <h1>No items is found!</h1>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-start space-x-3'>
      {data.map((item) => {
        return (
          <div key={item.id} className='group relative'>
            <div className={`h-5 w-5 ${item.bg_color}`}></div>
            <span className='absolute bottom-full mb-2 hidden rounded bg-gray-800 p-2 text-xs text-white group-hover:block'>
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusColorsPlate;
