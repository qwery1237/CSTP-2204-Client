import React from 'react';
import BottomNav from '../Components/BottomNav/BottomNav';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CustomInput from '../Components/UI/CustomInput';
import GasStationCard from '../Components/GasStationList/GasStationCard';
export default function SearchScreen() {
  return (
    <div className=' w-screen h-screen flex flex-col bg'>
      <div className='h-[56px] w-full sbg px-2 flex flex-row items-center border-b-[1px] cborder'>
        <CustomInput
          icon={
            <SearchOutlinedIcon className='absolute left-2 tp text-2xl bottom-[8px]' />
          }
          placeHolder='Search'
          paddingLeft='36px'
        />
      </div>

      <div className='flex-1 my-4  w-full min-w-auto flex h-full flex-col overflow-y-auto px-2 gap-4 items-center'>
        <GasStationCard isTransparent={true} />
        <GasStationCard isTransparent={true} />
        <GasStationCard isTransparent={true} />
        <GasStationCard isTransparent={true} />
        <GasStationCard isTransparent={true} />
      </div>

      <BottomNav />
    </div>
  );
}
