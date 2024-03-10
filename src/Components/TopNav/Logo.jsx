import React from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className='flex items-center gap-x-1 caret-transparent cursor-pointer'
      onClick={() => navigate('/home')}
    >
      <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '28px' }} />
      <div className='flex flex-row items-center  text-lightMode-button '>
        <div className='text-white'>Fuel</div>
        Go
      </div>
    </div>
  );
}
