import { useGoogleLogin } from '@react-oauth/google';
import CustomButton from '../UI/CustomButton';
import googleImg from '/google.png';
import { googleLogin, loginWithGoogleAccount } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function GoogleLoginBtn() {
  const { updateUserData } = useAuth();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const token = res.access_token;
      try {
        const { name, email, picture } = await googleLogin(token);

        const result = await loginWithGoogleAccount(name, email, picture);

        if (result.error) {
          alert(result.error);
          return;
        }
        if(result.success){
          localStorage.setItem("token", JSON.stringify(result.token))
          await updateUserData(result.token)
          navigate('/home')
        }
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
