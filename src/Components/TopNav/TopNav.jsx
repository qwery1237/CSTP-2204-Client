import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
import CustomInput from '../UI/CustomInput';
import SearchedList from './SearchedList';
import Logo from './Logo';
import SidebarActiveBtn from './SidebarActiveBtn';

export default function TopNav({ setIsProfilePopUp, showSearchbar, children }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const setIsProfilePopUpHandler = () => {
    setIsProfilePopUp(true);
  };
  return (
    <div className=' w-full rounded-lg sbg flex flex-row items-center p-4 gap-x-4 max-[520px]:rounded-none max-[520px]:p-2 max-[520px]:border-b-[1px] cborder'>
      <Logo />
      {isSearchActive && <SearchedList setIsSearchActive={setIsSearchActive} />}
      <div
        onClick={() => setIsSearchActive(true)}
        className=' flex-1 w-full relative max-[520px]:hidden'
      >
        {showSearchbar && (
          <CustomInput placeHolder='Search' paddingLeft='36px'>
            <SearchOutlinedIcon className='absolute left-2 tp text-2xl bottom-[8px]' />
          </CustomInput>
        )}
      </div>
      <div className='flex-1 min-[521px]:hidden'></div>
      <div className=' h-10 rounded-lg tbg cborder border-[1px] flex flex-row items-center caret-transparent '>
        {children}
      </div>
      <SidebarActiveBtn setIsProfilePopUpHandler={setIsProfilePopUpHandler} />
    </div>
  );
}
