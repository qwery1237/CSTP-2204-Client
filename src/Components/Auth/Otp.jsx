import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../UI/Loading';
import { otpResend, otpValidation } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
export default function Otp({ email, setShowModal }) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(9);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer == 0) return;
    setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }, [timer]);

  const resendHandler = async () => {
    setOtp('');
    setError('');
    setIsLoading(true);
    try {
      const { error: e } = await otpResend(email);
      if (e) {
        setError(e);
        return;
      }
      setIsLoading(false);
      setTimer(9);
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  useEffect(() => {
    if (otp.length === 4) {
      submitOtp();
    }
  }, [otp]);

  const submitOtp = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await otpValidation(email, otp);
      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }
      alert('Email was successfully verified');
      navigate('../login');
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };
  const handleCloseOtp = () => {
    setOtp();
    setShowModal(false);
  };
  return (
    <>
      <div className=' relative z-[2] h-full cursor-default'>
        {isLoading && (
          <div className=' absolute top-0 w-full h-full z-[50]'>
            {' '}
            <Loading />
          </div>
        )}
        <div
          onClick={handleCloseOtp}
          className=' absolute top-1 right-1 cursor-pointer'
        >
          <CloseIcon className=' text-lightMode-header dark:text-darkMode-header' />
        </div>

        <div className='h-full rounded-lg flex flex-col max-w-[400px] justify-end gap-y-5 max-[640px]:h-screen max-[640px]:max-w-full max-[640px]:w-screen max-[640px]:rounded-none '>
          <div className=' text-2xl text-lightMode-header dark:text-darkMode-header'>
            Otp verification
          </div>
          <div className=' mb-4 text-sm text-lightMode-p dark:text-darkMode-p '>
            Enter the 4-digit code sent you at: {email}
          </div>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            shouldAutoFocus={true}
            containerStyle={
              'w-full max-w-[350px] flex flex-row gap-6 justify-evenly'
            }
            inputStyle={
              'bg-lightMode-tbg dark:bg-darkMode-tbg border-lightMode-border dark:border-darkMode-border h-[52px] flex-1 max-w-[52px] border-[1px]  focus-visible:border-lightMode-button focus-visible:shadow-[0_0px_6px_#38bdf8] caret-lightMode-p dark:caret-darkMode-p focus-visible:outline-none text-lightMode-header dark:text-darkMode-header rounded-lg text-2xl'
            }
            inputType='number'
            renderInput={(props) => {
              return <input {...props} />;
            }}
          />

          <div className='text-[12px]  text-lightMode-p dark:text-darkMode-p '>
            Tip: Make sure to check your inbox or spam folders
          </div>

          <div className='w-full h-4 text-center text-xs text-lightMode-error dark:text-darkMode-error '>
            {error ? error : ''}
          </div>

          <div className='hidden flex-1 max-[640px]:flex'></div>
          <div className='  w-full flex flex-row justify-between items-center'>
            <button
              onClick={resendHandler}
              disabled={timer}
              className='w-28 rounded-lg h-10 px-4 bg-lightMode-bg dark:bg-darkMode-bg
            hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg border-lightMode-border dark:border-darkMode-border leading-none text-sm font-semibold text-lightMode-p dark:text-darkMode-p'
            >
              Resend {timer ? `0:0${timer}` : ''}
            </button>

            <button
              onClick={() => submitOtp()}
              className=' rounded-lg h-10 px-5 bg-lightMode-button hover:bg-lightMode-buttonHover border-lightMode-border dark:border-darkMode-border leading-none text-sm  text-lightMode-header dark:text-darkMode-header'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
