import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../Components/UI/CustomButton';
import CustomInput from '../Components/UI/CustomInput';
import { MdLockOutline } from 'react-icons/md';
import PasswordHideBtn from '../Components/Login/PasswordHideBtn';
import { changePassword } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function ChangePassWord() {
  const { id } = useParams();
  const { updateUserData } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState();

  const [passwordError, setPasswordError] = useState();
  const [matchError, setMatchError] = useState(false);

  const handlePassword = (e) => {
    setPasswordError();
    setPassword(e.target.value);
  };

  const handleMatchPassword = (e) => {
    setConfirmPassword(e.target.value);
    setMatchError(e.target.value != password);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMatchError();
    setPasswordError();

    if (!password) {
      setPasswordError('Password is empty');
      return;
    }

    if (password != confirmPassword) {
      setMatchError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password is too short');
    }
    try {
      const { fault, token } = await changePassword(
        id,
        password,
        confirmPassword
      );
      if (fault == 'badlink') {
        alert('The link is alread expired!');
        navigate('/accounts/forgetpassword');
        return;
      }
      if (token) {
        await updateUserData(token);
        navigate('/home');
        return;
      }

      setPasswordError('Password was not valid');
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <h2 className=' text-white text-2xl font-semibold'>Change password</h2>
      <h4 className=' text-lightMode-p text-sm dark:text-darkMode-p py-2 pb-3'>
        Password must be 6 or more characters long
      </h4>
      <form
        onSubmit={handleChangePassword}
        className='flex flex-col gap-y-5 mt-2'
        noValidate
      >
        <CustomInput
          label='Password *'
          paddingLeft='40px'
          isPassword={!showPassword}
          errorMessage={passwordError}
          placeHolder='Password'
          handleChange={handlePassword}
        >
          <MdLockOutline className='absolute left-2 tp text-2xl bottom-[8px]' />
        </CustomInput>
        <CustomInput
          label='Confirm password *'
          paddingLeft='40px'
          isPassword={!showPassword}
          errorMessage={matchError ? "Passwords don't match " : ''}
          placeHolder='Password'
          handleChange={handleMatchPassword}
        >
          <MdLockOutline className='absolute left-2 tp text-2xl bottom-[8px]' />
          <PasswordHideBtn
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
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
