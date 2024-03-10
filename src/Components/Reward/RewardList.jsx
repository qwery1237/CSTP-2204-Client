import React from 'react';
import RewardCard from './RewardCard';

export default function RewardList({
  reward,
  point,
  setShowModal,
  setModal,
  isGiftCard,
}) {
  const title = reward.title || reward.item.title;
  const setGiftCardInfo = (amount, price) => {
    setModal({
      card: <RewardCard reward={reward.item} amount={amount} sm />,
      title,
      amount,
      price,
      isAvailable: point >= price,
      type: 'Card',
    });
    setShowModal(true);
  };
  const setItemInfo = ({ title, icon, price }, type) => {
    setModal({
      title,
      card: <RewardCard reward={{ icon }} sm />,
      price,
      isAvailable: point >= price,
      type,
    });
    setShowModal(true);
  };
  return (
    <li>
      <h4 className='th text-md my-8'>{title}</h4>
      <ul className='flex w-full overflow-auto snap-x '>
        {isGiftCard
          ? reward.amountOptions.map(({ amount, price }) => (
              <li
                onClick={() => setGiftCardInfo(amount, price)}
                key={title + amount}
                className=' mr-3 snap-center h-40'
              >
                <RewardCard
                  reward={reward.item}
                  point={point}
                  amount={amount}
                  price={price}
                  lg
                />
              </li>
            ))
          : reward.items.map((item, i) => (
              <li
                key={item.title + i}
                className=' mr-3 snap-start h-40'
                onClick={() => {
                  setItemInfo(item, title);
                }}
              >
                <RewardCard reward={item} point={point} price={item.price} md />
              </li>
            ))}
      </ul>
    </li>
  );
}
