import React from 'react';
import { SiPix } from 'react-icons/si';

export default function RewardCardDetails({ amount, price, isAvailable }) {
  return (
    <div
      className={`flex items-center text-sm ${
        amount ? 'justify-between' : 'justify-end'
      }`}
    >
      {amount && <div className='text-base '>$ {amount}</div>}

      <div
        className={
          'flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full ' +
          `${!isAvailable && ' brightness-50'}`
        }
      >
        <SiPix className='text-xs mr-1.5' />
        <span className='text-sm '>{price.toLocaleString('en-US')}</span>
      </div>
    </div>
  );
}
