import React from 'react';
import ContributorList from './ContributorList';

export default function Contributor() {
  return (
    <div className='flex-1 p-4 max-[630px]:px-2  mt-4 flex-col'>
      <div className=' flex flex-row justify-between items-center'>
        <div className='th text-2xl'>Contributors</div>
      </div>
      <div className=' flex flex-row justify-end mt-4 min-[520px]:hidden '>
        <div className=' flex flex-row th border-[1px] cborder rounded-lg w-[150px] cursor-pointer'>
          <div className='flex-1 border-r-[1px] cborder text-center p-2 tb'>
            Month
          </div>
          <div className='flex-1 text-center p-2'>Year</div>
        </div>
      </div>
      <div className=' mt-4 p-4 flex-1 min-[520px]:hidden'>
        <ContributorList isMonth={true} />
      </div>
      <div className=' mt-4 p-4 flex-row flex gap-x-4 max-[520px]:hidden'>
        <ContributorList isMonth={true} />
        <ContributorList isMonth={false} />
      </div>
    </div>
  );
}
