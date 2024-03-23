import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import PixIcon from '@mui/icons-material/Pix';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignoutBtn from './SignoutBtn';
import UserInfo from './UserInfo';
import Avatar from './Avatar';
import Frame from './Frame';
import ProfileSetting from './ProfileSetting';
import ShareLink from './ShareLink';
import ContactUs from './ContactUs/ContactUs';
import { useAuth } from '../../context/AuthContext';

const CONTENTS = [
  { title: 'Account Info', element: <ProfileSetting /> },
  { title: 'Avatar', element: <Avatar /> },
  { title: 'Frame', element: <Frame /> },
  { title: 'Invite Friends', element: <ShareLink /> },
  { title: 'Live Support', element: <ContactUs /> },
];
const SIDEBARACTIONS = [
  {
    title: 'Favourite',
    icon: (
      <FavoriteBorderOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
    ),
  },
  {
    title: 'Rewards',
    icon: <WalletOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
  },
  {
    title: 'Avatar',
    icon: (
      <SentimentSatisfiedOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />
    ),
  },
  {
    title: 'Frame',
    icon: <LensOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
  },
  {
    title: 'Invite Friends',
    icon: <CardGiftcardOutlinedIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
    subtitle: [
      'You earn 100',
      <PixIcon key='15' sx={{ color: 'white', fontSize: 14 }} />,
    ],
  },
  {
    title: 'Live Support',
    icon: <SupportAgentIcon sx={{ color: '#ffffff', fontSize: 25 }} />,
  },
];
export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [crrAction, setCrrAction] = useState();
  const [helpDataId, setHelpDataId] = useState(null);

  const handleActionChange = (title) => {
    const selected = CONTENTS.find((item) => item.title == title);
    if (!selected) {
      navigate('/' + title.toLowerCase());
      return;
    }
    setCrrAction(selected);
  };

  if (crrAction) {
    const { title, element } = crrAction;
    const contents = React.cloneElement(element, {
      helpDataId,
      setHelpDataId,
      setCrrAction,
    });
    return (
      <>
        {!helpDataId && (
          <div className=' text-center th flex items-center m-4 justify-between'>
            <h2 className=' text-white text-lg '>{title}</h2>
            <div onClick={() => setCrrAction()} className=' cursor-pointer'>
              <ArrowBackIcon />
            </div>
          </div>
        )}
        {contents}
      </>
    );
  }
  return (
    <>
      <UserInfo handleActionChange={handleActionChange} />

      {SIDEBARACTIONS.map((action, index) => {
        const { title, icon, subtitle = '' } = action;

        return (
          <Fragment key={title + index}>
            <div className='px-2 w-full caret-transparent'>
              <div
                onClick={() => handleActionChange(title)}
                className={`flex flex-row items-center gap-x-4 p-4 ${
                  subtitle ? 'py-[8.5px]' : ''
                } rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg`}
              >
                {icon}
                <div className=' flex flex-col'>
                  <div className='text-lightMode-header dark:text-darkMode-header text-sm'>
                    {title}
                  </div>
                  {subtitle && (
                    <div className=' flex flex-row items-center gap-x-1'>
                      <div className='text-lightMode-p dark:text-darkMode-p text-sm '>
                        {subtitle[0]}
                      </div>
                      {subtitle[1]}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {index == 4 && (
              <div className=' border-b-[1px] border-lightMode-border dark:border-darkMode-border mt-4 mb-2'></div>
            )}
          </Fragment>
        );
      })}
      <SignoutBtn />
    </>
  );
}
