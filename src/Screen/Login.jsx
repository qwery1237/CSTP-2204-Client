import React, { useState } from 'react';
import CustomInput from '../Components/UI/CustomInput';
import { MdLockOutline, MdOutlineMail } from 'react-icons/md';
import { Navigate, useNavigate } from 'react-router-dom';
import CustomButton from '../Components/UI/CustomButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginBtn from '../Components/Login/GoogleLoginBtn';
import { emailLogin } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import PasswordHideBtn from '../Components/Login/PasswordHideBtn';
import GoogleLogin from '../Components/Login/GoogleLogin';
import LoginForm from '../Components/Login/LoginForm';

export default function Login() {
  const { updateUserData } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const navigate = useNavigate();
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
    try {
      const { token, error, fault } = await emailLogin(email, password);
      if (error) {
        fault == 'password' ? setPasswordError(error) : setEmailError(error);
        return;
      }
      await updateUserData(token);
      navigate('/home');
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className='h-full '>
      <h2 className=' text-white text-2xl font-semibold mb-4'>Welcome back!</h2>

      <form onSubmit={handleSubmit} noValidate>
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
        />

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

      <GoogleLogin />
    </div>
  );
}
