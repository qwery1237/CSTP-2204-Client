import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import BgBlackOpacity from '../BgBlackOpacity';
import { Fragment, useEffect, useState } from 'react';
import { PREFERENCES } from './Preferences';

export default function PreferenceOptions({
  crrPopUp,
  setCrrPopUp,
  crrPref,
  setCrrPref,
}) {
  const [popUpState, setPopUpState] = useState();
  const isMultipleSelection = crrPopUp == 3;

  useEffect(() => {
    setPopUpState(crrPref[crrPopUp]);
  }, [crrPopUp]);

  const closePopUp = () => {
    setCrrPopUp();
  };

  const saveNewPref = () => {
    setCrrPref((prev) => {
      return prev.map((pref, i) => (crrPopUp == i ? popUpState : pref));
    });
    closePopUp();
  };

  const resetPref = () => {
    setPopUpState(0);
    if (isMultipleSelection) {
      setCrrPref((prev) => {
        return prev.map((pref, i) =>
          crrPopUp == i ? [false, false, false, false, false] : pref
        );
      });
      closePopUp();
      return;
    }
    setCrrPref((prev) => {
      return prev.map((pref, i) => (crrPopUp == i ? 0 : pref));
    });
    closePopUp();
  };

  const handlePopUpState = (optIndex, isMultipleSelection) => {
    if (!isMultipleSelection) {
      setPopUpState(optIndex);
      return;
    }
    if (!popUpState) {
      setPopUpState([false, false, false, false, false]);
    }
    setPopUpState((prev) => {
      return prev.map((option, i) => (i == optIndex ? !option : option));
    });
  };

  return PREFERENCES.map((item, i) => {
    const { title, options } = item;
    const popUpActive = crrPopUp == i;

    return (
      <Fragment key={title}>
        {popUpActive && (
          <div
            onClick={closePopUp}
            className='absolute top-0 w-screen h-screen'
          >
            <BgBlackOpacity isTransparent={true} />
          </div>
        )}
        <div className='w-full h-fit flex flex-col items-center'>
          {popUpActive && (
            <div className='sbg z-20 min-[521px]:mb-[-390px] rounded-lg shadow-[0px_0px_6px_#e2e8f033] dark:shadow-[2px_2px_8px_#182335]  th w-[350px] caret-transparent max-[520px]:bottom-0 max-[520px]:left-0 max-[520px]:mt-0 max-[520px]:w-screen max-[520px]:rounded-b-none max-[520px]:absolute'>
              <div className='flex justify-between text-2xl font-[500] p-4 pb-2 border-b-[1px] cborder'>
                <div className='flex-1'>{title}</div>
                <div className=' cursor-pointer flex items-center'>
                  <CloseOutlinedIcon onClick={closePopUp} />
                </div>
              </div>
              <ul className='border-b-[1px] cborder '>
                {options.map((option, j) => {
                  return (
                    <li
                      key={option}
                      onClick={() => handlePopUpState(j, isMultipleSelection)}
                      className='flex items-center px-4 py-[12.5px] cursor-pointer'
                    >
                      <div className='flex-1 text-[16px]'>{option}</div>
                      <div
                        className={`w-4 h-4 flex items-center justify-center ${
                          isMultipleSelection ? ' rounded-sm' : 'rounded-full'
                        } fbg`}
                      >
                        {isMultipleSelection && popUpState && popUpState[j] && (
                          <div className='w-2 h-2 rounded-sm bgbtn'></div>
                        )}

                        {!isMultipleSelection && popUpState == j && (
                          <div className='w-2 h-2 rounded-full bgbtn'></div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className='flex flex-row justify-between p-4 gap-x-4'>
                <div
                  onClick={resetPref}
                  className=' flex-1 p-3 px-4 bgbtn2 rounded-lg cursor-pointer text-center'
                >
                  Reset
                </div>
                <div
                  onClick={saveNewPref}
                  className=' flex-1 p-3 px-4 bgbtn rounded-lg cursor-pointer text-center'
                >
                  Apply
                </div>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  });
}
