import React, { useEffect, useState } from 'react';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function AuthLayout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [name, setName] = useState('FUELGO');
  const [interval, setInterval] = useState(true);

  function setNewName(n) {
    setName(n);
  }
  useEffect(() => {
    handleMouseEnter();
  }, []);
  async function updateNameWithDelay(charArray, charArray2, charArray3) {
    for (let i = 0; i < charArray.length; i++) {
      for (let j = 0; j < charArray2.length; j++) {
        let found = false;

        if (charArray3[i] === charArray2[j]) {
          charArray[i] = charArray2[j];
          const newName2 = charArray.join('');
          await sleep(30);
          found = true;
          setName(newName2);
          break;
        } else if (!found) {
          let newArr = [...charArray];
          newArr[i] = charArray2[j];
          const newName3 = newArr.join('');
          await sleep(30);

          setName(newName3);
        }
      }
    }
  }

  function handleMouseEnter() {
    if (interval) {
      setInterval(false); // Set interval to false to indicate function is running
      let oldname = 'FUELGO';
      let charArray2 = letters.split('');
      let charArray3 = oldname.split('');
      let newName = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charArray2.length);
        newName += charArray2[randomIndex];
      }

      let charArray = newName.split('');

      setNewName(newName);

      updateNameWithDelay(charArray, charArray2, charArray3)
        .then(() => {
          setInterval(true); // Set interval back to true when function is done
        })
        .catch((error) => {
          console.error('Error occurred:', error);
          setInterval(true); // Set interval back to true if there's an error
        });
    }
  }
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|tablet|ip(ad|hone|od)|android/i.test(
      userAgent
    );
    setIsMobile(isMobileDevice);
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      {!isMobile && (
        <div className=' absolute top-0 z-10'>
          <div className='relative w-screen h-screen overflow-hidden'>
            <div
              className='glowing-cursor'
              style={{ left: mousePosition.x, top: mousePosition.y }}
            ></div>
          </div>
        </div>
      )}

      {/* <div className="absolute top-3 w-screen text-center min-[640px]:hidden z-30">
        {" "}
        <WhatshotIcon sx={{ color: "rgb(14,165,233)", fontSize: "50px" }} />
      </div> */}
      {/* header */}
      <div className=' w-screen min-h-screen h-auto bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center '>
        <div className=' absolute  z-30'>
          <div className='px-4'>
            <div className='  w-[800px] max-[840px]:w-[calc(100vw-32px)] h-[500px] bg-lightMode-sbg dark:bg-darkMode-sbg max-[640px]:bg-transparent dark:max-[640px]:bg-transparent max-[640px]:border-transparent dark:max-[640px]:border-transparent rounded-lg min-[640px]:shadow-[0px_0px_6px_#e2e8f033] min-[640px]:dark:shadow-[0px_0px_6px_#e2e8f033] flex flex-row overflow-hidden'>
              <div
                onMouseEnter={handleMouseEnter}
                className=' relative flex-1 w-full h-full max-[640px]:hidden overflow-hidden'
              >
                <div className='screen-image'></div>
                <div className='screen-overlay'></div>
                <div className=' absolute z-[5] top-0 w-full h-full p-4'>
                  <div className='w-full h-full border-[3px] border-lightMode-border rounded-lg flex flex-col items-center justify-end'>
                    <WhatshotIcon
                      sx={{ color: 'rgb(14,165,233)', fontSize: '100px' }}
                    />
                    {/* <Icon size={100}/> */}
                    <div className='flex flex-row  justify-center gap-x-1'>
                      <div className=' blur-[2px] bg-lightMode-button  w-10 h-[2px] my-6'></div>
                      <div className=' blur-[2px] bg-lightMode-button  w-10 h-[2px] my-6'></div>
                    </div>
                    <div className='FuelGoLogoAuthWrap'>
                      <div
                        className='FuelGoLogoAuth pb-6 flex flex-row'
                        data-value='FuelGo'
                      >
                        <div>{name.slice(0, -2)}</div>

                        <div className='text-lightMode-button '>
                          {name.slice(-2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='border-lightMode-border dark:border-darkMode-border border-r-[1px] max-[640px]:hidden'></div>
              <div className='flex-1 flex flex-col '>
                <div className='p-4 h-full relative max-[520px]:px-0'>
                  {' '}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
