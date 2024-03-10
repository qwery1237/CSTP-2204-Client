import React, { useState } from 'react';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Components/UI/CustomButton';

export default function ChangePassWord() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  // return (
  //   <ChangePassWordComp/>
  // )
  return (
    <>
      <h2 className=' text-white text-2xl font-semibold'>Change password</h2>
      <h4 className=' text-lightMode-p text-sm dark:text-darkMode-p py-2 pb-3'>
        Password must be 6 or more characters long
      </h4>
      <form noValidate>
        <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1'>
          Password*
        </div>
        <div className='w-full relative'>
          <input
            label='Password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 pl-10 customInput mb-3'
          />

          <div className=' absolute top-[10px] left-2 ms'>
            <LockOpenOutlinedIcon sx={{ color: '#747c88' }} />
          </div>
        </div>
        <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1'>
          Confirm password*
        </div>
        <div className='w-full relative'>
          <input
            label='Confirm password'
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='mt-1 pl-10 customInput mb-3'
          />

          <div className=' absolute top-[10px] left-2 ms'>
            <LockOpenOutlinedIcon sx={{ color: '#747c88' }} />
          </div>
        </div>

        {error && (
          <div className='w-full text-center mt-2 text-xs text-lightMode-error dark:text-darkMode-error '>
            {error}
          </div>
        )}
        <div className='mt-4'></div>

        <CustomButton />
        {/* </ThemeProvider> */}
      </form>
      <h4 className=' text-sm  w-full text-center text-lightMode-p dark:text-darkMode-p py-4 pb-3'>
        Back to
        <span
          className='cursor-pointer text-lightMode-button dark:text-darkMode-button pl-1'
          onClick={() => navigate('../login')}
        >
          log in
        </span>
      </h4>
    </>
  );
}
