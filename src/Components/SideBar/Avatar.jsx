import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLvItems, getOwnedItems } from '../../api/reward';
import { changeUsingItem, getLevel } from '../../api/user';
import { FaCheck } from 'react-icons/fa';

export default function Avatar() {
  const { user, token, updateUserData } = useAuth();
  const [avatars, setAvatars] = useState();
  const [userLv, setUserLv] = useState();
  const [crrAvatar, setCrrAvatar] = useState();
  const displayAvatars = async () => {
    try {
      const lvAvatars = await getLvItems('avatar', token);
      const ownedAvatars =
        (await getOwnedItems('avatar', user.avatarOwned, token)) || [];
      setAvatars([...lvAvatars, ...ownedAvatars]);
      setCrrAvatar(user.profileImg);
    } catch (e) {
      alert(e);
    }
  };
  const wearAvatar = async (available, url) => {
    if (!available) return;
    changeUsingItem('avatar', token, url)
      .then(() => updateUserData(token))
      .catch(alert);
  };
  useEffect(() => {
    if (!user) return;
    setUserLv(getLevel(user.totalPoints).level);
    displayAvatars();
  }, [user]);
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {avatars &&
          avatars.map(({ link, levelCap }) => {
            const isCrrAvatar = link == crrAvatar;
            const isActive = levelCap <= userLv;
            const preventClick = isCrrAvatar || !isActive;
            return (
              <div
                key={link}
                onClick={() => wearAvatar(isActive, link)}
                className={preventClick ? '' : 'cursor-pointer'}
              >
                <div className='relative size-[100px] rounded-lg tbg flex justify-center items-center'>
                  <img
                    className='size-[60px] rounded-full  cursor-pointer object-cover relative'
                    src={link}
                    alt=''
                  />

                  {preventClick && (
                    <div className='w-full h-full absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)]'>
                      <div className=' w-full h-full flex justify-center items-center th text-xs px-4 text-center'>
                        <div>
                          {isCrrAvatar ? (
                            <FaCheck className='text-darkMode-valid text-2xl' />
                          ) : (
                            `Unlocks at level ${levelCap}`
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
