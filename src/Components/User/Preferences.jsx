import React, { useContext, useEffect, useState } from 'react';

import BgBlackOpacity from '../../Components/BgBlackOpacity';

import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Range } from 'react-range';
import Context from '../../context';
export default function Preferences({ isList, preferences, setPreferences }) {
  const [bgPopUp, setBgPopUp] = useState(false);
  const [target, setTarget] = useState(null);
  const [preferencePopUp, setPreferencePopUp] = useState(false);
  const { setGasStationPreference, gasStation } = useContext(Context);

  useEffect(() => {
    if (gasStation) {
      const amenitiesMapping = {
        'Car wash': 'carWash',
        'Air pump': 'airPump',
        'Convenience store': 'convenienceStore',
        'Ev charging station': 'evChargingStation',
        Atm: 'atm',
      };
      let gasStationClone = [...gasStation];
      //  console.log(preferences.Amenities);

      gasStationClone = gasStationClone.filter((station) => {
        return preferences.Amenities.every((amenity) => {
          const amenityName = amenity.name;
          const amenityKey = amenitiesMapping[amenityName];
          return amenityKey
            ? station.amenities[amenityKey]?.isValid === true
            : true;
        });
      });

      if (preferences.sort === 'Distance') {
        gasStationClone.sort((a, b) => {
          const distanceA = parseFloat(a.distanceFromUser.replace(' km', ''));
          const distanceB = parseFloat(b.distanceFromUser.replace(' km', ''));

          if (distanceA < distanceB) {
            return -1;
          } else if (distanceA > distanceB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      // console.log(gasStationClone);
      setGasStationPreference(gasStationClone);
    }
  }, [preferences, gasStation]);

  const preferencesBtn = ['Recently updated', 'Sort', 'Fuel type', 'Amenities'];
  const preferenceData = [
    ['Verifierd', 'Not verified'],
    ['Distance', 'Rating', 'Price'],
    ['Regular', 'Mid-grade', 'Premium', 'Diesel'],
    ['Car wash', 'Air pump', 'Convenience store', 'Ev charging station', 'Atm'],
  ];
  function preferenceOnclickHandler(i) {
    if (i === 0) {
      setPreferences({ ...preferences, recent: !preferences.recent });
    } else {
      setBgPopUp(true);
      setTarget(i);
      setPreferencePopUp(true);
    }
  }
  function bgPopUpOnClick() {
    setBgPopUp(false);
    setPreferencePopUp(false);
  }
  return (
    <div
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      className='h-8 w-full flex flex-row my-4 min-[520px]:justify-evenly max-[520px]:w-screen max-[520px]:overflow-x-auto max-[520px]:gap-x-4 max-[520px]:px-4'
    >
      {bgPopUp && (
        <div
          className=' absolute top-0 w-screen h-screen z-40'
          onClick={() => bgPopUpOnClick()}
        >
          {' '}
          <BgBlackOpacity isTransparent={true} />{' '}
        </div>
      )}

      {preferencesBtn.map((item, i) => {
        // if (!isList && item === "Distance") {
        //   return <></>;
        // }
        if (!isList && item === 'Sort') {
          return <></>;
        }
        return (
          <div key={item} className=' relative max-[520px]:static  h-full'>
            <div
              onClick={() => preferenceOnclickHandler(i)}
              key={item}
              className={`h-full px-2 text-lightMode-header  ${
                i === 0 && preferences.recent ? 'bgbtn' : 'sbg'
              } 
                ${i === 1 && preferences.sort !== 'Distance' ? 'bgbtn' : 'sbg'} 
               ${
                 i === 2 && preferences.fuelType !== 'Regular' ? 'bgbtn' : 'sbg'
               }
              ${i === 3 && preferences.Amenities.length !== 0 ? 'bgbtn' : 'sbg'}
              ${i === 4 && preferences.Distance !== 5 ? 'bgbtn' : 'sbg'}
              rounded-lg flex flex-row items-center justify-center text-xs gap-x-1 cursor-pointer ${
                i !== 0 && ' w-[90px]'
              }`}
            >
              <div>{item}</div>

              {i === 0 ? (
                // <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />
                <></>
              ) : (
                <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />
              )}
            </div>

            {preferencePopUp && target === i && (
              <PreferencePopUp
                preferenceData={preferenceData}
                bgPopUpOnClick={bgPopUpOnClick}
                i={i}
                setPreferences={setPreferences}
                preferences={preferences}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PreferencePopUp({
  preferenceData,
  bgPopUpOnClick,
  i,
  setPreferences,
  preferences,
}) {
  const defaultAmenitiesValue = [
    {
      id: 0,
      name: 'Car wash',
      preferred: false,
    },
    {
      id: 1,
      name: 'Air pump',
      preferred: false,
    },
    {
      id: 2,
      name: 'Convenience store',
      preferred: false,
    },
    {
      id: 3,
      name: 'Ev charging station',
      preferred: false,
    },
    {
      id: 4,
      name: 'Atm',
      preferred: false,
    },
  ];
  const [header, setHeader] = useState('');
  const [radioValue, setRadioValue] = useState(null);
  const [ammenitiesValue, setAmmenitiesValue] = useState(defaultAmenitiesValue);
  const [bottom, setBottom] = useState(0);
  const [distanceValues, setDistanceValues] = useState([5]);

  useEffect(() => {
    if (i === 1) {
      setHeader('Sort');
      setRadioValue(preferences.sort);
      setBottom('-284.6px');
    } else if (i === 2) {
      setHeader('Fuel type');
      setRadioValue(preferences.fuelType);
      setBottom('-333.6px');
    } else if (i === 3) {
      setHeader('Amenities');
      const newAmmentiesValue = [...defaultAmenitiesValue];

      preferences.Amenities.map((item) => {
        newAmmentiesValue[item.id].preferred = true;
      });
      setAmmenitiesValue(newAmmentiesValue);
      setBottom('-382.6px');
    } else if (i === 4) {
      setBottom('-237.6px');
      setDistanceValues([preferences.Distance]);
      setHeader('Distance');
    }
  }, []);

  function amenitiesHandler(i) {
    const newAmmentiesValue = [...ammenitiesValue];
    const pref = newAmmentiesValue[i].preferred;
    newAmmentiesValue[i].preferred = !pref;
    setAmmenitiesValue(newAmmentiesValue);
  }

  function applyHandler() {
    if (i === 1) {
      setPreferences({ ...preferences, sort: radioValue });
      bgPopUpOnClick();
    } else if (i === 2) {
      setPreferences({ ...preferences, fuelType: radioValue });
      bgPopUpOnClick();
    } else if (i === 3) {
      const ammenitiesValueArray = [];
      const newAmmentiesValue = [...ammenitiesValue];

      newAmmentiesValue.map((item) => {
        if (item.preferred) {
          ammenitiesValueArray.push(item);
        }
      });
      setPreferences({ ...preferences, Amenities: ammenitiesValueArray });
      bgPopUpOnClick();
    } else if (i === 4) {
      setPreferences({ ...preferences, Distance: distanceValues[0] });
      bgPopUpOnClick();
    }
  }

  function resetHandler() {
    if (i === 1) {
      setPreferences({ ...preferences, sort: 'Distance' });
      bgPopUpOnClick();
    } else if (i === 2) {
      setPreferences({ ...preferences, fuelType: 'Regular' });
      bgPopUpOnClick();
    } else if (i === 3) {
      setPreferences({ ...preferences, Amenities: [] });
      bgPopUpOnClick();
    } else if (i === 4) {
      setPreferences({ ...preferences, Distance: 5 });
      bgPopUpOnClick();
    }
  }

  return (
    <div
      // style={{ bottom: bottom }}
      className={`absolute bottom-[${bottom}] mt-8 ${
        i < 2 ? 'left-[-90%]' : 'right-[-90%]'
      } ${
        i === 4 && 'right-[0%]'
      }  sbg z-[41] rounded-lg shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[2px_2px_8px_#182335]  th w-[350px] caret-transparent max-[520px]:bottom-0 max-[520px]:left-0 max-[520px]:mt-0 max-[520px]:w-screen rounded-b-none`}
    >
      <div className='flex flex-row justify-between text-2xl font-[500] p-4 pb-2 '>
        <div className=''>{header}</div>
        <div
          onClick={() => bgPopUpOnClick()}
          className=' cursor-pointer absolute right-3 top-2 '
        >
          <CloseOutlinedIcon />
        </div>
      </div>
      <div className='border-b-[1px] cborder'></div>

      <div>
        {preferenceData[i].map((item, j) => {
          return (
            <div
              onClick={() => {
                if (i === 3) {
                  amenitiesHandler(j);
                } else {
                  setRadioValue(item);
                }
              }}
              key={item}
              className='flex flex-row items-center justify-between px-4 py-[12.5px] cursor-pointer'
            >
              <div className=' text-[16px]'>{item}</div>

              <div className=' relative'>
                {i === 3 ? (
                  <>
                    <div className='w-4 h-4 rounded-[2px] fbg'></div>
                    {ammenitiesValue[j].preferred === true && (
                      <div className='w-2 h-2 rounded-[2px] bgbtn absolute top-1 left-1'></div>
                    )}
                  </>
                ) : (
                  <>
                    <div className='w-4 h-4 rounded-full fbg'></div>
                    {radioValue === item && (
                      <div className='w-2 h-2 rounded-full bgbtn absolute top-1 left-1'></div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className='border-b-[1px] cborder  '></div>
      <div className='flex flex-row justify-between p-4 gap-x-4'>
        <div
          onClick={() => resetHandler()}
          className=' flex-1 p-3 px-4 bgbtn2 rounded-lg cursor-pointer text-center'
        >
          Reset
        </div>
        <div
          onClick={() => applyHandler()}
          className=' flex-1 p-3 px-4 bgbtn rounded-lg cursor-pointer text-center'
        >
          Apply
        </div>
      </div>
    </div>
  );
}
