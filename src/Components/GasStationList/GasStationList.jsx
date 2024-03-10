import React from 'react';
import GasStationCard from './GasStationCard';
import StationMap from './StationMap';

export default function GasStationList({ isList }) {
  return (
    <>
      {isList ? (
        <div className='flex-1 w-full overflow-y-auto flex flex-col gap-y-4 max-[720px]:flex-row max-[720px]:flex-wrap max-[720px]:justify-evenly max-[720px]:gap-4 max-[630px]:flex-col max-[630px]:flex-nowrap max-[630px]:justify-normal  max-[630px]:items-center max-[630px]:px-2 pb-4 '>
          <GasStationCard />
          <GasStationCard />
          <GasStationCard />
          <GasStationCard />
        </div>
      ) : (
        <div className=' flex-1 w-full '>
          <StationMap />
        </div>
      )}
    </>
  );
}
