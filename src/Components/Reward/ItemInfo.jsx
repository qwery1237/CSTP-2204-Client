import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { SiPix } from 'react-icons/si';
import RewardCardDetails from './RewardCardDetails';
import CustomButton from '../UI/CustomButton';

export default function ItemInfo({ point, setPoint, setShowModal, modal }) {
  const [isPurchased, setIsPurchased] = useState(false);
  const { title, amount, card, price, isAvailable } = modal;

  const handleClick = () => {
    setShowModal(false);
    setIsPurchased(false);
  };
  const getCoupon = () => {
    const balance = point - price;
    setPoint(balance);
    setIsPurchased(true);
  };

  return (
    <>
      <div className='flex justify-between w-full text-darkMode-border min-w-36 mb-4 mt-2 text-white '>
        <div className='flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full '>
          <SiPix className='text-xs mr-1.5' />
          <span className='text-sm '>{point.toLocaleString('en-US')}</span>
        </div>
        <MdClose className='text-xl' onClick={handleClick} />
      </div>
      <div className='flex flex-col items-center text-white'>{card}</div>
      <div className='w-full min-w-36 text-center pt-3 th'>
        <span className='th text-xs'>{title}</span>
        <RewardCardDetails
          amount={amount}
          price={price}
          isAvailable={isAvailable}
        />
      </div>
      {isPurchased ? (
        <div className=' mt-8 text-white leading-relaxed'>
          Order placed. Check email !
        </div>
      ) : (
        <>
          <div className='h-8'></div>
          <CustomButton
            handleClick={getCoupon}
            bgColor={!isAvailable && '#d32f2f'}
            disable={!isAvailable}
            width='192px'
            fontSize='base'
          >
            {isAvailable ? `Get ${modal.type}` : 'NOT ENOUGH UNIT'}
          </CustomButton>
        </>
      )}
    </>
  );
}
