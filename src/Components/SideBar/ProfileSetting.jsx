import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CustomButton from '../UI/CustomButton';
import CustomInput from '../UI/CustomInput';
import { useAuth } from '../../context/AuthContext';
import { editUserInfo } from '../../api/user';
import Loading from '../UI/Loading';
import BgBlackOpacity from '../BgBlackOpacity';

export default function ProfileSetting({ setCrrAction }) {
  const { user, token, updateUserData } = useAuth();
  const [error, setError] = useState('');
  const [imgFile, setImgFile] = useState();
  const [newName, setNewName] = useState();
  const [onSave, setOnSave] = useState(false);
  const handleUploadImg = (e) => {
    const newImgFile = e.target.files[0];
    setImgFile(newImgFile);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const updateUserInfo = async (e) => {
    e.preventDefault();
    if (!imgFile && !newName) return;
    setOnSave(true);
    try {
      console.log(user);
      const { success } = await editUserInfo(
        user._id,
        token,
        newName || user.name,
        imgFile || user.profileImg
      );
      if (!success) {
        setError('Your request was rejected!');
        return;
      }
      await updateUserData(token);

      setCrrAction();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      {onSave && (
        <div className='absolute w-screen h-screen'>
          <BgBlackOpacity>
            <Loading />
          </BgBlackOpacity>
        </div>
      )}
      <form onSubmit={updateUserInfo} className='w-full p-3 pt-0'>
        <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-3 pb-3'>
          Profile Image
        </h4>
        <div className=' relative w-fit mb-4'>
          <img
            className=' size-[100px] rounded-full'
            src={imgFile ? URL.createObjectURL(imgFile) : user?.profileImg}
            alt=''
          />
          <div className=' absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer'>
            <input
              type='file'
              accept='image/*'
              onChange={handleUploadImg}
              className=' rounded-full w-10 h-10 absolute  bottom-[1px] right-[0px] bg-transparent cursor-pointer opacity-0'
            ></input>
            <EditIcon />
          </div>
        </div>
        <div>
          <CustomInput
            label='Name *'
            paddingLeft='40px'
            placeHolder={user.name}
            handleChange={handleNameChange}
            errorMessage={error}
          >
            <BadgeOutlinedIcon
              className='absolute left-2 tp text-sm bottom-[10px]'
              sx={{ color: '#747c88' }}
            />
          </CustomInput>

          <div className='mt-4'></div>

          <CustomButton type='submit'>Change</CustomButton>
        </div>
      </form>
    </>
  );
}
