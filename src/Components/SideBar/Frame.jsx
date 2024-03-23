import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLvItems, getOwnedItems } from '../../api/reward';
import { changeUsingItem } from '../../api/user';
import { FaCheck } from 'react-icons/fa';

export default function Frame() {
  const { user, token, updateUserData } = useAuth();
  const [frames, setFrames] = useState();
  const [crrFrame, setCrrFrame] = useState();
  const displayFrames = async () => {
    try {
      const lvFrames = await getLvItems('frame', token);
      const ownedFrames =
        (await getOwnedItems('frame', user.framesOwned, token)) || [];
      setFrames([...lvFrames, ...ownedFrames]);
      setCrrFrame(user.frame);
    } catch (e) {
      alert(e);
    }
  };
  const wearFrame = async (available, url) => {
    if (!available) return;
    changeUsingItem('frame', token, url)
      .then(() => updateUserData(token))
      .catch(alert);
  };
  useEffect(() => {
    if (!user) return;
    displayFrames();
  }, [user]);
  return (
    <div className=' w-full p-3 caret-transparent'>
      <div className=' flex flex-row flex-wrap gap-4 pt-4 justify-evenly'>
        {frames &&
          frames.map(({ link, levelCap }) => {
            const isCrrFrame = link == crrFrame;
            const isActive = levelCap <= 3;
            const preventClick = isCrrFrame || !isActive;

            return (
              <div
                key={link}
                onClick={() => wearFrame(isActive, link)}
                className={preventClick ? '' : 'cursor-pointer'}
              >
                <div className='relative size-[100px] rounded-lg tbg flex justify-center items-center'>
                  <div
                    style={{
                      backgroundImage: `url(${link})`,
                      backgroundSize: 'cover', // Adjust as needed
                      backgroundPosition: 'center', // Adjust as needed
                      // Additional background properties can be added here
                    }}
                    className=' flex justify-center items-center size-[60px] rounded-full border-0 '
                  >
                    <div className='size-14 rounded-full tbg' />
                  </div>

                  {preventClick && (
                    <div className='absolute top-0 rounded-lg bg-[rgba(0,0,0,0.3)] w-full h-full'>
                      <div className=' w-full h-full flex justify-center items-center th text-xs px-4 text-center'>
                        <div>
                          {isCrrFrame ? (
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
