import React from 'react';

export default function HelpCard({ data, sendHelpHandler }) {
  const { title, title2, id } = data;
  return (
    <div
      key={title}
      onClick={() => {
        sendHelpHandler(id);
      }}
      className='p-4 tbg rounded-lg flex flex-col text-sm mt-4 cursor-pointer hover:bg-lightMode-bg  dark:hover:bg-darkMode-bg'
    >
      <div className=' th'>{title}</div>
      <div className=' tp text-xs'>{title2}</div>
    </div>
  );
}
