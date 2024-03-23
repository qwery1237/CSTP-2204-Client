import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function MakeImpact() {
  return (
    <div className=' flex-1 h-full relative '>
      <div className=' absolute  bg  top-[50%] w-full  z-[5]'>
        <div className=' w-full h-[2px] my-1 sbg'></div>
      </div>
      <div className=' absolute  top-0 right-0 w-full h-[90px] overflow-hidden'>
        <div className=' relative  th flex flex-col items-end text-end translateGoUp'>
          <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '28px' }} />
          <div className=' th flex flex-row items-center justify-end text-xl'>
            Contribute &
          </div>
        </div>
      </div>
      <div className=' absolute  bottom-0 right-0 w-full h-[90px] overflow-hidden '>
        <div className=' relative  th flex flex-col text-end translateGoDown'>
          <div className=' th flex flex-row items-center justify-end text-xl'>
            Make an impact
          </div>
        </div>
      </div>
    </div>
  );
}
