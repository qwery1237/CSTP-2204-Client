import { useState } from 'react';
import CustomButton from '../Components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';
import { emailSignUp } from '../api/auth';

import Otp from '../Components/Auth/Otp';
import LoginForm from '../Components/Login/LoginForm';
import GoogleLogin from '../Components/Login/GoogleLogin';
import UserDataForm from '../Components/Auth/UserDataForm';
import Modal from '../Components/UI/Modal';
import BgBlackOpacity from '../Components/BgBlackOpacity';

export default function Signup() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [isOtpCorrect, setIsOtpCorrect] = useState(false);

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
      const { error, fault } = await emailSignUp(
        email,
        password,
        isAgreedToTerms
      );

      if (error) {
        fault == 'password' ? setPasswordError(error) : setEmailError(error);
        return;
      }

      setShowModal(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      {isOtpCorrect ? (
        <UserDataForm email={email} />
      ) : (
        <>
          {showModal && (
            <BgBlackOpacity>
              <Otp
                email={email}
                setIsOtpCorrect={setIsOtpCorrect}
                setShowModal={setShowModal}
              />
            </BgBlackOpacity>
          )}
          <div className='h-full  '>
            <h2 className=' text-white text-2xl font-semibold mb-4'>
              Create an account
            </h2>
            <form onSubmit={handleSubmit} noValidate>
              <LoginForm
                emailError={emailError}
                passwordError={passwordError}
                setEmail={setEmail}
                setPassword={setPassword}
              />
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
            <GoogleLogin setPasswordError={setPasswordError} />
          </div>
        </>
      )}
    </>
  );
}
