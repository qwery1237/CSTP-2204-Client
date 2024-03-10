import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function HelpDetail({ data, setHelpDataId }) {
  const { title, data: detail } = data;
  return (
    <div className='w-full p-3'>
      <div className='th flex  flex-row justify-between items-center'>
        <div className=' th w-[calc(100%-32px)] overflow-hidden text-ellipsis whitespace-nowrap caret-transparent'>
          {title}
        </div>
        <div className=' cursor-pointer' onClick={() => setHelpDataId(null)}>
          <CloseIcon />
        </div>
      </div>
      <div className=' mt-2 tp caret-transparent '> {detail}</div>
    </div>
  );
}
