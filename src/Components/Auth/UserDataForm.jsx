import { useState } from "react";
import serverLink from "../../serverLink";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import CustomButton from "../UI/CustomButton";
import EditIcon from '@mui/icons-material/Edit';

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
export default function UserDataForm({

  email,

}) {
    const [img, setImg] = useState("https://res.cloudinary.com/dddggrofv/image/upload/v1691608835/profile_lxq8sq.jpg")
    const [userName, setUserName] = useState("")
  
  const [error, setError] = useState('');

  const [errorNameBorder, setErrorNameBorder] = useState(false);
  
  const navigate = useNavigate();
  const handleUserData = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    setErrorNameBorder(false);
    let invite = ""
    if(localStorage.getItem("inviteToken")){
       invite = JSON.parse(localStorage.getItem("inviteToken"))
    }
    try {
      const response = await axios.post(
        serverLink + '/auth/adduserdata',
        {
          email: email,
          name: userName,
          profileImg: img,
          invite: invite
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { success, error, token } = response.data;
    //   setIsLoading(false);
      if (success === true) {
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/home');
      } else {
        setError(error);
      }
    } catch (error) {
    //   setIsLoading(false);
      console.error('Network error:', error);
    }
  };
  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'unsigned_upload_preset');

      const url = `https://api.cloudinary.com/v1_1/dddggrofv/image/upload`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error uploading media:', errorData);
          return;
        }
        const data = await response.json();
        setImg(data.secure_url);
      } catch (error) {
        console.error('Error uploading media:', error);
      }
    }
  };

  return (
    <>
      {/* {popUp && (
        <BgBlackOpacity>
          {" "}
          <ConfirmationPopUp setPopUp={setPopUp} />
        </BgBlackOpacity>
      )} */}
      <h2 className=' text-white text-2xl font-semibold'>Account Info</h2>
      <h4 className=' text-lightMode-p dark:text-darkMode-p text-sm py-3 pb-3'>
        Profile Image (optional)
      </h4>
      <div className=' relative w-fit mb-4'>
        <img
          className=' size-[100px] rounded-full object-contain'
          src={img}
          alt=''
        />
        <div className=' absolute bottom-0 right-[-4px] rounded-full bg-white p-2 shadow-md cursor-pointer'>
          <input
            type='file'
            accept='image/*'
            onChange={(event) => handleUpload(event)}
            className=' rounded-full w-10 h-10 absolute  bottom-[1px] right-[0px] bg-transparent cursor-pointer opacity-0'
          ></input>
          <EditIcon />
        </div>
      </div>
      <div className=' text-sm text-lightMode-p dark:text-darkMode-p mt-1 pb-1'>
        Name*
      </div>
      <form onSubmit={(e) => handleUserData(e)} noValidate>
        <div className='w-full relative'>
          <input
            autoFocus
            style={errorNameBorder ? { borderColor: 'rgb(211 47 47 )' } : {}}
            autoComplete='name'
            label='Name'
            type='name'
            value={userName}
            placeholder='Name'
            onChange={(e) => setUserName(e.target.value)}
            className='mt-1 pl-10 customInput mb-3'
          />
          <div className=' absolute top-[10px] left-2'>
            <BadgeOutlinedIcon sx={{ color: '#747c88' }} />
          </div>
        </div>
        {error && (
          <div className='w-full text-center mt-2 text-xs text-lightMode-error dark:text-darkMode-error '>
            {error}
          </div>
        )}
        <div className='mt-4'></div>
            
        <CustomButton>Finish</CustomButton>
       
      </form>
    </>
  );
}
