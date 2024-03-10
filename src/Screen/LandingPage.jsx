import React, { useEffect } from 'react';

import Background from '../Components/Landing/Background';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import serverLink from '../serverLink';
import CustomButton from '../Components/UI/CustomButton';
export default function LandingPage() {
  const navigate = useNavigate();
  const handleMovePage = async () => {
    const user = await handleUserData();
    user ? navigate('/home') : navigate('/accounts/login');
  };
  const handleUserData = async () => {
    try {
      const response = await axios.post(
        serverLink + '/user/getgasstations',
        {
          latitude: 49.146714,
          longitude: -122.853542,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { success, data } = response.data;

      if (success === true) {
        console.log(data);
      } else {
        console.log('false');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  return (
    <>
      <Background />
      <div className='w-screen h-screen flex flex-row justify-center absolute top-0 z-[3]'>
        <div className='w-[1440px] min-w-auto h-full px-20 flex flex-row overflow-hidden max-[900px]:px-0 '>
          <div className='flex-1 overflow-hidden flex flex-row justify-center items-center max-[900px]:pl-10 max-[900px]:justify-start max-[775px]:justify-center max-[775px]:px-4'>
            <div className='flex w-[430px] flex-col gap-y-6'>
              <div className=' flex flex-row items-center '>
                <WhatshotIcon
                  sx={{ color: 'rgb(14,164,233)', fontSize: '60px' }}
                />
                <div className='flex flex-1 flex-row items-center  text-lightMode-button text-5xl w-full justify-start'>
                  <div className='text-white'>Fuel</div>
                  Go
                </div>
              </div>
              <div className=' text-5xl font-[300] text-white leading-[1.25] max-[452px]:text-4xl'>
                Meet FuelGo, the #1 app for checking fuel prices
              </div>
              <div className='  text-white text-2xl font-[300] leading-[1.25] '>
                Join millions around the globe who are getting best fuel prices
                and earning extra money along the way.
              </div>
              <div>
                <CustomButton
                  handleClick={handleMovePage}
                  // innerContent='Get Started'
                  fontSize='xl'
                  rounded='full'
                  height='64px'
                >
                  Get Started
                </CustomButton>
              </div>
              {/* <div
                onClick={handleMovePage}
                className='h-16 mt-6 cursor-pointer px-10 flex flex-row justify-center items-center rounded-full bgbtn  text-white text-xl '
              >
                <div>Get started</div>
              </div> */}
            </div>
          </div>
          <div className='flex-1 max-[1050px]:flex-[0.6] max-[775px]:hidden'></div>
          <img
            className=' absolute  h-[500px] right-[-330px] my-[calc((100vh-500px)/2)] max-[1300px]:right-[-500px] max-[1050px]:hidden'
            src='/landing/laptop.png'
            alt=''
          />
          <img
            className=' absolute h-[500px] right-[400px] my-[calc((100vh-475px)/2)] max-[1300px]:right-[230px] max-[1050px]:right-[100px] max-[900px]:right-10 max-[775px]:hidden'
            src='/landing/phone.png'
            alt=''
          />
        </div>
      </div>
    </>
  );
}
