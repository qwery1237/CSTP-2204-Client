import React from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ContributorList({ isMonth }) {
  const array = [1, 2, 3, 4, 5];
  return (
    <div className=' flex-1 rounded-lg border-[1px] cborder th'>
      <div className=' p-4 text-end text-lg'>
        {isMonth ? 'February' : '2024'}
      </div>

      {array.map((item) => {
        return (
          <div
            key={'contributer' + item}
            className=' flex-1 flex flex-row justify-between items-center p-2 border-t-[1px] cborder'
          >
            {item <= 3 ? (
              <div className=' flex flex-row gap-x-1 items-center'>
                <div> {item} </div>{' '}
                <div
                  className={`${item === 1 && 'text-[#ffd700]'} ${
                    item === 2 && 'text-[#c0c0c0]'
                  } ${item === 3 && 'text-[#CD7F32]'}`}
                >
                  <EmojiEventsIcon sx={{ fontSize: 18 }} />
                </div>
              </div>
            ) : (
              <div> {item}</div>
            )}
            <div>Harinder</div>
          </div>
        );
      })}
    </div>
  );
}
