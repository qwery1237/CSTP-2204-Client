import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CustomButton from '../UI/CustomButton';
import CustomInput from '../UI/CustomInput';

export default function ProfileSetting() {
  //user data from backend
  const [user, setUser] = useState({
    name: 'Harinder Sran',
    email: 'hss0220022gmail.com',
    profileImg: '/oilrig.jpg',
    frame: 'level5.jpg',
    lv: 3,
    crrEXP: 15,
    requiredEXP: 75,
  });

  const [error, setError] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files[0]; // 첫 번째로 선택된 파일 가져오기
    console.log(file);
  };
  return (
    <div className='w-full p-3 pt-0'>
      <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-3 pb-3'>
        Profile Image
      </h4>
      <div className=' relative w-fit mb-4'>
        <img
          className=' size-[100px] rounded-full'
          src={user.profileImg}
          alt=''
        />
        <div className=' absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            onChange={handleUpload}
            className=' rounded-full w-10 h-10 absolute  bottom-[1px] right-[0px] bg-transparent cursor-pointer opacity-0'
          ></input>
          <EditIcon />
        </div>
      </div>
      <form
        //  onSubmit={(e) => handleUserData(e)}
        noValidate
      >
        <CustomInput
          label='Name *'
          paddingLeft='40px'
          placeHolder={user.name}
          isInvalid={error}
          errorMessage={error}
        >
          <BadgeOutlinedIcon
            className='absolute left-2 tp text-sm bottom-[10px]'
            sx={{ color: '#747c88' }}
          />
        </CustomInput>

        <div className='mt-4'></div>

        <CustomButton type='submit'>Change</CustomButton>
      </form>
    </div>
  );
}
