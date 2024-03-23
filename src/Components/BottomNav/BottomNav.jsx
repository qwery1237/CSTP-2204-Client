import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
const NAVLIST = [
  { path: '/home', icon: <HomeIcon sx={{ fontSize: 30 }} /> },
  { path: '/search', icon: <SearchIcon sx={{ fontSize: 30 }} /> },
  { path: '/rewards', icon: <WalletOutlinedIcon sx={{ fontSize: 30 }} /> },
  { path: '/favourite', icon: <FavoriteIcon sx={{ fontSize: 30 }} /> },
  { path: '/profile', icon: <AccountCircleIcon sx={{ fontSize: 30 }} /> },
];
export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navList = NAVLIST.map(({ path, icon }) => {
    return { path, icon, isActive: path === pathname };
  });

  return (
    <nav className='w-full min-[520px]:hidden absolute bottom-0'>
      <ul className='h-[56px] w-full flex flex-row justify-evenly items-center sbg border-t-[1px] cborder'>
        {navList.map(({ path, icon, isActive }) => (
          <div
            key={path}
            onClick={() => navigate(path)}
            className={` ${
              isActive
                ? 'tb'
                : 'tp hover:text-lightMode-header dark:hover:text-darkMode-header'
            }  cursor-pointer `}
          >
            {icon}
          </div>
        ))}
      </ul>
    </nav>
  );
}
