import React from 'react';
import PixIcon from '@mui/icons-material/Pix';

const FRAMES = [
  { url: 'level5.jpg', isActive: true, activeMethod: '' },
  { url: 'level10.jpg', isActive: false, activeMethod: 'Unlocks at level 10' },
  { url: 'level10.jpg', isActive: true, activeMethod: '' },
  { url: 'level5.jpg', isActive: false, activeMethod: 'Unlocks at level 25' },
  { url: 'level10.jpg', isActive: false, activeMethod: 700 },
];

export default function Frame() {
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {FRAMES.map((item, index) => (
          <div
            key={item.url + index}
            className={`${item.isActive ? '' : 'relative'}`}
          >
            <div className=' size-[100px] rounded-lg tbg flex justify-center items-center cursor-pointer'>
              <div
                style={{
                  backgroundImage: `url("/frame/${item.url}")`,
                  backgroundSize: 'cover', // Adjust as needed
                  backgroundPosition: 'center', // Adjust as needed
                  // Additional background properties can be added here
                }}
                className=' flex justify-center items-center size-[60px] rounded-full border-0 '
              >
                <div className='size-14 rounded-full tbg' />
              </div>
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
