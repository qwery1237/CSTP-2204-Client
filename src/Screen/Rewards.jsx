import { useEffect, useState } from 'react';
import {
  SiAmazon,
  SiApple,
  SiPix,
  SiStarbucks,
  SiUbereats,
} from 'react-icons/si';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import Modal from '../Components/UI/Modal';
import { useOutletContext } from 'react-router-dom';
import TopNav from '../Components/TopNav/TopNav';
import ItemInfo from '../Components/Reward/ItemInfo';
import Avatars from '../Components/Reward/Avatars';
import Frames from '../Components/Reward/Frames';
import GiftCards from '../Components/Reward/GiftCards';
import { useAuth } from '../context/AuthContext';

export const GIFTCARDS = {
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
    { amount: 5, price: 50 },
    { amount: 10, price: 95 },
    { amount: 15, price: 140 },
    { amount: 25, price: 230 },
    { amount: 50, price: 450 },
    { amount: 75, price: 670 },
    { amount: 100, price: 890 },
    { amount: 150, price: 1330 },
    { amount: 200, price: 1750 },
  ],
};

export default function Rewards() {
  const { setIsProfilePopUp } = useOutletContext();
  const { user } = useAuth();
  const [point, setPoint] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState();
  useEffect(() => {
    if (!user) return;
    if (!user.points) {
      setPoint(0);
      return;
    }
    setPoint(user.points);
  }, [user?.points]);
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
      <ul className='overflow-y-auto max-[520px]:px-2 max-[519px]:pb-16'>
        <Frames point={point} setModal={setModal} setShowModal={setShowModal} />
        <Avatars
          point={point}
          setModal={setModal}
          setShowModal={setShowModal}
        />
        {GIFTCARDS.items.map((giftCard) => (
          <GiftCards
            key={giftCard.title}
            options={{ giftCard, options: GIFTCARDS.amountOptions }}
            point={point}
            setModal={setModal}
            setShowModal={setShowModal}
          />
        ))}
      </ul>
    </>
  );
}
