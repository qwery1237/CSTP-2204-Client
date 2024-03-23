import { useEffect, useState } from 'react';
import { getShopItems } from '../../api/reward';
import { useAuth } from '../../context/AuthContext';
import RewardCard from './RewardCard';

export default function Avatars({ point, setModal, setShowModal }) {
  const { user, token } = useAuth();
  const [avatars, setAvatars] = useState();
  const getAvatars = async () => {
    try {
      const shopAvatars = await getShopItems('avatar', token);
      const sorted = shopAvatars.sort((a, b) => {
        const aIsPurchased = user.avatarOwned?.includes(a._id);
        const bIsPurchased = user.avatarOwned?.includes(b._id);
        return aIsPurchased == bIsPurchased ? 0 : aIsPurchased ? 1 : -1;
      });
      setAvatars(sorted);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    if (!user) return;
    getAvatars();
  }, [user]);
  const handleOpenModal = (id, icon, isPurchased) => {
    if (isPurchased) return;
    setModal({
      itemId: id,
      card: <RewardCard reward={{ icon }} sm />,
      type: 'avatar',
    });
    setShowModal(true);
  };
  return (
    <>
      {user && (
        <>
          <h4 className='th text-md my-8'>Avatars</h4>
          <ul className='flex w-full overflow-auto snap-x '>
            {avatars &&
              avatars.map(({ link, _id: id }, i) => {
                const icon = (
                  <img className=' rounded-full size-10' src={link} alt='' />
                );
                const isPurchased = user.avatarOwned?.includes(id);
                return (
                  <li
                    onClick={() => handleOpenModal(id, icon, isPurchased)}
                    key={'avatar' + i}
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
