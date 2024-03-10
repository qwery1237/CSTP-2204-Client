import React, { useState } from 'react';
import CustomInput from '../Components/UI/CustomInput';
import { MdOutlineMail } from 'react-icons/md';
import CustomButton from '../Components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  // return <ForgetPasswordComp />;
  const [email, setEmail] = useState();
  const submit = () => {};
  const [error, setError] = useState();
  const navigate = useNavigate();
  return (
    <>
      <h2 className=' text-white text-2xl font-semibold'>Forget password?</h2>
      <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-2 pb-3'>
        We will send an email, follow the link in email to change password
      </h4>
      <form onSubmit={submit} noValidate>
        <CustomInput
          label='Email *'
          paddingLeft='40px'
          placeHolder='Email'
          handleChange={(e) => setEmail(e.target.value)}
          isInvalid={!!error}
          errorMessage={error}
        >
          <MdOutlineMail className='absolute left-2 tp text-2xl bottom-[8px]' />
        </CustomInput>
        <div className='mt-4'></div>
        <CustomButton />
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
