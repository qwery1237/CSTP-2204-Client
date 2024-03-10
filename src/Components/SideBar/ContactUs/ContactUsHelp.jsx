import React, { useState } from 'react';
import CustomInput from '../../UI/CustomInput';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import HelpCard from './HelpCard';
import HelpDetail from './HelpDetail';

export default function ContactUsHelp({
  helpDataList,
  helpDataId,
  setHelpDataId,
}) {
  const [text, setText] = useState('');
  const handleChange = (e) => {
    setText(e.target.value);
  };
  if (helpDataId) {
    const dataSelected = helpDataList[helpDataId - 1];
    return <HelpDetail data={dataSelected} setHelpDataId={setHelpDataId} />;
  }

  return (
    <>
      <div className=' sticky top-0 bg-inherit '>
        <div className='mb-6 mt-2 w-full relative'>
          <CustomInput
            handleChange={handleChange}
            placeHolder='Search for help'
            paddingLeft='36px'
          >
            <SearchOutlinedIcon className='absolute left-2 tp text-2xl bottom-[8px]' />
          </CustomInput>
        </div>
      </div>
      <div>
        {helpDataList
          .filter(({ title }) =>
            title.toLowerCase().includes(text.toLowerCase())
          )
          .map((data) => {
            return (
              <HelpCard
                key={data.title}
                data={data}
                sendHelpHandler={setHelpDataId}
              />
            );
          })}
      </div>
    </>
  );
}
