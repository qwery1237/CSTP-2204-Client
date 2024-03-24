import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginBtn from './GoogleLoginBtn';

export default function GoogleLogin({ setPasswordError }) {
  return (
    <>
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
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
      >
        <GoogleLoginBtn setPasswordError={setPasswordError} />
      </GoogleOAuthProvider>
    </>
  );
}
