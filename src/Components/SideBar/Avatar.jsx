import React from 'react';
import PixIcon from '@mui/icons-material/Pix';

const AVATARS = [
  { url: 'oilrig.jpg', isActive: true, activeMethod: '' },
  { url: 'oilrig.jpg', isActive: false, activeMethod: 'Unlocks at level 10' },
  { url: 'oilrig.jpg', isActive: false, activeMethod: 400 },
  { url: 'facebook.png', isActive: true, activeMethod: '' },
  { url: 'oilrig.jpg', isActive: true, activeMethod: '' },
  { url: 'oilrig.jpg', isActive: false, activeMethod: 'Unlocks at level 20' },
  { url: 'google.png', isActive: false, activeMethod: 500 },
];

export default function Avatar() {
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {AVATARS.map((item, index) => (
          <div
            key={item.url + index}
            className={`${item.isActive ? '' : 'relative'}`}
          >
            <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
              <img
                className='size-[60px] rounded-full  cursor-pointer object-cover relative'
                src={item.url}
                alt=''
              />
            </div>
            {item.isActive || (
              <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
                <div className=' w0full h-full flex justify-center items-center th text-xs px-4 text-center'>
                  <div>
                    {isNaN(item.activeMethod) ? (
                      item.activeMethod
                    ) : (
                      <div className='flex items-center justify-center  gap-1'>
                        <PixIcon sx={{ color: 'white', fontSize: 14 }} />
                        {item.activeMethod}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
