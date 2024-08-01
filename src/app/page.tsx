import React from 'react';
import TreeComponent from './components/Tree/TreeComponent';

const page = () => {
  return (
    <>
      <div className='container'>
        {/* for jest */}
        <h1 className='py-5 text-center text-3xl'>Hello world!</h1>
      </div>

      <div className='container'>
        <TreeComponent />
      </div>
    </>
  );
};

export default page;
