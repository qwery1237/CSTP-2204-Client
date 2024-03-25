import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { SiPix } from 'react-icons/si';
import RewardCardDetails from './RewardCardDetails';
import CustomButton from '../UI/CustomButton';
import { useAuth } from '../../context/AuthContext';
import { purchaseItem } from '../../api/reward';

export default function ItemInfo({ point, setPoint, setShowModal, modal }) {
  const { user, token, updateUserData } = useAuth();
  const { itemId, title, amount, card, price, type } = modal;
  const isAvailable = price <= point;
  const [result, setResult] = useState();
  const handleClick = () => {
    setShowModal(false);
  };
  const getCoupon = () => {
    if (!isAvailable) return;
    if (type == 'frame' && user.framesOwned?.includes(itemId)) {
      setResult('Frame already purchased');
      return;
    }
    if (type == 'avatar' && user.avatarOwned?.includes(itemId)) {
      setResult('Avatar already purchased');
      return;
    }

    purchaseItem(type, { id: itemId, giftCardType: title, amount }, token)
      .then(setResult)
      .catch(alert)
      .finally(() => updateUserData(token));
    
  };

  return (
    <>
      <div className='flex justify-between w-full text-darkMode-border min-w-36 mb-4 mt-2 text-white '>
        <div className='flex items-center bg-black border-[3px] border-[#444444] px-2 py-0.5 rounded-full '>
          <SiPix className='text-xs mr-1.5' />
          <span className='text-sm '>{point.toLocaleString('en-US')}</span>
        </div>
        <MdClose className='text-xl cursor-pointer' onClick={handleClick} />
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
      {result ? (
        <div className=' mt-8 text-white leading-relaxed'>{result}</div>
      ) : (
        <>
          <div className='h-8'></div>
          <div className='flex w-full justify-center'>
            <CustomButton
              handleClick={getCoupon}
              bgColor={!isAvailable && '#d32f2f'}
              disable={!isAvailable}
              width='192px'
              fontSize='base'
            >
              {isAvailable ? `GET ${type.toUpperCase()}` : 'NOT ENOUGH UNIT'}
            </CustomButton>
          </div>
        </>
      )}
    </>
  );
}
