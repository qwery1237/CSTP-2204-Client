import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ChatText from './ChatText';
import ChatOverView from './ChatOverView';
import CustomInput from '/src/Components/UI/CustomInput';

export default function ContactUsChat({ setHelpDataId }) {
  const [isSendMsg, setIsSendMsg] = useState(false);
  const [isChat, setIsChat] = useState(true);

  const handleOpenChat = () => {
    setIsSendMsg(true);
    setHelpDataId('message'); //todo get real data from backend
  };
  const handleCloseChat = () => {
    setIsSendMsg(false);
    setHelpDataId(null);
  };
  return (
    <>
      {isSendMsg ? (
        <>
          <div className=' w-full   caret-transparent'>
            <div className=' text-center th flex items-center p-3 pb-4 justify-between'>
              <div className=' flex flex-row items-center'>
                <img
                  className='size-10 rounded-full  cursor-pointer object-cover'
                  src='/oilrig.jpg'
                  alt=''
                />
                <h2 className=' text-white text-lg   pl-4'>Agent name</h2>
              </div>

              <div onClick={handleCloseChat} className=' cursor-pointer'>
                <CloseIcon />
              </div>
            </div>
          </div>
          <div className=' flex-1 w-full  relative caret-transparent '>
            <ChatText
              isUser={false}
              text={
                'Please leave your message, include images or video if needed. An agent will be with you shortly'
              }
            />
          </div>
          <div className=' sticky bottom-0'>
            <div className='mb-2 w-full relative'>
              <CustomInput placeHolder='Message' paddingLeft='33px' />

              <div className='h-9 rounded-lg left-1 flex justify-center items-center tp top-[2px] absolute  tbg '>
                <EmojiEmotionsIcon />
              </div>
              <div className='h-9 rounded-lg right-1 flex justify-center items-center tp top-[2px] absolute  tbg '>
                <AttachmentIcon />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex-1 w-full h-full relative caret-transparent'>
            {isChat ? (
              <>
                <div onClick={handleOpenChat} className=' cursor-pointer'>
                  <ChatOverView />
                </div>
              </>
            ) : (
              <div className=' text-sm tp text-center'>No recent chat</div>
            )}
          </div>
          <div className='  bottom-0  sticky w-full'>
            <div className='w-full flex flex-row justify-center my-4'>
              <div
                onClick={handleOpenChat}
                className=' flex flex-row items-center th p-2 rounded-lg tbg text-sm gap-x-2 cursor-pointer hover:bg-lightMode-bg dark:hover:bg-darkMode-bg  shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_36px__#e2e8f033]'
              >
                <div>Send us a message</div>
                <SendOutlinedIcon sx={{ fontSize: 16 }} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
