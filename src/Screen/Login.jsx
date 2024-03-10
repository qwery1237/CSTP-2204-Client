import React, { useState } from 'react';
import CustomInput from '../Components/UI/CustomInput';
import { MdLockOutline, MdOutlineMail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../Components/UI/CustomButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginBtn from '../Components/Auth/GoogleLoginBtn';
export default function Login() {
  // return <AuthPageUiWrapper isLogin={true} />;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = () => {};

  return (
    <div className='h-full '>
      <h2 className=' text-white text-2xl font-semibold mb-4'>Welcome back!</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col gap-y-6 mb-6 mt-6'>
          <CustomInput
            label='Email *'
            paddingLeft='40px'
            placeHolder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          >
            <MdOutlineMail className='absolute left-2 tp text-2xl bottom-[8px]' />
          </CustomInput>
          <CustomInput
            label='Password *'
            paddingLeft='40px'
            placeHolder='Password'
            handleChange={(e) => setPassword(e.target.value)}
          >
            <MdLockOutline className='absolute left-2 tp text-2xl bottom-[8px]' />
          </CustomInput>
        </div>

        <div className='w-full text-end text-lightMode-button dark:text-darkMode-button text-sm pb-3 cursor-pointer'>
          <span onClick={() => navigate('/accounts/forgetpassword')}>
            Forget password?
          </span>
        </div>

        <CustomButton />
      </form>
      <div className=' text-lightMode-p text-sm dark:text-darkMode-p mt-4 mb-4 flex flex-row w-full items-center justify-center'>
        <h4 className='flex flex-row'>
          Don't have an account?
          <button
            onClick={() => navigate('/accounts/signup')}
            className='pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer'
          >
            Register Now
          </button>
        </h4>
      </div>

      <div className='w-full relative mt-1'>
        <div className='absolute top-0 border-b-[1px] border-lightMode-p dark:border-darkMode-p w-full'>
          <div className='absolute top-[-10px] text-lightMode-p dark:text-darkMode-p w-full'>
            <div className='w-full flex flex-row justify-center'>
              <div
                className='  text-sm bg-lightMode-sbg dark:bg-darkMode-sbg max-[640px]:bg-lightMode-bg
                dark:max-[640px]:bg-darkMode-bg rounded-full
                px-1'
              >
                or
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoogleOAuthProvider clientId='698921458629-k410ff2u0hnkl6bap113t8f9vepj8eoq.apps.googleusercontent.com'>
        <GoogleLoginBtn />
      </GoogleOAuthProvider>
    </div>
  );
}
