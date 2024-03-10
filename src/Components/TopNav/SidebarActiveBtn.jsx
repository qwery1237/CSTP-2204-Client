import React from 'react';

export default function SidebarActiveBtn({ setIsProfilePopUpHandler }) {
  return (
    <div
      style={{
        backgroundImage: 'url("/frame/level5.jpg")',
        backgroundSize: 'cover', // Adjust as needed

        backgroundPosition: 'center', // Adjust as needed
        // Additional background properties can be added here
      }}
      className=' flex justify-center items-center size-[40px] rounded-full border-0 min-[1001px]:hidden max-[520px]:hidden'
    >
      <img
        onClick={setIsProfilePopUpHandler}
        className='size-9 rounded-full  cursor-pointer object-cover relative'
        src='/oilrig.jpg'
        alt=''
      />
    </div>
  );
}
