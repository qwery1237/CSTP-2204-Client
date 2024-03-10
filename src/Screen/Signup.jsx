import React, { useState } from 'react';
import CustomInput from '../Components/UI/CustomInput';
import { MdLockOutline, MdOutlineMail } from 'react-icons/md';
import CustomButton from '../Components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';
import GoogleLoginBtn from '../Components/Auth/GoogleLoginBtn';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { emailSignUp } from '../api/auth';
import Modal from '../Components/UI/Modal';
import Otp from '../Components/Auth/Otp';

export default function Signup() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  // return (
  //   <AuthPageUiWrapper isLogin={false}/>
  // );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError();
    setPasswordError();
    if (!email) {
      setEmailError('Email is empty');
      return;
    }
    if (!password) {
      setPasswordError('Password is empty');
      return;
    }
    if (!isAgreedToTerms) {
      alert('Please agree to terms');
      return;
    }
    try {
      const data = await emailSignUp(email, password, isAgreedToTerms);

      if (data.error) {
        data.fault == 'email'
          ? setEmailError(data.error)
          : setPasswordError(data.error);
        return;
      }

      setShowModal(true);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      {showModal && (
        <Modal>
          <Otp email={email} setShowModal={setShowModal} />
        </Modal>
      )}
      <div className='h-full  '>
        <h2 className=' text-white text-2xl font-semibold mb-4'>
          Create an account
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-y-6 mb-6 mt-6'>
            <CustomInput
              label='Email *'
              paddingLeft='40px'
              placeHolder='Email'
              errorMessage={emailError}
              handleChange={(e) => setEmail(e.target.value)}
            >
              <MdOutlineMail className='absolute left-2 tp text-2xl bottom-[8px]' />
            </CustomInput>
            <CustomInput
              label='Password *'
              paddingLeft='40px'
              errorMessage={passwordError}
              placeHolder='Password'
              handleChange={(e) => setPassword(e.target.value)}
            >
              <MdLockOutline className='absolute left-2 tp text-2xl bottom-[8px]' />
            </CustomInput>
          </div>
          <label className='inline-flex items-center mb-3'>
            <input
              onChange={() => setIsAgreedToTerms((prevState) => !prevState)}
              type='checkbox'
              className='form-checkbox h-[14px] w-[14px]  transition duration-150 ease-in-out checkbox border-[1px] border-lightMode-border dark:border-darkMode-border:'
              checked={isAgreedToTerms}
            />
            <span className='ml-2 text-sm text-lightMode-p dark:text-darkMode-p'>
              I agree to the terms and conditions
            </span>
          </label>
          {/* ToDo: add real function on login button and signin button*/}
          <CustomButton />
        </form>
        <div className=' text-lightMode-p text-sm dark:text-darkMode-p mt-4 mb-4 flex flex-row w-full items-center justify-center'>
          <h4 className='flex flex-row text-sm'>
            Already have an account?
            <button
              onClick={() => navigate('../login')}
              className='pl-1  text-lightMode-button dark:text-lightMode-button cursor-pointer'
            >
              Login Now
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
    </>
  );
}
