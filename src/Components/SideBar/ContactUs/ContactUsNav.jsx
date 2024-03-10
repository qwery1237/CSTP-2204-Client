import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';

export default function ContactUsNav({
  crrAction,
  setCrrAction,
  helpDataId,
  setHelpDataId,
}) {
  const isHome = crrAction == 'Home' && !helpDataId;
  const isChat = crrAction == 'Chat';
  const isHelp = crrAction == 'Help' || (!isChat && helpDataId);
  const handleClick = (action) => {
    setHelpDataId(null);
    setCrrAction(action);
  };
  return (
    <div className='w-full flex  caret-transparent'>
      <div className={`${isHome ? 'tb' : 'th'}  flex-1 flex justify-center `}>
        <div
          onClick={() => handleClick('Home')}
          className=' flex flex-col  items-center cursor-pointer px-2'
        >
          <HomeIcon />
          <div className=' text-sm'>Home</div>
        </div>
      </div>
      <div className={`${isChat ? 'tb' : 'th'}  flex-1 flex justify-center `}>
        <div
          onClick={() => handleClick('Chat')}
          className=' flex flex-col  items-center cursor-pointer px-2'
        >
          <ChatIcon />
          <div className=' text-sm'>Chat</div>
        </div>
      </div>
      <div className={`${isHelp ? 'tb' : 'th'}  flex-1 flex justify-center `}>
        <div
          onClick={() => handleClick('Help')}
          className=' flex flex-col  items-center cursor-pointer px-2'
        >
          <ContactSupportOutlinedIcon />
          <div className=' text-sm'>Help</div>
        </div>
      </div>
    </div>
  );
}
