import React from 'react';
import Profile from './Profile';
import BgBlackOpacity from '../BgBlackOpacity';
import BottomNav from '../BottomNav/BottomNav';

export default function SideBar({
  isProfileScreen,
  isProfilePopUp,
  setIsProfilePopUp,
  visible,
}) {
  const sideBarCSS = isProfileScreen
    ? ' w-full h-[calc(100%-56px)] bg-lightMode-bg dark:bg-darkMode-bg'
    : ' w-[312px] h-full bg-lightMode-sbg dark:bg-darkMode-sbg' +
      (visible ? '' : ' max-[1000px]:hidden rounded-xl');

  if (isProfilePopUp) {
    const handleClose = (e) => {
      if (e.clientX <= 312) return;
      setIsProfilePopUp(false);
    };
    return (
      <BgBlackOpacity>
        <div
          onClick={handleClose}
          className=' absolute top-0 w-screen h-screen z-10'
        >
          <div className='w-[312px] h-full animate-slide-in '>
            <SideBar visible />
          </div>
        </div>
      </BgBlackOpacity>
    );
  }
  return (
    <>
      <div className={sideBarCSS}>
        <div className='w-full h-full  flex flex-col  overflow-auto'>
          <Profile />
        </div>
      </div>
      {isProfileScreen && <BottomNav />}
    </>
  );
}
