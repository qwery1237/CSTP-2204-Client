import React from 'react';

const AMENITIYLIST = [
  { name: 'Car wash', src: '/carWash.png' },
  { name: 'Air pump', src: '/airPump.png' },
  { name: 'Convenience store', src: '/conv.webp' },
  { name: 'Ev charging station', src: '/ev.webp' },
  { name: 'Truck stop', src: '/truck.webp' },
  { name: 'ATM', src: '/atm.png' },
];

export default function Amenities() {
  return (
    <div className='flex-1 p-4 max-[630px]:px-2 w-full  mt-4 flex-col h-[256px] max-[640px]:h-[415px]'>
      <div className='th text-2xl'>Amenities</div>
      <div className=' relative w-full '>
        <div className=' absolute top-0 w-full'>
          <div className=' mt-4 p-4 rounded-lg  border-[0px] mx-auto w-full   cborder flex flex-row overflow-x-auto gap-x-4 sb max-[640px]:grid max-[640px]:grid-cols-3 max-[640px]:place-content-center'>
            {AMENITIYLIST.map((item) => {
              return (
                <li
                  key={item.name}
                  className=' flex flex-col items-center justify-around py-2 sbg th rounded-lg w-[100%] h-36 my-2'
                >
                  <img
                    className='w-[50px] h-[50px] invert'
                    src={item.src}
                    alt=''
                  />
                  <div className=' text-sm th w-full text-center pb-2 flex flex-row justify-center'>
                    {item.name}
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
