import { useState } from 'react';
import {
  SiStarbucks,
  SiAmazon,
  SiUbereats,
  SiApple,
  SiPix,
} from 'react-icons/si';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import Modal from '../Components/UI/Modal';
import { useOutletContext } from 'react-router-dom';
import TopNav from '../Components/TopNav/TopNav';
import RewardList from '../Components/Reward/RewardList';
import ItemInfo from '../Components/Reward/ItemInfo';

const REWARDS = [
  {
    title: 'Avatar',
    items: [
      {
        title: 'Tappy',
        icon: (
          <img className=' rounded-full size-10' src='/oilrig.jpg' alt='' />
        ),
        price: 300,
      },
      {
        title: 'Toppy',
        icon: (
          <img className=' rounded-full size-10' src='/oilrig.jpg' alt='' />
        ),
        price: 400,
      },
    ],
  },
  {
    title: 'Frame',
    items: [
      {
        title: 'Frame-4',
        icon: (
          <div
            style={{
              backgroundImage: 'url("/frame/level5.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className=' flex justify-center items-center size-10 rounded-full border-0 '
          >
            <div className='w-[93%] h-[93%] rounded-full bg-[#182335]' />
          </div>
        ),
        price: 300,
      },
      {
        title: 'Frame-5',
        icon: (
          <div
            style={{
              backgroundImage: 'url("/frame/level10.jpg")',
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
              // Additional background properties can be added here
            }}
            className=' flex justify-center items-center size-10 rounded-full border-0 '
          >
            <div className='w-[93%] h-[93%] rounded-full bg-[#182335] ' />
          </div>
        ),
        price: 500,
      },
    ],
  },
  {
    title: 'Card',
    items: [
      {
        title: 'Starbucks Gift Card',
        icon: <SiStarbucks className='text-[#187653] bg-white rounded-full' />,
        bg: '#187653',
      },
      {
        title: 'Amazon Gift Card',
        icon: <SiAmazon />,
        bg: '#F59516',
      },
      {
        title: 'Apple Gift Card',
        icon: <SiApple />,
        bg: '#8A8A8F',
      },
      {
        title: 'Best Buy Gift Card',
        icon: <BiSolidPurchaseTagAlt className='text-[#F9DB03] ' />,
        bg: '#194DAB',
      },
      {
        title: 'Google Play Gift Card',
        icon: (
          <img
            width='40px'
            height='40px'
            src='https://img.icons8.com/fluency/48/google-play-store-new.png'
            alt='google-play-store-new'
          />
        ),
        bg: '#0D0E10',
      },
      {
        title: 'Uber Eats Gift Card',
        icon: <SiUbereats />,
        bg: '#64B91A',
      },
    ],
    amountOptions: [
      { amount: 5, price: 600 },
      { amount: 10, price: 1000 },
      { amount: 15, price: 1450 },
      { amount: 25, price: 2300 },
      { amount: 50, price: 4400 },
      { amount: 75, price: 6450 },
      { amount: 100, price: 8500 },
      { amount: 150, price: 12600 },
      { amount: 200, price: 16500 },
    ],
  },
];

export default function Rewards() {
  const { setIsProfilePopUp } = useOutletContext();
  const [point, setPoint] = useState(2000);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState();

  return (
    <>
      {showModal && (
        <Modal>
          <ItemInfo
            point={point}
            setPoint={setPoint}
            setShowModal={setShowModal}
            modal={modal}
          />
        </Modal>
      )}
      <TopNav setIsProfilePopUp={setIsProfilePopUp}>
        <div className='flex flex-row items-center th w-[100px] justify-center gap-x-1 cursor-pointer '>
          <SiPix className='text-xs mr-1.5' />
          <span className='text-sm '>{point.toLocaleString('en-US')}</span>
        </div>
      </TopNav>
      <ul className='overflow-y-auto max-[520px]:px-2'>
        {REWARDS.map((reward) => {
          if (reward.title === 'Card')
            return reward.items.map((item) => (
              <RewardList
                key={item.title}
                reward={{ item, amountOptions: reward.amountOptions }}
                point={point}
                setShowModal={setShowModal}
                setModal={setModal}
                isGiftCard
              />
            ));

          return (
            <RewardList
              key={reward.title}
              reward={reward}
              point={point}
              setShowModal={setShowModal}
              setModal={setModal}
            />
          );
        })}
      </ul>
    </>
  );
}
