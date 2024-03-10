import React from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CustomInput from '../../UI/CustomInput';
import HelpCard from './HelpCard';
import HelpDetail from './HelpDetail';

export default function ContactUsHome({
  helpDataId,
  setHelpDataId,
  setCrrAction,
  helpDataList,
}) {
  const sendHelpHandler = (id) => {
    setHelpDataId(id);
    // setCrrAction('Help');
  };

  if (helpDataId) {
    const dataSelected = helpDataList[helpDataId - 1];
    return <HelpDetail data={dataSelected} setHelpDataId={setHelpDataId} />;
  }

  return (
    <>
      <div className=' flex flex-row pb-4 pt-1'>
        <WhatshotIcon sx={{ color: 'rgb(14,164,233)', fontSize: '60px' }} />
      </div>

      <div className=' text-3xl tp'>Hey Harinder &#128075;</div>
      <div className='mb-3 text-3xl th'>How can we help?</div>

      <CustomInput placeHolder='Search for help' paddingLeft='36px'>
        <SearchOutlinedIcon className='absolute left-2 tp text-2xl bottom-[8px]' />
      </CustomInput>

      {helpDataList.map((data) => (
        <HelpCard
          key={data.title}
          data={data}
          sendHelpHandler={sendHelpHandler}
        />
      ))}
      <div
        onClick={() => setCrrAction('Chat')}
        className='p-4 tbg rounded-lg flex flex-row text-sm mt-4 cursor-pointer mb-4 items-center tp hover:text-lightMode-header dark:hover:text-lightMode-header hover:bg-lightMode-bg  dark:hover:bg-darkMode-bg'
      >
        <div className=' flex-1 flex flex-col'>
          <div className=' th'>Send us a message</div>
          <div className=' tp text-xs hover:text-lightMode-p dark:hover:text-lightMode-p'>
            We typically reply in few minutes
          </div>
        </div>
        <div className=' '>
          <SendOutlinedIcon />
        </div>
      </div>
    </>
  );
}
