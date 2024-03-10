import React from 'react';
import RewardCardDetails from './RewardCardDetails';

export default function RewardCard({
  reward,
  amount,
  price,
  point,
  sm,
  md,
  lg,
}) {
  const { icon, bg } = reward;
  const isAvailable = point >= price;
  const percent = isAvailable ? 100 : (point / price) * 100;
  const converted = percent.toFixed();

  const cardSizeClass = sm
    ? `w-48 h-36 ${amount ? '' : 'bg-[#182335] '}`
    : 'h-[152px] ease-in-out duration-100 cursor-pointer hover:h-40 ' +
      (md ? 'w-32 hover:w-36 bg-[#182335] ' : '') +
      (lg ? 'w-56 hover:w-60 ' : '');

  return (
    <>
      <div
        className={'p-4 rounded-xl flex flex-col th ' + cardSizeClass}
        style={{ backgroundColor: bg }}
      >
        <div
          className={` w-full h-full flex items-center justify-center ${
            sm ? `text-5xl ${amount ? '' : 'scale-150'}` : 'mb-6 mt-2 text-4xl'
          }`}
        >
          {icon}
        </div>
        {(lg || md) && (
          <>
            <div className=' w-full h-[6px] rounded-full bg-neutral-400 mb-4'>
              <div
                className='h-full rounded-full bg-white'
                style={{ width: converted + '%' }}
              ></div>
            </div>

            <RewardCardDetails
              amount={amount}
              price={price}
              isAvailable={isAvailable}
            />
          </>
        )}
      </div>
    </>
  );
}
