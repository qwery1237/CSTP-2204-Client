import { MdLockOutline, MdOutlineMail } from 'react-icons/md';
import CustomInput from '../UI/CustomInput';
import PasswordHideBtn from './PasswordHideBtn';
import { useState } from 'react';

export default function LoginForm({
  emailError,
  passwordError,
  setEmail,
  setPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
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
        isPassword={!showPassword}
        errorMessage={passwordError}
        placeHolder='Password'
        handleChange={(e) => setPassword(e.target.value)}
      >
        <MdLockOutline className='absolute left-2 tp text-2xl bottom-[8px]' />
        <PasswordHideBtn
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </CustomInput>
    </div>
  );
}
