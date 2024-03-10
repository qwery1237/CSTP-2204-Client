import React from 'react';
import { ThumbUp } from '@mui/icons-material';

export default function Comment() {
  return (
    <div className='w-full rounded-lg border-[1px] cborder p-4 flex-col flex'>
      <div className='flex flex-row gap-x-2'>
        <div
          style={{
            backgroundImage: 'url("/frame/level5.jpg")',
            backgroundSize: 'cover', // Adjust as needed

            backgroundPosition: 'center', // Adjust as needed
            // Additional background properties can be added here
          }}
          className=' flex justify-center items-center size-[40px] rounded-full border-0'
        >
          <img
            onClick={() => setIsProfilePopUpHandler()}
            className='size-9 rounded-full  cursor-pointer object-cover relative'
            src='/oilrig.jpg'
            alt=''
          />
        </div>
        <div className=' flex flex-col justify-evenly'>
          <div className=' text-sm th'>Harinder</div>
          <div className=' text-xs tp'>Level 2</div>
        </div>
        <div className='flex-1'></div>
        <div className=' tp flex justify-between items-center flex-col'>
          <div className=' cursor-pointer'>
            <ThumbUp sx={{ fontSize: 20 }} />
          </div>

          <div className=' text-xs  tp'>23</div>
        </div>
      </div>

      <div className=' text-sm th my-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        molestiae natus aspernatur quidem accusamus inventore voluptate
        laboriosam deserunt ipsa? Maxime voluptatibus veritatis enim ipsa amet
        esse dolor vel fugit repudiandae?
      </div>
      <div className='grid grid-cols-3 gap-2 md:grid-cols-2  max-h-[200px] overflow-y-auto'>
        <img src='/oilrig.jpg' alt='' />
        <img src='/oilrig.jpg' alt='' />
        <img src='/oilrig.jpg' alt='' />
        <img src='/oilrig.jpg' alt='' />
      </div>
    </div>
  );
}
