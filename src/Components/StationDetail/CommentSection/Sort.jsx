import React from 'react';
import SortIcon from '@mui/icons-material/Sort';

export default function Sort({ isSortPopUp }) {
  return (
    <div className=' relative'>
      <div className=' h-10 rounded-lg border-[1px] cborder flex items-center justify-center tp px-2 sbg cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header gap-x-1'>
        <SortIcon />
        <div>Sort</div>
      </div>
      {isSortPopUp && (
        <div className=' absolute bottom-[-132px] left-[-42px] rounded-lg border-[1px] cborder flex flex-col tp text-sm px-4 sbg'>
          <div className='  py-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            Most liked
          </div>
          <div className=' pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            Recent
          </div>
          <div className=' pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            Highest rated
          </div>
          <div className=' pb-2 cursor-pointer hover:text-lightMode-header hover:dark:text-darkMode-header'>
            lowest rated
          </div>
        </div>
      )}
    </div>
  );
}
