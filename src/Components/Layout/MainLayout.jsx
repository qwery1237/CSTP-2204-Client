import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div className='w-screen h-screen  bg-lightMode-bg dark:bg-darkMode-bg absolute z-20'>
      <div className='flex w-full h-full justify-center'>
        <div className=' w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden'>
          {children}
        </div>
      </div>
    </div>
  );
}
