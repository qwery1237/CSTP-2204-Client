import { useGoogleLogin } from '@react-oauth/google';
import CustomButton from '../UI/CustomButton';
import googleImg from '/google.png';
import {
  addAccountInitialData,
  googleLogin,
  loginWithGoogleAccount,
} from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginBtn() {
  const { updateUserData } = useAuth();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const token = res.access_token;

      try {
        const googleAccount = await googleLogin(token);
        const result = await loginWithGoogleAccount(googleAccount);

        if (result.error) {
          alert(result.error);
          return;
        }

        if (!result.token) {
          const userData = await addAccountInitialData(googleAccount);

          await updateUserData(userData.token);
          navigate('/home');
          return;
        }

        await updateUserData(result.token);
        navigate('/home');
      } catch (e) {
        alert(e.message);
      }
    },
    onError: (e) => {
      alert(e.error_description);
    },
  });
  return (
    <div
      className='flex flex-col justify-between items-center gap-x-4 pt-5'
      onClick={() => {
        login();
      }}
    >
      <CustomButton bgColor='#141d2c' hoverDarker>
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
