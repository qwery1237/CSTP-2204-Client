import React, { useState } from 'react';
import CustomInput from '../Components/UI/CustomInput';
import { MdOutlineMail } from 'react-icons/md';
import CustomButton from '../Components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';
import { sendchangePasswordEmail } from '../api/auth';

export default function ForgetPassword() {
  const [email, setEmail] = useState();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    if (!email) {
      setError('Email is empty');
      return;
    }

    try {
      const { error: err } = await sendchangePasswordEmail(email);

      if (err) {
        setError(err);
        return;
      }

      alert('Email successfully sent');
    } catch (err) {
      alert(err);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <h2 className=' text-white text-2xl font-semibold'>Forget password?</h2>
      <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-2 pb-3'>
        We will send an email, follow the link in email to change password
      </h4>
      <form onSubmit={handleSubmit} noValidate>
        <div className=' mt-3 mb-7'>
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
        </div>
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
