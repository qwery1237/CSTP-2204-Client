import React from 'react';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

export default function ChatOverView() {
  return (
    <>
      <div className=' flex flex-row  px-4 cursor-pointer tbg rounded-lg py-2 mb-2 hover:bg-lightMode-bg hover:dark:bg-darkMode-bg'>
        <div className='flex h-full flex-col justify-center'>
          <img
            src='/oilrig.jpg'
            className=' size-10 rounded-full object-cover'
            alt=''
          />
        </div>
        <div className=' flex-1 px-2 flex flex-col justify-around'>
          <div className=' th text-xs w-[170px] max-[310px]:w-[160px] max-[300px]:w-[150px] max-[290px]:w-[140px]  text-ellipsis whitespace-nowrap overflow-hidden'>
            I have issue with my point redeem
          </div>
          <div className=' tp text-xs'>Luka . 20 min</div>
        </div>
        <div className=' flex h-auto flex-row justify-center items-center th'>
          <NavigateNextOutlinedIcon />
        </div>
      </div>
    </>
  );
}
