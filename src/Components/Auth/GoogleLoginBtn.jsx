import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import CustomButton from '../UI/CustomButton';
import googleImg from '/google.png';

export default function GoogleLoginBtn() {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        // Todo post google login to backend
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log('Login Failed:', error),
  });
  return (
    <div className='flex flex-row justify-between items-center gap-x-4 pt-5'>
      <CustomButton bgColor='#141d2c' handleClick={login} hoverDarker>
        {' '}
        <div className='flex items-center justify-center'>
          <img
            className='w-6  cursor-pointer  rounded-full'
            src={googleImg}
            alt=''
          />

          <div className='ml-2 font-[500] text-lightMode-p dark:text-darkMode-p text-xs'>
            Google
          </div>
        </div>
      </CustomButton>
    </div>
  );
}
