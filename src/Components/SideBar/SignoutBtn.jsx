import React, { useState } from 'react';
import PowerSettingsNewOutlined from '@mui/icons-material/PowerSettingsNewOutlined';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignoutBtn() {
  const [confirm, setConfirm] = useState();
  const { setUserData } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await setUserData();
    navigate('/');
  };
  return (
    <div className='px-2 w-full caret-transparent mt-2 '>
      {!confirm ? (
        <div
          onClick={() => setConfirm(true)}
          className=' flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg '
        >
          <PowerSettingsNewOutlined sx={{ color: '#ffffff', fontSize: 25 }} />
          <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
            Sign out
          </div>
        </div>
      ) : (
        <div className=' flex flex-row  gap-x-4 '>
          <div
            onClick={() => setConfirm(false)}
            className='flex-1 rounded-lg tbg hover:bg-lightMode-bg dark:hover:bg-darkMode-bg py-[18.5px] text-center th text-sm cursor-pointer'
          >
            Cancel
          </div>
          <div
            className=' flex-1  bg-lightMode-button dark:bg-lightMode-button text-lightMode-header  text-sm dark:text-lightMode-header hover:bg-lightMode-buttonHover rounded-lg py-[18.5px] text-center th cursor-pointer'
            onClick={handleLogout}
          >
            Sign out
          </div>
        </div>
      )}
    </div>
  );
}
