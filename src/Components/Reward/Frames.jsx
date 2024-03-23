import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getShopItems } from '../../api/reward';
import RewardCard from './RewardCard';

export default function Frames({ point, setModal, setShowModal }) {
  const { user, token } = useAuth();
  const [frames, setFrames] = useState();
  const getFrames = async () => {
    try {
      const shopFrames = await getShopItems('frame', token);
      const sorted = shopFrames.sort((a, b) => {
        const aIsPurchased = user.framesOwned?.includes(a._id);
        const bIsPurchased = user.framesOwned?.includes(b._id);
        return aIsPurchased == bIsPurchased ? 0 : aIsPurchased ? 1 : -1;
      });
      setFrames(sorted);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    if (!user) return;
    getFrames();
  }, [user]);
  const handleOpenModal = (id, icon, isPurchased) => {
    if (isPurchased) return;
    setModal({
      itemId: id,
      card: <RewardCard reward={{ icon }} sm />,
      type: 'frame',
    });
    setShowModal(true);
  };

  return (
    <>
      {user && (
        <>
          <h4 className='th text-md my-8'>Frames</h4>
          <ul className='flex w-full overflow-auto snap-x '>
            {frames &&
              frames.map(({ link, _id: id }, i) => {
                const icon = (
                  <div
                    style={{
                      backgroundImage: `url(${link})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    className=' flex justify-center items-center size-10 rounded-full border-0 '
                  >
                    <div className='w-[93%] h-[93%] rounded-full bg-[#182335]' />
                  </div>
                );
                const isPurchased = user.framesOwned?.includes(id);
                return (
                  <li
                    onClick={() => handleOpenModal(id, icon, isPurchased)}
                    key={'frame' + i}
                    className=' mr-3 snap-start h-40'
                  >
                    <RewardCard
                      md
                      reward={{ icon }}
                      price='25'
                      point={point}
                      isPurchased={isPurchased}
                    />
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </>
  );
}
